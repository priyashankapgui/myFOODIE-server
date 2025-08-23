import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { TransactionAttributes } from "../types/transaction";

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}
class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string;
  public supplyerId!: string;
  public monthlyAmount!: number;
  public paymentStatus!: string;
  public transactionDate!: Date;
  public paymentMethod!: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    paymentStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "paid", "unpaid"]],
      },
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
