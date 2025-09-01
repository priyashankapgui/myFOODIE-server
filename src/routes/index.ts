import express from "express";
import authRoutes from "./auth.route";
import departmentRoutes from "./department.route";
import feedbackRoutes from "./feedback.route";
import supplierRoutes from "./supplier.route";
import foodItemRoutes from "./foodItem.route";
import managmentEmpRoutes from "./management-employee.route";
import nomalEmpRoutes from "./nomal-employee.route";
import orderRoutes from "./order.route";
import orderSummaryRoutes from "./order-summary.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/food-items", foodItemRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/management-employees", managmentEmpRoutes);
router.use("/normal-employees", nomalEmpRoutes);
router.use("/orders", orderRoutes);
router.use("/order-summaries", orderSummaryRoutes);

export default router;
