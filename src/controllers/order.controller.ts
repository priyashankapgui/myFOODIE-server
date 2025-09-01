import { Request, Response } from "express";
import * as orderService from "../services/order.service";

// Create a new order
export const create = async (req: Request, res: Response) => {
  try {
    const { orderData, items } = req.body;
    const newOrder = await orderService.createOrder(orderData, items);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders
export const getAll = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

//Get order by Id
export const getById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

export const getByUser = async (req: Request, res: Response) => {
  console.log("Fetching orders for user:", req.params.userId);
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get orders by department
export const getByDepartment = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrdersByDepartment(
      req.params.departmentId
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

//Get Order by Supplier
export const getBySupplier = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrdersBySupplier(
      req.params.supplierId
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Update an order
export const update = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await orderService.updateOrder(
      req.params.id,
      req.body
    );
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Update order status
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
      req.body.collectedByUserId,
      req.body.receivedItems
    );
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const success = await orderService.deleteOrder(req.params.id);
    if (!success) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
