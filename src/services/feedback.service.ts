import Feedback from "../models/feedback";
import { FeedbackAttributes } from "../types/feedback";

export const createFeedback = async (data: FeedbackAttributes) => {
  return await Feedback.create(data);
};

export const getAllFeedbacks = async () => {
  return await Feedback.findAll();
};

export const getFeedbackById = async (id: number) => {
  return await Feedback.findByPk(id);
};
