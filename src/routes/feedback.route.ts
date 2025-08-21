import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";
import { validate } from "../middlewares/validate.middleware";
import { createFeedbackSchema } from "../validation/feedback.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  validate(createFeedbackSchema),
  authorizeRoles("normalEmployee", "management"),
  feedbackController.create
);
router.get("/", authorizeRoles("management"), feedbackController.getAll);
router.get("/:supplierId", feedbackController.getBySupplierId);
router.get("/:id", feedbackController.getById);

export default router;
