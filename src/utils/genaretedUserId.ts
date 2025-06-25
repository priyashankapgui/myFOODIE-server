import User from "../models/user";

export const generateUserId = async (): Promise<string> => {
  const lastUser = await User.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastUser || !lastUser.id) {
    return "U001";
  }

  const lastIdNumber = parseInt(lastUser.id.slice(1)) || 0;
  const newIdNumber = lastIdNumber + 1;

  return `U${newIdNumber.toString().padStart(3, "0")}`;
};
