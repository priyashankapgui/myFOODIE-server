import { Request, Response } from "express";
import * as departmentService from "../services/department.service";

export const create = async (req: Request, res: Response) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(201).json(department);
};

export const getAll = async (_req: Request, res: Response) => {
  const departments = await departmentService.getAllDepartments();
  res.json(departments);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const department = await departmentService.getDepartmentById(+req.params.id);
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }
  res.json(department);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const department = await departmentService.updateDepartment(
    +req.params.id,
    req.body
  );
  if (!department) {
    res.status(404).json({ message: "Department not found" });
    return;
  }
  res.json(department);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const success = await departmentService.deleteDepartment(+req.params.id);

  if (!success) {
    res.status(404).json({ message: "Department not found" });
    return;
  }

  res.status(204).send();
};
