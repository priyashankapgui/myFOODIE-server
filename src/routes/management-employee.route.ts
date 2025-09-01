import { Router } from "express";
import * as managementEmployeesController from "../controllers/management-employee.controller";
import { validate } from "../middlewares/validate.middleware";
import { createManagementEmployeeSchema } from "../validation/management-employee.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  validate(createManagementEmployeeSchema),
  authorizeRoles("management"),
  managementEmployeesController.create
);
router.get("/", managementEmployeesController.getAll);
router.get("/:id", managementEmployeesController.getById);
router.put(
  "/:id",
  validate(createManagementEmployeeSchema),
  authorizeRoles("management"),
  managementEmployeesController.update
);
router.delete(
  "/:id",
  authorizeRoles("management"),
  managementEmployeesController.remove
);

export default router;
