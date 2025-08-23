import User from "../models/user";
import Supplyer from "../models/supplyer";
import MgmtEmp from "../models/management-employee";
import NomalEmp from "../models/nomal-employee";
import Order from "../models/order";
import Department from "../models/department";
import Transaction from "../models/transaction";

//* User ID generation
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

//* Supplier ID generation
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

//* Normal Employee ID generation
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

//* Management Employee ID generation
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

//* Order ID generation
export const generateOrderId = async (): Promise<string> => {
  const lastOrder = await Order.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastOrder || !lastOrder.id) {
    return "OR001";
  }

  const lastIdNumber = parseInt(lastOrder.id.slice(2)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `OR${newIdNumber.toString().padStart(3, "0")}`;
};

//* Department ID generation
export const generateDepartmentId = async (): Promise<string> => {
  const lastDepartment = await Department.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastDepartment || !lastDepartment.id) {
    return "D001";
  }

  const lastIdNumber = parseInt(lastDepartment.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `D${newIdNumber.toString().padStart(3, "0")}`;
};

// Transaction ID generation
export const generateComplexTransactionId = async (): Promise<string> => {
  const timestamp = Date.now().toString(36); // Base36 timestamp
  const randomSuffix = Math.random().toString(36).substring(2, 8); // 6 random chars

  const lastTransaction = await Transaction.findOne({
    order: [["createdAt", "DESC"]],
  });

  let sequence = 1;
  if (lastTransaction && lastTransaction.id) {
    const lastIdParts = lastTransaction.id.split("-");
    sequence = parseInt(lastIdParts[2] || "0") + 1;
  }

  return `TXN-${timestamp}-${sequence
    .toString()
    .padStart(4, "0")}-${randomSuffix}`;
};
