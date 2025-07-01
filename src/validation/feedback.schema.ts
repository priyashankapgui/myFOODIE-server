import { z } from "zod";

export const createFeedbackSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  feedback: z.string().min(1, "Feedback is required"),
});
