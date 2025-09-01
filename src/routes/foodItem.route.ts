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
  authorizeRoles("supplier"),
  foodItemController.create
);
router.get("/", authorizeRoles("management"), foodItemController.getAll);
router.get("/supplier/:supplierId", foodItemController.getBySupplierId);
router.get("/:id", foodItemController.getSingleFoodItem);
router.get("/foods/todayspecials", foodItemController.getTodaySpecial);
router.get(
  "/user/departmentUser/:departmentId",
  foodItemController.getDepartmentUser
);

router.put(
  "/:id",
  validate(updateFoodItemSchema),
  authorizeRoles("supplier"),
  foodItemController.update
);
router.delete("/:id", authorizeRoles("supplier"), foodItemController.remove);

export default router;
