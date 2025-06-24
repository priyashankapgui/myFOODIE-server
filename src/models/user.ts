import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { UserAttributes } from "../types/user";

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public gender!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      autoIncrement: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["male", "female", "other"]],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  }
);

export default User;
