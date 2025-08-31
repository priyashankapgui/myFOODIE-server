import FoodItem from "../models/foodItem";
import Supplyer from "../models/supplyer";

// Create a new food item
export const createFoodItem = async (data: any) => {
  return await FoodItem.create(data);
};

// Get all food items
export const getAllFoodItems = async () => {
  return await FoodItem.findAll();
};

// Get food items by supplier ID
export const getFoodItemsBySupplierId = async (supplierId: number) => {
  return await FoodItem.findAll({
    where: { supplierId },
  });
};

// Get a food item by ID
export const getFoodItemById = async (id: number) => {
  return await FoodItem.findByPk(id);
};

//Get Food items  by  avaliabality is true ,  foodType and  time
export const getAvailableFoodItems = async (
  mealType: "breakfast" | "lunch" | "dinner" | "snacks" | "beverages"
) => {
  return await FoodItem.findAll({
    where: { available: true },
    include: [
      {
        model: Supplyer,
        as: "supplyer",
        where: { foodType: mealType },
        attributes: ["id", "foodType", "address"],
      },
    ],
  });
};

// Update a food item by ID
export const updateFoodItem = async (id: number, data: any) => {
  const foodItem = await FoodItem.findByPk(id);
  if (!foodItem) return null;

  //Remove the pricing information in the update
  delete data.price;
  delete data.employeeprice;
  delete data.hospitalprice;

  await foodItem.update(data);
  return foodItem;
};

// Delete a food item by ID
export const deleteFoodItem = async (id: number) => {
  const foodItem = await FoodItem.findByPk(id);
  if (!foodItem) return null;
  await foodItem.destroy();
  return true;
};
