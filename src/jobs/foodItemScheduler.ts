import cron from "node-cron";
import FoodItem from "../models/foodItem";
import { Op } from "sequelize";

cron.schedule("0 0 * * *", async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await FoodItem.update(
      { available: false },
      {
        where: {
          available: true,
          [Op.or]: [
            { createdAt: { [Op.lte]: yesterday } },
            { updatedAt: { [Op.lte]: yesterday } },
          ] as any,
        },
      }
    );

    console.log(
      "👍 Food items older than 1 day (created or updated) set to unavailable."
    );
  } catch (error) {
    console.error("❌ Error updating food item availability:", error);
  }
});

//* Run every day at midnight automatically change food item availability
