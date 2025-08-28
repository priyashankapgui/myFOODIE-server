import Feedback from "../models/feedback";
import { FeedbackAttributes } from "../types/feedback";

// Create a new feedback
export const createFeedback = async (data: FeedbackAttributes) => {
  return await Feedback.create(data);
};

// Get all feedbacks
export const getAllFeedbacks = async () => {
  return await Feedback.findAll();
};

// Get a feedback by supplier ID
export const getFeedbackBySupplierId = async (supplierId: string) => {
  return await Feedback.findAll({ where: { supplierId } });
};

// Get a feedback by ID
export const getFeedbackById = async (id: string) => {
  return await Feedback.findByPk(id);
};
