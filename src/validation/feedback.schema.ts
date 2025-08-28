import { z } from "zod";

export const createFeedbackSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  supplierId: z.string().min(1, "Supplier ID is required"),
  comment: z.string().min(1, "Comment is required"),
  feedbackDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "Feedback date is required" })),
});
