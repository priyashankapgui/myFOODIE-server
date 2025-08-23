// routes/orderSummary.routes.ts
import { Router } from "express";
import * as orderSummaryController from "../controllers/order-summary.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();
router.use(authenticate);

// Get all order summaries with pagination (management only)
router.get("/", authorizeRoles("management"), orderSummaryController.getAll);

// Get order summaries by supplier
router.get(
  "/supplier/:supplierId",
  authorizeRoles("management", "supplier"),
  orderSummaryController.getBySupplier
);

// Get monthly order summary
router.get(
  "/monthly/:supplierId/:year/:month",
  authorizeRoles("management", "supplier"),
  orderSummaryController.getMonthlySummary
);

// Get yearly order summary
router.get(
  "/yearly/:supplierId/:year",
  authorizeRoles("management", "supplier"),
  orderSummaryController.getYearlySummary
);

// Get quarterly order summary
router.get(
  "/quarterly/:supplierId/:year/:quarter",
  authorizeRoles("management", "supplier"),
  orderSummaryController.getQuarterlySummary
);

// Recalculate monthly summary (management only)
router.post(
  "/recalculate/:supplierId/:year/:month",
  authorizeRoles("management"),
  orderSummaryController.recalculateMonthly
);

// Delete order summary (management only)
router.delete(
  "/:id",
  authorizeRoles("management"),
  orderSummaryController.deleteSummary
);

// Get summary for custom period
router.post(
  "/custom/:supplierId",
  authorizeRoles("management", "supplier"),
  orderSummaryController.getCustomPeriodSummary
);

export default router;
