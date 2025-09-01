// services/orderSummaryService.ts
import OrderSummary from "../models/order-summary";
import {
  calculateMonthlyOrderSummary,
  getOrCreateMonthlySummary,
  updateMonthlySummary as updateMonthlySummaryUtil,
  getSummaryForPeriod as getSummaryForPeriodUtil,
} from "../utils/orderSummaryCalculation";
import { OrderSummary as OrderSummaryType } from "../types/orderSummary";
import Order from "../models/order";
import { Op } from "sequelize";

/**
 * Get all order summaries for a supplier
 */
export const getOrderSummariesBySupplier = async (
  supplierId: string
): Promise<OrderSummaryType[]> => {
  return await OrderSummary.findAll({
    where: { supplierId },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Get order summary for a specific month
 */
export const getMonthlyOrderSummary = async (
  supplierId: string,
  year: number,
  month: number
): Promise<OrderSummaryType> => {
  return await getOrCreateMonthlySummary(supplierId, year, month);
};

/**
 * Get yearly summary for a supplier
 */
export const getYearlyOrderSummary = async (
  supplierId: string,
  year: number
): Promise<OrderSummaryType> => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59);

  return await getSummaryForPeriodUtil(supplierId, startDate, endDate);
};

/**
 * Get quarterly summary for a supplier
 */
export const getQuarterlyOrderSummary = async (
  supplierId: string,
  year: number,
  quarter: number
): Promise<OrderSummaryType> => {
  const startMonth = (quarter - 1) * 3;
  const endMonth = startMonth + 2;

  const startDate = new Date(year, startMonth, 1);
  const endDate = new Date(year, endMonth + 1, 0, 23, 59, 59);

  return await getSummaryForPeriodUtil(supplierId, startDate, endDate);
};

/**
 * Force recalculation of a monthly summary
 */
export const recalculateMonthlySummary = async (
  supplierId: string,
  year: number,
  month: number
): Promise<OrderSummaryType> => {
  const summaryData = await calculateMonthlyOrderSummary(
    supplierId,
    year,
    month
  );

  // Find existing summary for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const existingSummary = await OrderSummary.findOne({
    where: {
      supplierId,
      // @ts-ignore: createdAt is a valid column in the model
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  if (existingSummary) {
    await existingSummary.update({
      monthlyTotalOrders: summaryData.monthlyTotalOrders,
      monthlyTotalItems: summaryData.monthlyTotalItems,
      monthlyTotalPrice: summaryData.monthlyTotalPrice,
      monthlyTotalEmployeePrice: summaryData.monthlyTotalEmployeePrice,
      monthlyTotalHospitalPrice: summaryData.monthlyTotalHospitalPrice,
    });
    return existingSummary;
  } else {
    return await OrderSummary.create({
      monthlyTotalOrders: summaryData.monthlyTotalOrders,
      monthlyTotalItems: summaryData.monthlyTotalItems,
      monthlyTotalPrice: summaryData.monthlyTotalPrice,
      monthlyTotalEmployeePrice: summaryData.monthlyTotalEmployeePrice,
      monthlyTotalHospitalPrice: summaryData.monthlyTotalHospitalPrice,
      supplierId,
    });
  }
};

/**
 * Delete order summary by ID
 */
export const deleteOrderSummary = async (id: number): Promise<boolean> => {
  const summary = await OrderSummary.findByPk(id);
  if (!summary) {
    return false;
  }

  await summary.destroy();
  return true;
};

/**
 * Get all order summaries with pagination
 */
export const getAllOrderSummaries = async (
  page: number = 1,
  limit: number = 10
): Promise<{ summaries: OrderSummaryType[]; totalCount: number }> => {
  const offset = (page - 1) * limit;

  const { count, rows } = await OrderSummary.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    summaries: rows,
    totalCount: count,
  };
};

/**
 * Get summary for a specific time period
 */
export const getSummaryForPeriod = async (
  supplierId: string,
  startDate: Date,
  endDate: Date
): Promise<OrderSummaryType> => {
  return await getSummaryForPeriodUtil(supplierId, startDate, endDate);
};

/**
 * Update monthly summary when an order is updated
 */
export const updateMonthlySummary = async (
  supplierId: string,
  orderDate: Date
): Promise<void> => {
  await updateMonthlySummaryUtil(supplierId, orderDate);
};

// Add to services/orderSummaryService.ts
export const getMonthlyAllOrdersSummary =
  async (): Promise<OrderSummaryType> => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    // Get all orders for this month regardless of supplier
    const orders = await Order.findAll({
      where: {
        orderDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        status: {
          [Op.in]: ["completed", "non-completed"],
        },
      },
    });

    // Calculate totals from all orders
    return {
      id: 0,
      monthlyTotalOrders: orders.length,
      monthlyTotalItems: orders.reduce(
        (sum, order) => sum + (order.totalPreparedOrderItems || 0),
        0
      ),
      monthlyTotalPrice: orders.reduce(
        (sum, order) => sum + (order.toBePaidTotalPrice || 0),
        0
      ),
      monthlyTotalEmployeePrice: orders.reduce(
        (sum, order) => sum + (order.toBePaidEmployeePrice || 0),
        0
      ),
      monthlyTotalHospitalPrice: orders.reduce(
        (sum, order) => sum + (order.toBePaidHospitalPrice || 0),
        0
      ),
      supplierId: "all",
    };
  };
