import { Request, Response } from "express";
import * as supplierService from "../services/supplier.service";

// Create a new supplier
export const create = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error creating supplier", error });
  }
};

// Get all suppliers
export const getAll = async (_req: Request, res: Response) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

// Get a supplier by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  const supplier = await supplierService.getSupplierById(req.params.id);
  if (!supplier) {
    res.status(404).json({ message: "Supplier not found" });
    return;
  }
  res.json(supplier);
};

// Update a supplier
export const update = async (req: Request, res: Response): Promise<void> => {
  const supplier = await supplierService.updateSupplier(
    req.params.id,
    req.body
  );
  if (!supplier) {
    res.status(404).json({ message: "Supplier not found" });
    return;
  }
  res.json(supplier);
};

// Delete a supplier
export const remove = async (req: Request, res: Response): Promise<void> => {
  const success = await supplierService.deleteSupplier(req.params.id);

  if (!success) {
    res.status(404).json({ message: "Supplier not found" });
    return;
  }

  res.status(204).send();
};
