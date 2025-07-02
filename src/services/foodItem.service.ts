import FoodItem from "../models/foodItem";

// Create a new food item
export const createFoodItem = async (data: any) => {
  return await FoodItem.create(data);
};

// Get all food items
export const getAllFoodItems = async () => {
  return await FoodItem.findAll();
};

// Get a food item by ID
export const getFoodItemById = async (id: number) => {
  return await FoodItem.findByPk(id);
};

// Update a food item by ID
export const updateFoodItem = async (id: number, data: any) => {
  const foodItem = await FoodItem.findByPk(id);
  if (!foodItem) return null;
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
