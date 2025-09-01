// controllers/orderSummary.controller.ts
import { Request, Response } from "express";
import * as OrderSummaryService from "../services/order-summary.service";

// Get all order summaries with pagination
export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await OrderSummaryService.getAllOrderSummaries();
    res.status(200).json({
      summaries: result.summaries,
      totalCount: result.totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order summaries", error });
  }
};

// Get order summaries by supplier
export const getBySupplier = async (req: Request, res: Response) => {
  try {
    const summaries = await OrderSummaryService.getOrderSummariesBySupplier(
      req.params.supplierId
    );
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order summaries", error });
  }
};

// Get monthly order summary
export const getMonthlySummary = async (req: Request, res: Response) => {
  try {
    const { supplierId, year, month } = req.params;

    const summary = await OrderSummaryService.getMonthlyOrderSummary(
      supplierId,
      parseInt(year),
      parseInt(month)
    );

    if (!summary) {
      res.status(404).json({ message: "Monthly summary not found" });
      return;
    }

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly summary", error });
  }
};

// Get yearly order summary
export const getYearlySummary = async (req: Request, res: Response) => {
  try {
    const { supplierId, year } = req.params;

    const summary = await OrderSummaryService.getYearlyOrderSummary(
      supplierId,
      parseInt(year)
    );

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching yearly summary", error });
  }
};

// Get quarterly order summary
export const getQuarterlySummary = async (req: Request, res: Response) => {
  try {
    const { supplierId, year, quarter } = req.params;

    const summary = await OrderSummaryService.getQuarterlyOrderSummary(
      supplierId,
      parseInt(year),
      parseInt(quarter)
    );

    res.status(200).json(summary);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quarterly summary", error });
  }
};

// Recalculate monthly summary
export const recalculateMonthly = async (req: Request, res: Response) => {
  try {
    const { supplierId, year, month } = req.params;

    const summary = await OrderSummaryService.recalculateMonthlySummary(
      supplierId,
      parseInt(year),
      parseInt(month)
    );

    res.status(200).json({
      message: "Monthly summary recalculated successfully",
      summary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error recalculating summary", error });
  }
};

// Delete order summary
export const deleteSummary = async (req: Request, res: Response) => {
  try {
    const success = await OrderSummaryService.deleteOrderSummary(
      parseInt(req.params.id)
    );

    if (!success) {
      res.status(404).json({ message: "Order summary not found" });
      return;
    }

    res.status(200).json({ message: "Order summary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order summary", error });
  }
};

// Get summary for custom period
export const getCustomPeriodSummary = async (req: Request, res: Response) => {
  try {
    const { supplierId } = req.params;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      res.status(400).json({ message: "Start date and end date are required" });
      return;
    }

    const summary = await OrderSummaryService.getSummaryForPeriod(
      supplierId,
      new Date(startDate),
      new Date(endDate)
    );

    res.status(200).json(summary);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching custom period summary", error });
  }
};

export const getMonthlyAllOrdersSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const summary = await OrderSummaryService.getMonthlyAllOrdersSummary();

    res.status(200).json(summary);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching monthly total orders summary", error });
  }
};
