import { z } from "zod";

export const createFeedbackSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  supplierId: z.string().min(1, "Supplier ID is required"),
  comment: z.string().min(1, "Comment is required"),
});
