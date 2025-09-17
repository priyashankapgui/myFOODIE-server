import Department from "../models/department";
// import { generateDepartmentId } from "../utils/genaretedId";

// Create Department
export const createDepartment = async (data: any) => {
  return await Department.create({ ...data });
};

// Get All Departments
export const getAllDepartments = async () => {
  return await Department.findAll();
};

// Get Department by ID
export const getDepartmentById = async (id: number) => {
  return await Department.findByPk(id);
};

// Update Department
export const updateDepartment = async (id: number, data: any) => {
  const dept = await Department.findByPk(id);
  if (!dept) return null;
  await dept.update(data);
  return dept;
};

// Delete Department
export const deleteDepartment = async (id: number) => {
  const dept = await Department.findByPk(id);
  if (!dept) return null;
  await dept.destroy();
  return true;
};
