import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { FeedbackAttributes } from "../types/feedback";

interface FeedbackCreationAttributes
  extends Optional<FeedbackAttributes, "id"> {}
class Feedback
  extends Model<FeedbackAttributes, FeedbackCreationAttributes>
  implements FeedbackAttributes
{
  public id!: number;
  public userId!: string;
  public foodId!: number;
  public supplierId!: string;
  public comment!: string;
}
Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    supplierId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "feedbacks",
    modelName: "Feedback",
    timestamps: true,
  }
);
export default Feedback;
