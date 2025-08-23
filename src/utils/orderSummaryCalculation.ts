// utils/orderSummaryCalculation.ts
import Order from "../models/order";
import OrderSummary from "../models/order-summary";
import { OrderSummary as OrderSummaryType } from "../types/orderSummary";
import { Op } from "sequelize";

export interface MonthlySummaryData {
  supplierId: string;
  year: number;
  month: number;
}

export interface OrderSummaryResult extends OrderSummaryType {
  year: number;
  month: number;
}

/**
 * Calculate monthly order summary for a supplier
 */
export const calculateMonthlyOrderSummary = async (
  supplierId: string,
  year: number,
  month: number
): Promise<OrderSummaryResult> => {
  // Calculate start and end dates for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  // Get all orders for the supplier in the specified month
  const orders = await Order.findAll({
    where: {
      supplierId: supplierId,
      orderDate: {
        [Op.between]: [startDate, endDate],
      },
      status: {
        [Op.in]: ["completed", "non-completed"],
      },
    },
  });

  // Calculate totals
  const monthlyTotalOrders = orders.length;
  const monthlyTotalItems = orders.reduce(
    (sum, order) => sum + (order.totalPreparedOrderItems || 0),
    0
  );
  const monthlyTotalPrice = orders.reduce(
    (sum, order) => sum + (order.toBePaidTotalPrice || 0),
    0
  );
  const monthlyTotalEmployeePrice = orders.reduce(
    (sum, order) => sum + (order.toBePaidEmployeePrice || 0),
    0
  );
  const monthlyTotalHospitalPrice = orders.reduce(
    (sum, order) => sum + (order.toBePaidHospitalPrice || 0),
    0
  );

  return {
    id: 0, // Will be set when saving to database
    monthlyTotalOrders,
    monthlyTotalItems,
    monthlyTotalPrice,
    monthlyTotalEmployeePrice,
    monthlyTotalHospitalPrice,
    supplierId,
    year,
    month,
  };
};

/**
 * Get or create monthly summary for a supplier
 */
export const getOrCreateMonthlySummary = async (
  supplierId: string,
  year: number,
  month: number
): Promise<OrderSummary> => {
  // Try to find existing summary
  const existingSummary = await OrderSummary.findOne({
    where: {
      supplierId,
      // @ts-ignore: createdAt is a valid column in the model
      createdAt: {
        [Op.between]: [
          new Date(year, month - 1, 1),
          new Date(year, month, 0, 23, 59, 59),
        ],
      },
    },
  });

  if (existingSummary) {
    return existingSummary;
  }

  // Calculate and create new summary
  const summaryData = await calculateMonthlyOrderSummary(
    supplierId,
    year,
    month
  );

  return await OrderSummary.create({
    monthlyTotalOrders: summaryData.monthlyTotalOrders,
    monthlyTotalItems: summaryData.monthlyTotalItems,
    monthlyTotalPrice: summaryData.monthlyTotalPrice,
    monthlyTotalEmployeePrice: summaryData.monthlyTotalEmployeePrice,
    monthlyTotalHospitalPrice: summaryData.monthlyTotalHospitalPrice,
    supplierId: summaryData.supplierId,
  });
};

/**
 * Update monthly summary when an order is updated
 */
export const updateMonthlySummary = async (
  supplierId: string,
  orderDate: Date
): Promise<void> => {
  const year = orderDate.getFullYear();
  const month = orderDate.getMonth() + 1;

  // Recalculate the summary for that month
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
    // Update existing summary
    await existingSummary.update({
      monthlyTotalOrders: summaryData.monthlyTotalOrders,
      monthlyTotalItems: summaryData.monthlyTotalItems,
      monthlyTotalPrice: summaryData.monthlyTotalPrice,
      monthlyTotalEmployeePrice: summaryData.monthlyTotalEmployeePrice,
      monthlyTotalHospitalPrice: summaryData.monthlyTotalHospitalPrice,
    });
  } else {
    // Create new summary
    await OrderSummary.create({
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
 * Get summary for a specific time period
 */
export const getSummaryForPeriod = async (
  supplierId: string,
  startDate: Date,
  endDate: Date
): Promise<OrderSummaryType> => {
  const summaries = await OrderSummary.findAll({
    where: {
      supplierId,
      // @ts-ignore: createdAt is a valid column in the model
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Aggregate all summaries in the period
  return summaries.reduce(
    (acc, summary) => ({
      id: 0,
      monthlyTotalOrders: acc.monthlyTotalOrders + summary.monthlyTotalOrders,
      monthlyTotalItems: acc.monthlyTotalItems + summary.monthlyTotalItems,
      monthlyTotalPrice: acc.monthlyTotalPrice + summary.monthlyTotalPrice,
      monthlyTotalEmployeePrice:
        acc.monthlyTotalEmployeePrice + summary.monthlyTotalEmployeePrice,
      monthlyTotalHospitalPrice:
        acc.monthlyTotalHospitalPrice + summary.monthlyTotalHospitalPrice,
      supplierId,
    }),
    {
      id: 0,
      monthlyTotalOrders: 0,
      monthlyTotalItems: 0,
      monthlyTotalPrice: 0,
      monthlyTotalEmployeePrice: 0,
      monthlyTotalHospitalPrice: 0,
      supplierId,
    }
  );
};
