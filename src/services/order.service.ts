import Order from "../models/order";
import OrderItem from "../models/orderItems";
import Department from "../models/department";
import sequelize from "../config/db";
import {
  calculateOrderTotals,
  isValidStatusTransition,
  calculateTobePaidValues,
} from "../utils/orderCalculation";
import { generateOrderId } from "../utils/genaretedId";
import { FoodItem } from "../models";
import { updateMonthlySummary } from "./order-summary.service";
import { Op } from "sequelize";

// Create a new order
export const createOrder = async (orderData: any, orderItems: any[]) => {
  const transaction = await sequelize.transaction();

  console.log("Creating order with fields:", orderData);
  console.log("Creating order items:", orderItems);

  try {
    //* Calculate totals using utility function
    const totals = await calculateOrderTotals(orderItems);
    const customId = await generateOrderId();
    console.log("Generated custom order ID:", customId);
    console.log("Order Data:", orderData);

    const order = await Order.create(
      {
        ...orderData,
        id: customId,
        totalOrderPrice: totals.totalOrderPrice,
        totalOrderEmployeePrice: totals.totalOrderEmployeePrice,
        totalOrderHospitalPrice: totals.totalOrderHospitalPrice,
        totalRequestOrderItems: totals.totalRequestOrderItems,
        totalPreparedOrderItems: 0,
      },
      { transaction }
    );

    //* Create order items
    for (const item of orderItems) {
      await OrderItem.create({ ...item, orderId: order.id }, { transaction });
    }

    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Get all orders with their items
export const getAllOrders = async () => {
  return await Order.findAll({
    include: [
      { model: OrderItem, as: "orderItems" },
      {
        model: Department,
        as: "department",
        attributes: ["name"],
      },
    ],
  });
};

// Get order by ID
export const getOrderById = async (id: string) => {
  return await Order.findByPk(id, {
    include: [
      { model: OrderItem, as: "orderItems" },
      {
        model: Department,
        as: "department",
        attributes: ["name"],
      },
    ],
  });
};

export const getOrdersByUser = async (userId: string) => {
  return await Order.findAll({
    where: {
      orderCreatorUserId: userId,
      status: {
        [Op.in]: ["pending", "prepared", "collected", "non-completed"],
      },
    },
    include: [{ model: OrderItem, as: "orderItems" }],
  });
};

//Get Order By Supplier
export const getOrdersBySupplier = async (supplierId: string) => {
  return await Order.findAll({
    where: { supplierId },
    include: [
      { model: OrderItem, as: "orderItems" },
      {
        model: Department,
        as: "department",
        attributes: ["name"],
      },
    ],
  });
};

// Get orders by department
export const getOrdersByDepartment = async (departmentId: string) => {
  return await Order.findAll({
    where: { departmentId },
    include: [{ model: OrderItem, as: "items" }],
  });
};

// Update an order
export const updateOrder = async (id: string, data: any) => {
  const transaction = await sequelize.transaction();
  try {
    const order = await Order.findByPk(id, { transaction });
    if (!order) {
      await transaction.rollback();
      return null;
    }

    const { items, ...orderData } = data;

    await order.update(orderData, { transaction });

    if (items) {
      await OrderItem.destroy({ where: { orderId: id }, transaction });
      for (const item of items) {
        await OrderItem.create({ ...item, orderId: id }, { transaction });
      }
    }

    await transaction.commit();
    return await Order.findByPk(id, {
      include: [{ model: OrderItem, as: "items" }],
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Update order status
// Update order status
export const updateOrderStatus = async (
  id: string,
  status: string,
  collectedByUserId: string,
  receivedItems: Array<{
    orderItemId: number;
    receivedQuantity: number;
  }> = [] // Add default empty array
) => {
  const transaction = await sequelize.transaction();
  console.log("Updating order status:", {
    orderId: id,
    status,
    receivedItems,
    collectedByUserId,
  });

  try {
    const order = await Order.findByPk(id, {
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return null;
    }

    // Validate status transition
    if (!isValidStatusTransition(order.status, status)) {
      await transaction.rollback();
      throw new Error(
        `Invalid status transition from ${order.status} to ${status}`
      );
    }

    console.log("Updating order status:", {
      orderId: order.id,
      fromStatus: order.status,
      toStatus: status,
    });

    // Handle different status updates

    if (status === "collected") {
      await order.update(
        { status, collectedByUserId: collectedByUserId },
        { transaction }
      );
    } else if (status === "completed") {
      await order.update(
        {
          status,
          toBePaidTotalPrice: order.totalOrderPrice || 0,
          toBePaidEmployeePrice: order.totalOrderEmployeePrice || 0,
          toBePaidHospitalPrice: order.totalOrderHospitalPrice || 0,
          totalPreparedOrderItems: order.totalRequestOrderItems || 0,
        },
        { transaction }
      );
    } else if (status === "non-completed") {
      // For non-completed orders, use the provided receivedItems
      const orderItems = await OrderItem.findAll({
        where: { orderId: id },
        include: [
          {
            model: FoodItem,
            as: "foodItem",
          },
        ],
        transaction,
      });

      // Calculate total prepared order items
      const totalPreparedOrderItems = orderItems.reduce(
        (sum, item) => sum + (item.receivedNumberOfItem || 0),
        0
      );

      // Use the provided ReceivedItems to calculate adjustments
      const adjustments = await calculateTobePaidValues(
        orderItems,
        receivedItems
      );

      // Update each order item
      for (const item of orderItems) {
        const receivedItem = receivedItems.find(
          (ri) => ri.orderItemId === item.id
        );
        const receivedQuantity = receivedItem?.receivedQuantity ?? 0;

        console.log("Updating order item:", {
          itemId: item.id,
          quantity: item.quantity,
          receivedQuantity,
        });

        await OrderItem.update(
          { receivedNumberOfItem: receivedQuantity },
          { where: { id: item.id }, transaction }
        );
      }
      console.log("Adjustments for non-completed order:", adjustments);

      // Update order with adjusted prices
      await order.update(
        {
          status,
          toBePaidTotalPrice: adjustments.tobePaidPrice,
          toBePaidEmployeePrice: adjustments.tobePaidEmployeePrice,
          toBePaidHospitalPrice: adjustments.tobePaidHospitalPrice,
          totalPreparedOrderItems: totalPreparedOrderItems,
        },
        { transaction }
      );
    } else {
      // For other status changes (pending, prepared, cancelled)
      await order.update({ status }, { transaction });
    }

    await transaction.commit();

    if (status === "completed" || status === "non-completed") {
      // Update the monthly summary for this order's supplier
      if (order.supplierId) {
        await updateMonthlySummary(order.supplierId, order.orderDate);
      }
    }

    console.log("Order status updated successfully 😮‍💨");
    return order;
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    await transaction.rollback();
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (id: string) => {
  const transaction = await sequelize.transaction();
  try {
    const order = await Order.findByPk(id, { transaction });
    if (!order) {
      await transaction.rollback();
      return false;
    }

    await OrderItem.destroy({ where: { orderId: id }, transaction });
    await order.destroy({ transaction });

    // Update monthly
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
