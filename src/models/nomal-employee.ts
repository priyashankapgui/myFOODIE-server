import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { NomalEmployeeAttributes } from "../types/nomalEmp";

interface NomalEmpCreationAttributes
  extends Optional<NomalEmployeeAttributes, "id"> {}
class NomalEmp
  extends Model<NomalEmployeeAttributes, NomalEmpCreationAttributes>
  implements NomalEmployeeAttributes
{
  [x: string]: any;
  public id!: string;
  public userId!: string;
  public departmentId!: number;
  public position!: string;
}
NomalEmp.init(
  {
    id: {
      type: DataTypes.STRING(36),
      autoIncrement: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "normal_employees",
    modelName: "NomalEmp",
    timestamps: true,
  }
);

export default NomalEmp;
