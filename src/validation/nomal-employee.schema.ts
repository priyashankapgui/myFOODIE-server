import { z } from "zod";
export const createNomalEmployeeSchema = z.object({
  user: z.object({
    name: z.string().min(1, "Normal employee name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character")
      .optional(),
  }),
});
