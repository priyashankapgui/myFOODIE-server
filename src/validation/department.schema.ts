import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  totalemp: z.number().optional(),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required").optional(),
  totalemp: z.number().optional(),
});
