import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { SupplyerAttributes } from "../types/supplyer";

interface SupplyerCreationAttributes
  extends Optional<SupplyerAttributes, "id"> {}
class Supplyer
  extends Model<SupplyerAttributes, SupplyerCreationAttributes>
  implements SupplyerAttributes
{
  [x: string]: any;
  public id!: string;
  public userId!: string;
  public foodType!: string;
  public address!: string;
  public phone!: string;
}
Supplyer.init(
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
    tableName: "supplyers",
    modelName: "Supplyer",
    timestamps: true,
  }
);
export default Supplyer;
