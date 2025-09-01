import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema } from "../validation/auth.schema";

const router = express.Router();

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/profile", authenticate, AuthController.getUserById);
router.put("/update-profile", authenticate, AuthController.updateUserById);

export default router;
