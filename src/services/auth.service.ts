import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import MgmtEmp from "../models/mgmtEmp";
import NomalEmp from "../models/nomalEmp";
import Supplyer from "../models/supplyer";
import { UserAttributes } from "../types/user";
import {
  generateUserId,
  generateSupplierId,
  generateNormalEmployeeId,
  generateManagementId,
} from "../utils/genaretedId";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup service function
export const signup = async (
  userData: Partial<UserAttributes> & {
    position?: string;
    departmentId?: number;
    foodType?: string;
    address?: string;
    phone?: string;
    role: "management" | "normalEmployee" | "supplyer";
  }
) => {
  const { name, email, password, gender, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  // Hash the password
  const hashedPassword = await bcrypt.hash(password!, 10);

  // Generate custom user ID
  const customId = await generateUserId();

  // Create user
  const newUser = await User.create({
    id: customId,
    name: name!,
    email: email!,
    gender: gender!,
    password: hashedPassword,
    role: role!,
  });

  // Save data based on role
  switch (role) {
    case "management":
      if (!userData.position)
        throw new Error("Position is required for management role");
      const managementId = await generateManagementId();
      await MgmtEmp.create({
        id: managementId,
        userId: newUser.id,
        position: userData.position,
      });
      break;

    case "normalEmployee":
      if (!userData.position || !userData.departmentId)
        throw new Error("Position and Department ID are required for employee");
      const normalEmployeeId = await generateNormalEmployeeId();
      await NomalEmp.create({
        id: normalEmployeeId,
        userId: newUser.id,
        position: userData.position,
        departmentId: userData.departmentId,
      });
      break;

    case "supplyer":
      if (!userData.foodType || !userData.address || !userData.phone)
        throw new Error(
          "FoodType, Address, and Phone are required for supplyer"
        );
      const supplierId = await generateSupplierId();
      await Supplyer.create({
        id: supplierId,
        userId: newUser.id,
        foodType: userData.foodType,
        address: userData.address,
        phone: userData.phone,
      });
      break;

    default:
      throw new Error("Invalid role");
  }

  return newUser;
};

// Login service function
export const login = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Include role in token
  //* This is the payload for the JWT token
  //* Token  has the three parts: Header, Payload, Signature
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // Save token in DB if needed
  user.token = token;
  await user.save();

  // Return token and limited user data
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// logout service function
export const logout = async (userId: string) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.token = undefined;
  await user.save();
};
