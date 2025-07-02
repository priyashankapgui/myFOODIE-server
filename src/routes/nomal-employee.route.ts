import { Router } from "express";
import * as nomalEmployeesController from "../controllers/nomal-employee.controller";
import { validate } from "../middlewares/validate.middleware";
import { createNomalEmployeeSchema } from "../validation/nomal-employee.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  validate(createNomalEmployeeSchema),
  nomalEmployeesController.create
);
router.get("/", nomalEmployeesController.getAll);
router.get("/:id", nomalEmployeesController.getById);
router.put(
  "/:id",
  validate(createNomalEmployeeSchema),
  nomalEmployeesController.update
);
router.delete("/:id", nomalEmployeesController.remove);

export default router;
