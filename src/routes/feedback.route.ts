import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";
import { validate } from "../middlewares/validate.middleware";
import { createFeedbackSchema } from "../validation/feedback.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.post("/", validate(createFeedbackSchema), feedbackController.create);
router.get("/", feedbackController.getAll);
router.get("/:id", feedbackController.getById);

export default router;
