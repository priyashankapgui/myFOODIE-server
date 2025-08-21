import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createOrderSchema,
  updateOrderStatusSchema,
  updateOrderSchema,
} from "../validation/order.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  authorizeRoles("management", "normalEmployee"),
  validate(createOrderSchema),
  orderController.create
);
router.get("/", orderController.getAll);
router.get("/getorderById/:id", orderController.getById);
router.put(
  "/updateOrder/:id",
  authorizeRoles("management", "normalEmployee"),
  validate(updateOrderSchema),
  orderController.update
);
router.put(
  "/updateOrderStatus/:id",
  validate(updateOrderStatusSchema),
  orderController.updateStatus
);
router.delete(
  "/:id",
  authorizeRoles("management", "normalEmployee"),
  orderController.deleteOrder
);

export default router;
