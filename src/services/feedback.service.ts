import Feedback from "../models/feedback";
import { FeedbackAttributes } from "../types/feedback";
import Supplier from "../models/supplyer";
import User from "../models/user";

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
  const feedback: any = await Feedback.findByPk(id, {
    include: [
      {
        model: Supplier,
        as: "supplier",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });

  if (!feedback) return null;

  return {
    ...feedback,
    supplierName: feedback.supplyer?.user?.name,
  };
};
