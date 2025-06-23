import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import sequelize from "./config/db";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

const swaggerFilePath = path.resolve(__dirname, "./swagger/swagger.json");
let swaggerDocument;
try {
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
} catch (err) {
  console.error("Failed to load swagger.json:", err);
  process.exit(1);
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Hello from MyFOODIE + Sequelize + Swagger!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("📂 Database connected successfully!");

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🔐 Server running at http://localhost:${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
