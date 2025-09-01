import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

//* Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.signup(req.body);
    res.status(201).json({ message: "Signup successful", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//* Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);
    res.json({ token, user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

//* Logout
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await AuthService.logout(userId);
    res.json({ message: "Logged out successfully 📤" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//* Get User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await AuthService.getUserById(userId);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//* Forgot Password (Send OTP)
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//* Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await AuthService.resetPassword(email, otp, newPassword);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//* Update User by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await AuthService.updateUserById(userId, req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
