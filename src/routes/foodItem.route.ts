import { Router } from "express";
import * as foodItemController from "../controllers/foodItem.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createFoodItemSchema,
  updateFoodItemSchema,
} from "../validation/foodItem.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  validate(createFoodItemSchema),
  authorizeRoles("supplyer"),
  foodItemController.create
);
router.get("/", foodItemController.getAll);
router.get("/:id", foodItemController.getById);
router.put(
  "/:id",
  validate(updateFoodItemSchema),
  authorizeRoles("supplyer"),
  foodItemController.update
);
router.delete("/:id", authorizeRoles("supplyer"), foodItemController.remove);

export default router;
