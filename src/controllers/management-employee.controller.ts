import { Request, Response } from "express";
import * as ManagementEmployeeService from "../services/management-employee.service";

export const create = async (req: Request, res: Response) => {
  try {
    const Managementemployee = await ManagementEmployeeService.createMgmtEmp(
      req.body
    );
    res.status(201).json(Managementemployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating management employee", error });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const Managementemployees =
      await ManagementEmployeeService.getAllMgmtEmps();
    res.status(200).json(Managementemployees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching management employees", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const Managementemployee = await ManagementEmployeeService.getMgmtEmpById(
    req.params.id
  );
  if (!Managementemployee) {
    res.status(404).json({ message: "Management employee not found" });
    return;
  }
  res.json(Managementemployee);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const Managementemployee = await ManagementEmployeeService.updateMgmtEmp(
    req.params.id,
    req.body
  );
  if (!Managementemployee) {
    res.status(404).json({ message: "Management employee not found" });
    return;
  }
  res.json(Managementemployee);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const success = await ManagementEmployeeService.deleteMgmtEmp(req.params.id);

  if (!success) {
    res.status(404).json({ message: "Management employee not found" });
    return;
  }

  res.status(204).send();
};
