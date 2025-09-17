import Supplier from "../models/supplier";
import User from "../models/user";
import bcrypt from "bcryptjs";

// Create a new supplier
export const createSupplier = async (data: any) => {
  console.log("Creating supplier with data:", data);
  return await Supplier.create(data);
};

// Get all suppliers with user details
export const getAllSuppliers = async () => {
  const suppliers = await Supplier.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email", "gender", "imageUrl"],
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

// Get a supplier by ID with user details
export const getSupplierById = async (id: string) => {
  const supplier: any = await Supplier.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email", "gender", "imageUrl"],
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

// Update a supplier by ID
export const updateSupplier = async (id: string, data: any) => {
  const transaction = await Supplier.sequelize?.transaction();

  try {
    const supplier = await Supplier.findByPk(id, { transaction });
    if (!supplier) {
      await transaction?.rollback();
      return null;
    }

    // Separate supplier data and user data
    const { user: userData, ...supplierData } = data;

    // Update supplier
    await supplier.update(supplierData, { transaction });

    // Update user if data provided
    if (userData) {
      const user = await User.findByPk(supplier.userId, { transaction });
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

    const updatedSupplier: any = await Supplier.findByPk(id, {
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

// Delete a supplier by ID
export const deleteSupplier = async (id: string) => {
  const transaction = await Supplier.sequelize?.transaction();

  try {
    const supplier = await Supplier.findByPk(id, { transaction });

    if (!supplier) {
      await transaction?.rollback();
      return false;
    }
    await User.destroy({
      where: { id: supplier.userId },
      transaction,
    });

    await supplier.destroy({ transaction });

    await transaction?.commit();
    console.log("Deleted Successfully");
    return true;
  } catch (error) {
    await transaction?.rollback();
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
