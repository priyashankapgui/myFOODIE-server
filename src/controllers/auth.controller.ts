import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.signup(req.body);
    res.status(201).json({ message: "Signup successful", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);
    res.json({ token, user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await AuthService.logout(userId);
    res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
