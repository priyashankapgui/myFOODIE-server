import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema } from "../validation/auth.schema";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  authorizeRoles("management"),
  AuthController.signup
);
router.post("/login", AuthController.login);
router.post("/logout", authenticate, AuthController.logout);

export default router;
