import { Request, Response } from "express";
import * as foodItemService from "../services/foodItem.service";

// Create Food Item
export const create = async (req: Request, res: Response) => {
  try {
    const foodItem = await foodItemService.createFoodItem(req.body);
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating food item", error });
  }
};

// Get Food items by Supplier ID
export const getBySupplierId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const foodItems = await foodItemService.getFoodItemsBySupplierId(
      req.params.supplierId
    );
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
};

// Get All Food items
export const getAll = async (_req: Request, res: Response) => {
  try {
    const foodItems = await foodItemService.getAllFoodItems();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
};

// Get Food items  by  avaliabality is true ,  foodType and  time
export const getTodaySpecial = async (req: Request, res: Response) => {
  try {
    const items = await foodItemService.getAvailableFoodItemsByTime();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};
//NOTE: Get Food Items by Time logic
//* Check the availability of food items based on meal type and time
//* First I will get the current hour and determine the meal type
//* Next I will fetch the available food items based on the meal type


// Get Food item by ID
export const getSingleFoodItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const foodItem = await foodItemService.getFoodItemById(+req.params.id);
    if (!foodItem) {
      res.status(404).json({ message: "Food item not found" });
      return;
    }
    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food item", error });
  }
};

// Update Food item by ID
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const foodItem = await foodItemService.updateFoodItem(
      +req.params.id,
      req.body
    );
    if (!foodItem) {
      res.status(404).json({ message: "Food item not found" });
      return;
    }
    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating food item", error });
  }
};

// Delete Food item by ID
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await foodItemService.deleteFoodItem(+req.params.id);
    if (!success) {
      res.status(404).json({ message: "Food item not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting food item", error });
  }
};

export const getDepartmentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const departmentId = parseInt(req.params.departmentId, 10);

    if (isNaN(departmentId)) {
      res.status(400).json({ message: "Invalid departmentId" });
      return;
    }

    console.log("Fetching users for departmentId:", departmentId);

    const users = await foodItemService.getDepartmentUserNamesByDepartmentId(
      departmentId
    );

    console.log("Fetched users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching department users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};
