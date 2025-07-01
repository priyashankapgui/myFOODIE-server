import express from "express";
import authRoutes from "./auth.route";
import departmentRoutes from "./department.route";
import feedbackRoutes from "./feedback.route";
import supplierRoutes from "./supplyer.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/suppliers", supplierRoutes);

export default router;
