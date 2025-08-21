import { Router } from "express";
import * as departmentController from "../controllers/department.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../validation/department.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  authorizeRoles("management"),
  validate(createDepartmentSchema),
  departmentController.create
);
router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getById);
router.put(
  "/:id",
  validate(updateDepartmentSchema),
  authorizeRoles("management"),
  departmentController.update
);
router.delete(
  "/:id",
  authorizeRoles("management"),
  departmentController.remove
);

export default router;
