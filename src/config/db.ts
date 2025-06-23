import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE || "myfoodie",
  process.env.PG_USER || "postgres",
  process.env.PG_PASSWORD || "password",
  {
    host: process.env.PG_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
