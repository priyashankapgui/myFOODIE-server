import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { OrderAttributes } from "../types/order";

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public collectedByUserId!: string;
  public departmentId!: number;
  public orderCreatorUserId!: string;
  public orderDate!: Date;
  public totalRequestOrderItems!: number;
  public totalPreparedOrderItems!: number;
  public totalOrderPrice!: number;
  public totalOrderEmployeePrice!: number;
  public totalOrderHospitalPrice!: number;
  public status!: string;
  public mealType!: string;
}
Order.init(
  {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    collectedByUserId: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    orderCreatorUserId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["breakfast", "lunch", "dinner"]],
      },
    },
    totalRequestOrderItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalPreparedOrderItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalOrderPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalOrderEmployeePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalOrderHospitalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "prepared", "completed", "cancelled"]],
      },
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
  }
);
export default Order;
