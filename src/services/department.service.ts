import Department from "../models/department";
// import { generateDepartmentId } from "../utils/genaretedId";

export const createDepartment = async (data: any) => {
  // const customId = await generateDepartmentId();
  return await Department.create({ ...data });
};

export const getAllDepartments = async () => {
  return await Department.findAll();
};

export const getDepartmentById = async (id: number) => {
  return await Department.findByPk(id);
};

export const updateDepartment = async (id: number, data: any) => {
  const dept = await Department.findByPk(id);
  if (!dept) return null;
  await dept.update(data);
  return dept;
};

export const deleteDepartment = async (id: number) => {
  const dept = await Department.findByPk(id);
  if (!dept) return null;
  await dept.destroy();
  return true;
};
