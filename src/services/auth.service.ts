import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import MgmtEmp from "../models/management-employee";
import NormalEmp from "../models/nomal-employee";
import Supplyer from "../models/supplyer";
import { UserAttributes } from "../types/user";
import {
  generateUserId,
  generateSupplierId,
  generateNormalEmployeeId,
  generateManagementId,
} from "../utils/genaretedId";
import { sendEmail } from "../utils/sendEmail";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
import sequelize from "../config/db";

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
  const t = await sequelize.transaction();

  try {
    const { name, email, password, gender, imageUrl, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
      transaction: t,
    });
    if (existingUser) throw new Error("User already exists");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password!, 10);

    // Generate custom user ID
    const customId = await generateUserId();

    // Create user
    const newUser = await User.create(
      {
        id: customId,
        name: name!,
        email: email!,
        gender: gender!,
        imageUrl: imageUrl,
        password: hashedPassword,
        role: role!,
      },
      { transaction: t }
    );

    // Save role-specific data
    switch (role) {
      case "management":
        if (!userData.position)
          throw new Error("Position is required for management role");
        const managementId = await generateManagementId();
        await MgmtEmp.create(
          {
            id: managementId,
            userId: newUser.id,
            position: userData.position,
          },
          { transaction: t }
        );
        break;

      case "normalEmployee":
        if (!userData.position || !userData.departmentId)
          throw new Error(
            "Position and Department ID are required for employee"
          );
        const normalEmployeeId = await generateNormalEmployeeId();
        await NormalEmp.create(
          {
            id: normalEmployeeId,
            userId: newUser.id,
            position: userData.position,
            departmentId: userData.departmentId,
          },
          { transaction: t }
        );
        break;

      case "supplyer":
        if (!userData.foodType || !userData.address || !userData.phone)
          throw new Error(
            "FoodType, Address, and Phone are required for supplyer"
          );
        const supplierId = await generateSupplierId();
        await Supplyer.create(
          {
            id: supplierId,
            userId: newUser.id,
            foodType: userData.foodType,
            address: userData.address,
            phone: userData.phone,
          },
          { transaction: t }
        );
        break;

      default:
        throw new Error("Invalid role");
    }

    await t.commit();
    return newUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// Login service function
export const login = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  let roleId: string | null = null;

  // Check which type of user and get roleId
  if (user.role === "supplyer") {
    const supplier = await Supplyer.findOne({ where: { userId: user.id } });
    roleId = supplier?.id || null;
  } else if (user.role === "management") {
    const managementEmp = await MgmtEmp.findOne({ where: { userId: user.id } });
    roleId = managementEmp?.id || null;
  } else if (user.role === "normalEmployee") {
    const employee = await NormalEmp.findOne({ where: { userId: user.id } });
    roleId = employee?.id || null;
  }

  console.log("User role:", user.role, "Role ID:", roleId);

  if (!roleId) {
    throw new Error("Role ID not found for user");
  }

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

  user.token = token;
  await user.save();

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roleId: roleId,
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

// Update user service function
export const updateUser = async (
  userId: string,
  userData: Partial<Omit<UserAttributes, "id">>
) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  await user.update(userData);
  return user;
};

//Forgot Password (Send OTP)
export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOtp = otp;
  const expiry = new Date(Date.now() + 5 * 60 * 1000);
  user.resetOtpExpiry = expiry; // 5 mins
  await user.save();

  // Send OTP via email
  await sendEmail(user.email, "Password Reset OTP", `${otp}`, expiry);

  return { message: "OTP sent to email" };
};

//Reset Password
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  if (user.resetOtp !== otp) throw new Error("Invalid OTP");
  if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date())
    throw new Error("OTP expired");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Clear OTP
  user.resetOtp = undefined;
  user.resetOtpExpiry = undefined;
  await user.save();

  return { message: "Password reset successful" };
};
