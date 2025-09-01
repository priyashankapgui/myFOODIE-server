import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

export const updateSupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  address: z.string().min(1, "Address is required").optional(),
});
