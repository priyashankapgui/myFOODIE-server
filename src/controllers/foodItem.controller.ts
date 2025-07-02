import { Request, Response } from "express";
import * as foodItemService from "../services/foodItem.service";

export const create = async (req: Request, res: Response) => {
  try {
    const foodItem = await foodItemService.createFoodItem(req.body);
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating food item", error });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const foodItems = await foodItemService.getAllFoodItems();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
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
