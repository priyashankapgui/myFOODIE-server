import User from "../models/user";
import Supplyer from "../models/supplyer";
import MgmtEmp from "../models/mgmtEmp";
import NomalEmp from "../models/nomalEmp";

//! User ID generation
export const generateUserId = async (): Promise<string> => {
  const lastUser = await User.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastUser || !lastUser.id) {
    return "U001";
  }

  const lastIdNumber = parseInt(lastUser.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `U${newIdNumber.toString().padStart(3, "0")}`;
};

//! Supplier ID generation
export const generateSupplierId = async (): Promise<string> => {
  const lastSupplier = await Supplyer.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastSupplier || !lastSupplier.id) {
    return "S001";
  }

  const lastIdNumber = parseInt(lastSupplier.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `S${newIdNumber.toString().padStart(3, "0")}`;
};

//! Normal Employee ID generation
export const generateNormalEmployeeId = async (): Promise<string> => {
  const lastNormalEmployee = await NomalEmp.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastNormalEmployee || !lastNormalEmployee.id) {
    return "E001";
  }

  const lastIdNumber = parseInt(lastNormalEmployee.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `E${newIdNumber.toString().padStart(3, "0")}`;
};

//! Management Employee ID generation
export const generateManagementId = async (): Promise<string> => {
  const lastManagement = await MgmtEmp.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastManagement || !lastManagement.id) {
    return "M001";
  }

  const lastIdNumber = parseInt(lastManagement.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `M${newIdNumber.toString().padStart(3, "0")}`;
};
