import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { OrderAttributes } from "../types/order";

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public userId!: string;
  public foodId!: number;
  public quantity!: number;
  public orderDate!: Date;
  public status!: string;
}
Order.init(
  {
    id: {
      type: DataTypes.STRING(36),
      autoIncrement: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
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
