import { z } from "zod";

export const createFoodItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  supplierId: z.string().min(1, "Supplier ID is required"),
  price: z.number().min(0, "Price must be a positive number"),
  employeeprice: z
    .number()
    .min(0, "Employee price must be a positive number")
    .optional(),
  hospitalprice: z
    .number()
    .min(0, "Hospital price must be a positive number")
    .optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid URL format").optional(),
  available: z.boolean().default(true),
});

export const updateFoodItemSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  supplierId: z.string().min(1, "Supplier ID is required").optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  employeeprice: z
    .number()
    .min(0, "Employee price must be a positive number")
    .optional(),
  hospitalprice: z
    .number()
    .min(0, "Hospital price must be a positive number")
    .optional(),
  category: z.string().min(1, "Category is required").optional(),
  imageUrl: z.string().url("Invalid URL format").optional(),
  available: z.boolean().default(true).optional(),
});
