import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { OrderSummary } from "../types/orderSummary";

interface OrderSummaryCreationAttributes extends Optional<OrderSummary, "id"> {}
class OrderSummaryModel
  extends Model<OrderSummary, OrderSummaryCreationAttributes>
  implements OrderSummary
{
  public id!: number;
  public monthlyTotalOrders!: number;
  public monthlyTotalItems!: number;
  public monthlyTotalPrice!: number;
  public monthlyTotalEmployeePrice!: number;
  public monthlyTotalHospitalPrice!: number;
}
OrderSummaryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    monthlyTotalOrders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    monthlyTotalItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    monthlyTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    monthlyTotalEmployeePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    monthlyTotalHospitalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: "order_summaries",
    modelName: "OrderSummary",
    timestamps: true,
  }
);
export default OrderSummaryModel;
