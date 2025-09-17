import FoodItem from "../models/foodItem";
import { OrderTotals, OrderItemTotals } from "../types/order";
import OrderItem from "../models/orderItems";

// Calculate total prices for an order
export const calculateOrderTotals = async (
  orderItems: { foodItemId: number; quantity: number }[]
): Promise<OrderTotals> => {
  let totalOrderPrice = 0;
  let totalOrderEmployeePrice = 0;
  let totalOrderHospitalPrice = 0;
  let totalRequestOrderItems = 0;

  for (const item of orderItems) {
    const foodItem = await FoodItem.findByPk(item.foodItemId);
    if (!foodItem) throw new Error(`FoodItem ${item.foodItemId} not found`);

    totalOrderPrice += foodItem.price * item.quantity;
    totalOrderEmployeePrice += foodItem.employeeprice * item.quantity;
    totalOrderHospitalPrice += foodItem.hospitalprice * item.quantity;
    totalRequestOrderItems += item.quantity;
  }

  return {
    totalOrderPrice,
    totalOrderEmployeePrice,
    totalOrderHospitalPrice,
    totalRequestOrderItems,
  };
};

//? totalOrderPrice is the sum of the prices of all food items in the order
//? totalOrderEmployeePrice is the sum of the employee prices of all food items in the order (employee wants to pay)
//? totalOrderHospitalPrice is the sum of the hospital prices of all food items in the order (hospital wants to pay)
//? totalRequestOrderItems is the total quantity of all food items in the order (user wants to order)

// Calculate received quantity for an order item
export const calculateReceivedQuantity = async (
  orderItem: OrderItem
): Promise<number> => {
  if (
    orderItem.receivedNumberOfItem !== undefined &&
    orderItem.receivedNumberOfItem !== null
  ) {
    return orderItem.receivedNumberOfItem;
  }
  return orderItem.quantity;
};
export const calculateTobePaidValues = async (
  orderItems: OrderItem[],
  receivedItems: { orderItemId: number; receivedQuantity: number }[]
): Promise<OrderItemTotals> => {
  let tobePaidPrice = 0;
  let tobePaidEmployeePrice = 0;
  let tobePaidHospitalPrice = 0;

  for (const item of orderItems) {
    const foodItem = await FoodItem.findByPk(item.foodItemId);
    if (!foodItem) throw new Error(`FoodItem ${item.foodItemId} not found`);

    const receivedItem = receivedItems.find((ri) => ri.orderItemId === item.id);
    const receivedQuantity = receivedItem ? receivedItem.receivedQuantity : 0;

    tobePaidPrice += foodItem.price * receivedQuantity;
    tobePaidEmployeePrice += foodItem.employeeprice * receivedQuantity;
    tobePaidHospitalPrice += foodItem.hospitalprice * receivedQuantity;
  }

  return {
    tobePaidPrice,
    tobePaidEmployeePrice,
    tobePaidHospitalPrice,
  };
};

// Validate status transitions
//? This function checks if a status transition is allowed based on the current and new status.
//? pending -> prepared, cancelled
//? prepared -> completed, non-completed, cancelled
//? prepared -> collected
//? collected -> completed,non-completed
//? completed -> (no further transitions)
//? non-completed -> (no further transitions)
//? cancelled -> (no further transitions)

export const isValidStatusTransition = (
  currentStatus: string,
  newStatus: string
): boolean => {
  const allowedTransitions: { [key: string]: string[] } = {
    pending: ["prepared"],
    prepared: ["collected"],
    collected: ["completed", "non-completed"],
    completed: [],
    "non-completed": [],
    cancelled: [],
  };

  return allowedTransitions[currentStatus]?.includes(newStatus) || false;
};
