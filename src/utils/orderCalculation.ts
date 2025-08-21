import FoodItem from "../models/foodItem";
import { OrderTotals } from "../types/order";

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
