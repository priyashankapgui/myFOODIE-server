import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      foodItemId: z.number().min(1),
      quantity: z.number().min(1),
    })
  ),
});

export const updateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        foodItemId: z.number().min(1),
        quantity: z.number().min(1),
      })
    )
    .optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "prepared",
    "completed",
    "non-completed",
    "cancelled",
  ]),
});
