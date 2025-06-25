import express from "express";
import authRoutes from "./auth.route";
import deparmentRoutes from "./department.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/departments", deparmentRoutes);

export default router;
