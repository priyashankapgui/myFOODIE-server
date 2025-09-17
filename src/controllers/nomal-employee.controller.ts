import { Request, Response } from "express";
import * as NomalEmployee from "../services/nomal-employee.service";

// Create Normal Employee
export const create = async (req: Request, res: Response) => {
  try {
    const normalEmployee = await NomalEmployee.createNomalEmp(req.body);
    res.status(201).json(normalEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating normal employee", error });
  }
};

// Get All Normal Employees
export const getAll = async (_req: Request, res: Response) => {
  try {
    const normalEmployees = await NomalEmployee.getAllNomalEmps();
    res.status(200).json(normalEmployees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching normal employees", error });
  }
};

// Get Normal Employee by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  const normalEmployee = await NomalEmployee.getNomalEmpById(req.params.id);
  if (!normalEmployee) {
    res.status(404).json({ message: "Normal employee not found" });
    return;
  }
  res.json(normalEmployee);
};

// Update Normal Employee
export const update = async (req: Request, res: Response): Promise<void> => {
  const normalEmployee = await NomalEmployee.updateNomalEmp(
    req.params.id,
    req.body
  );
  if (!normalEmployee) {
    res.status(404).json({ message: "Normal employee not found" });
    return;
  }
  res.json(normalEmployee);
};

// Delete Normal Employee
export const remove = async (req: Request, res: Response): Promise<void> => {
  const success = await NomalEmployee.deleteNomalEmp(req.params.id);

  if (!success) {
    res.status(404).json({ message: "Normal employee not found" });
    return;
  }

  res.status(204).send();
};
