import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { SupplierAttributes } from "../types/supplier";

interface SupplierCreationAttributes
  extends Optional<SupplierAttributes, "id"> {}
class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes
{
  [x: string]: any;
  public id!: string;
  public userId!: string;
  public foodType!: string;
  public address!: string;
  public phone!: string;
}
Supplier.init(
  {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true,
    },
    foodType: {
      type: DataTypes.STRING(36),
      allowNull: false,
      validate: {
        isIn: [["breakfast", "lunch", "dinner", "snacks", "beverages"]],
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "suppliers",
    modelName: "Supplier",
    timestamps: true,
  }
);
export default Supplier;
