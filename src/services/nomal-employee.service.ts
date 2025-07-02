import NomalEmployee from "../models/nomal-employee";
import User from "../models/user";
import bcrypt from "bcryptjs";

// Create a new normal employee
export const createNomalEmp = async (data: any) => {
  console.log("Creating normal employee with data:", data);
  return await NomalEmployee.create(data);
};

// Get all normal employees with user details
export const getAllNomalEmps = async () => {
  const nomalemployees = await NomalEmployee.findAll({
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

  return nomalemployees.map((normalemployee: any) => ({
    ...normalemployee,
    name: normalemployee.User?.name,
    email: normalemployee.User?.email,
  }));
};

// Get a normal employee by ID with user details
export const getNomalEmpById = async (id: string) => {
  const normalemployee: any = await NomalEmployee.findByPk(id, {
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

  if (!normalemployee) return null;

  return {
    ...normalemployee,
    name: normalemployee.User?.name,
    email: normalemployee.User?.email,
  };
};

// Update a normal employee by ID
export const updateNomalEmp = async (id: string, data: any) => {
  const transaction = await NomalEmployee.sequelize?.transaction();

  try {
    const normalemployee = await NomalEmployee.findByPk(id, { transaction });
    if (!normalemployee) {
      await transaction?.rollback();
      return null;
    }

    // Separate normal employee data and user data
    const { user: userData, ...normalEmpData } = data;

    // Update normal employee
    await normalemployee.update(normalEmpData, { transaction });

    // Update user if data provided
    if (userData) {
      const user = await User.findByPk(normalemployee.userId, { transaction });
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

    const updatedNormalEmp: any = await NomalEmployee.findByPk(id, {
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
      ...updatedNormalEmp.get({ plain: true }),
      name: updatedNormalEmp.user?.name,
      email: updatedNormalEmp.user?.email,
    };
  } catch (error) {
    await transaction?.rollback();
    throw error;
  }
};

// Delete a normal employee by ID
export const deleteNomalEmp = async (id: number) => {
  const transaction = await NomalEmployee.sequelize?.transaction();

  try {
    const normalemployee = await NomalEmployee.findByPk(id, { transaction });

    if (!normalemployee) {
      await transaction?.rollback();
      return false;
    }
    await User.destroy({
      where: { id: normalemployee.userId },
      transaction,
    });

    await normalemployee.destroy({ transaction });

    await transaction?.commit();
    console.log("Deleted Successfully");
    return true;
  } catch (error) {
    await transaction?.rollback();
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
