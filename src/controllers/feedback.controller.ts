import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";

// Create Feedback
export const create = async (req: Request, res: Response) => {
  try {
    const feedback = await feedbackService.createFeedback(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error });
  }
};

// Get All Feedbacks
export const getAll = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

// Get Feedbacks by Supplier ID
export const getBySupplierId = async (req: Request, res: Response) => {
  try {
    const supplierId = req.params.supplierId;
    const feedbacks = await feedbackService.getFeedbackBySupplierId(supplierId);
    if (!feedbacks) {
      res.status(404).json({ message: "Feedback not found" });
      return;
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

// Get Feedback by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedback = await feedbackService.getFeedbackById(req.params.id);
    if (!feedback) {
      res.status(404).json({ message: "Feedback not found" });
      return;
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};
