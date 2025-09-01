import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { MgmtEmployeeAttributes } from "../types/mgmtEmp";

interface MgmtEmpCreationAttributes
  extends Optional<MgmtEmployeeAttributes, "id"> {}

class MgmtEmp
  extends Model<MgmtEmployeeAttributes, MgmtEmpCreationAttributes>
  implements MgmtEmployeeAttributes
{
  [x: string]: any;
  public id!: string;
  public userId!: string;
  public position!: string;
  public departmentId!: number;
}

MgmtEmp.init(
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
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "management_employees",
    modelName: "MgmtEmp",
    timestamps: true,
  }
);

export default MgmtEmp;
