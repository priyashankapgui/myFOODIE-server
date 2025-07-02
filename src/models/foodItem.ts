import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { FoodItemAttributes } from "../types/foodItem";
import { foodItemHooks } from "../hooks/foodItem.hooks";

interface FoodItemCreationAttributes
  extends Optional<FoodItemAttributes, "id" | "imageUrl"> {}
class FoodItem
  extends Model<FoodItemAttributes, FoodItemCreationAttributes>
  implements FoodItemAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public supplierId!: string;
  public price!: number;
  public employeeprice!: number;
  public hospitalprice!: number;
  public category!: string;
  public imageUrl?: string;
  public available!: boolean;
}
FoodItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    supplierId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    employeeprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hospitalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "food_items",
    modelName: "FoodItem",
    timestamps: true,
    hooks: foodItemHooks,
  }
);
export default FoodItem;
