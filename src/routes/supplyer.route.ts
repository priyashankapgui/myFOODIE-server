import { Router } from "express";
import * as supplierController from "../controllers/supplyer.controller";
import { validate } from "../middlewares/validate.middleware";
import { updateSupplierSchema } from "../validation/suppliyer.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.get("/", supplierController.getAll);
router.get("/:id", supplierController.getById);
router.put("/:id", validate(updateSupplierSchema), supplierController.update);
router.delete("/:id", supplierController.remove);

export default router;
