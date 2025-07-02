import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { OrderItemAttributes } from "../types/orderItems";

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}
class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: string;
  public foodItemId!: number;
  public employeeId!: string;
  public quantity!: number;
}
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    foodItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    modelName: "OrderItem",
    timestamps: true,
  }
);
export default OrderItem;
