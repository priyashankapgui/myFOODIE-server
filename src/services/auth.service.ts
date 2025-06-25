import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { UserAttributes } from "../types/user";
import { generateUserId } from "../utils/genaretedUserId";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup service function
export const signup = async (userData: Partial<UserAttributes>) => {
  const { name, email, password, gender } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password!, 10);
  const customId = await generateUserId();

  const newUser = await User.create({
    id: customId,
    name: name!,
    email: email!,
    gender: gender!,
    password: hashedPassword,
  });

  return newUser;
};

// Login service function
export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  user.token = token;
  await user.save();

  return { token, user };
};

// logout service function
export const logout = async (userId: string) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.token = undefined;
  await user.save();
};
