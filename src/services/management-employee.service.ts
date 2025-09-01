import ManagementEmployee from "../models/management-employee";
import User from "../models/user";
import bcrypt from "bcryptjs";

// Create a new management employee
export const createMgmtEmp = async (data: any) => {
  console.log("Creating management employee with data:", data);
  return await ManagementEmployee.create(data);
};

// Get all management employees with user details
export const getAllMgmtEmps = async () => {
  const managementEmps = await ManagementEmployee.findAll({
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

  return managementEmps.map((managementEmp: any) => ({
    ...managementEmp,
    name: managementEmp.User?.name,
    email: managementEmp.User?.email,
    gender: managementEmp.User?.gender,
    imageUrl: managementEmp.User?.imageUrl,
  }));
};

// Get a management employee by ID with user details
export const getMgmtEmpById = async (id: string) => {
  const managementEmp: any = await ManagementEmployee.findByPk(id, {
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

  if (!managementEmp) return null;

  return {
    ...managementEmp,
    name: managementEmp.User?.name,
    email: managementEmp.User?.email,
    gender: managementEmp.User?.gender,
    imageUrl: managementEmp.User?.imageUrl,
  };
};

// Update a management employee by ID
export const updateMgmtEmp = async (id: string, data: any) => {
  const transaction = await ManagementEmployee.sequelize?.transaction();

  try {
    const managementEmp = await ManagementEmployee.findByPk(id, {
      transaction,
    });
    if (!managementEmp) {
      await transaction?.rollback();
      return null;
    }

    // Separate management employee data and user data
    const { user: userData, ...managementEmpData } = data;

    // Update management employee
    await managementEmp.update(managementEmpData, { transaction });

    // Update user if data provided
    if (userData) {
      const user = await User.findByPk(managementEmp.userId, { transaction });
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

    const updatedManagementEmp: any = await ManagementEmployee.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email", "gender", "imageUrl"],
        },
      ],
    });
    console.log("Updated Successfully");

    return {
      ...updatedManagementEmp.get({ plain: true }),
      name: updatedManagementEmp.user?.name,
      email: updatedManagementEmp.user?.email,
      gender: updatedManagementEmp.user?.gender,
      imageUrl: updatedManagementEmp.user?.imageUrl,
    };
  } catch (error) {
    await transaction?.rollback();
    throw error;
  }
};

// Delete a management employee by ID
export const deleteMgmtEmp = async (id: string) => {
  const transaction = await ManagementEmployee.sequelize?.transaction();

  try {
    const managementEmp = await ManagementEmployee.findByPk(id, {
      transaction,
    });

    if (!managementEmp) {
      await transaction?.rollback();
      return false;
    }
    await User.destroy({
      where: { id: managementEmp.userId },
      transaction,
    });

    await managementEmp.destroy({ transaction });

    await transaction?.commit();
    console.log("Deleted Successfully");
    return true;
  } catch (error) {
    await transaction?.rollback();
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
