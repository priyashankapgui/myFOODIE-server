import { Router } from "express";
import * as supplierController from "../controllers/supplier.controller";
import { validate } from "../middlewares/validate.middleware";
import { updateSupplierSchema } from "../validation/supplier.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.get(
  "/",
  authorizeRoles("management", "normalEmployee"),
  supplierController.getAll
);
router.get("/:id", supplierController.getById);
router.put(
  "/:id",
  validate(updateSupplierSchema),
  authorizeRoles("supplier", "management"),
  supplierController.update
);
router.delete("/:id", authorizeRoles("management"), supplierController.remove);

export default router;
