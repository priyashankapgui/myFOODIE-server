import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { DepartmentAttributes } from "../types/department";

interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, "id"> {}

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public name!: string;
  public totalemp!: number;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    totalemp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "departments",
    modelName: "Department",
    timestamps: true,
  }
);

export default Department;
