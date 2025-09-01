import { Router } from "express";
import * as nomalEmployeesController from "../controllers/nomal-employee.controller";
import { validate } from "../middlewares/validate.middleware";
import { createNomalEmployeeSchema } from "../validation/nomal-employee.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  validate(createNomalEmployeeSchema),
  authorizeRoles("management"),
  nomalEmployeesController.create
);
router.get("/", nomalEmployeesController.getAll);
router.get("/:id", nomalEmployeesController.getById);
router.put(
  "/:id",
  validate(createNomalEmployeeSchema),
  authorizeRoles("management", "normal"),
  nomalEmployeesController.update
);
router.delete(
  "/:id",
  authorizeRoles("management"),
  nomalEmployeesController.remove
);

export default router;
