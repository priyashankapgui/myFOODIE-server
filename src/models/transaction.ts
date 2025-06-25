import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { TransactionAttributes } from "../types/transaction";

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}
class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public supplyerId!: string;
  public monthlyAmount!: number;
  public status!: string;
  public transactionDate!: Date;
  public paymentMethod!: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "credit_card",
    },
    supplyerId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    monthlyAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "transactions",
    modelName: "Transaction",
    timestamps: true,
  }
);
export default Transaction;
