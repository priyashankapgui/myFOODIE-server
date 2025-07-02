import { Router } from "express";
import * as departmentController from "../controllers/department.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../validation/department.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.post("/", validate(createDepartmentSchema), departmentController.create);
router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getById);
router.put(
  "/:id",
  validate(updateDepartmentSchema),
  departmentController.update
);
router.delete("/:id", departmentController.remove);

export default router;
