import Order from "../models/order";
import OrderItem from "../models/orderItems";
import sequelize from "../config/db";
import { calculateOrderTotals } from "../utils/orderCalculation";
import { generateOrderId } from "../utils/genaretedId";

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
    include: [{ model: OrderItem, as: "items" }],
  });
};

// Get order by ID
export const getOrderById = async (id: string) => {
  const order = await Order.findByPk(id, {
    include: [{ model: OrderItem, as: "items" }],
  });
  return order;
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
export const updateOrderStatus = async (id: string, status: string) => {
  const transaction = await sequelize.transaction();
  try {
    const order = await Order.findByPk(id, { transaction });
    if (!order) {
      await transaction.rollback();
      return null;
    }

    await order.update({ status }, { transaction });
    await transaction.commit();
    return order;
  } catch (error) {
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

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
