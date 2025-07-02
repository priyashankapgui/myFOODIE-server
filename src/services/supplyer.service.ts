import Supplyer from "../models/supplyer";
import User from "../models/user";
import bcrypt from "bcryptjs";

export const createSupplyer = async (data: any) => {
  console.log("Creating supplier with data:", data);
  return await Supplyer.create(data);
};

export const getAllSupplyers = async () => {
  const suppliers = await Supplyer.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    raw: true,
    nest: true,
  });

  return suppliers.map((supplier: any) => ({
    ...supplier,
    name: supplier.User?.name,
    email: supplier.User?.email,
  }));
};

export const getSupplyerById = async (id: string) => {
  const supplier: any = await Supplyer.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    raw: true,
    nest: true,
  });

  if (!supplier) return null;

  return {
    ...supplier,
    name: supplier.User?.name,
    email: supplier.User?.email,
  };
};

export const updateSupplyer = async (id: string, data: any) => {
  const transaction = await Supplyer.sequelize?.transaction();

  try {
    const supplyer = await Supplyer.findByPk(id, { transaction });
    if (!supplyer) {
      await transaction?.rollback();
      return null;
    }

    // Separate supplier data and user data
    const { user: userData, ...supplierData } = data;

    // Update supplier
    await supplyer.update(supplierData, { transaction });

    // Update user if data provided
    if (userData) {
      const user = await User.findByPk(supplyer.userId, { transaction });
      if (!user) {
        await transaction?.rollback();
        return null;
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      await user.update(userData, { transaction });
    }

    await transaction?.commit();

    const updatedSupplier: any = await Supplyer.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });
    console.log("Updated Successfully");

    return {
      ...updatedSupplier.get({ plain: true }),
      name: updatedSupplier.user?.name,
      email: updatedSupplier.user?.email,
    };
  } catch (error) {
    await transaction?.rollback();
    throw error;
  }
};

export const deleteSupplyer = async (id: number) => {
  const transaction = await Supplyer.sequelize?.transaction();

  try {
    const supplyer = await Supplyer.findByPk(id, { transaction });

    if (!supplyer) {
      await transaction?.rollback();
      return false;
    }
    await User.destroy({
      where: { id: supplyer.userId },
      transaction,
    });

    await supplyer.destroy({ transaction });

    await transaction?.commit();
    console.log("Deleted Successfully");
    return true;
  } catch (error) {
    await transaction?.rollback();
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
