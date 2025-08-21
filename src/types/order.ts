export interface OrderAttributes {
  id?: string;
  collectedByUserId: string;
  orderCreatorUserId: string;
  orderDate: Date;
  departmentId: number;
  totalRequestOrderItems: number;
  totalPreparedOrderItems: number;
  totalOrderPrice: number;
  totalOrderEmployeePrice: number;
  totalOrderHospitalPrice: number;
  status: string;
  mealType: string;
}

export interface OrderTotals {
  totalRequestOrderItems: number;
  totalOrderPrice: number;
  totalOrderEmployeePrice: number;
  totalOrderHospitalPrice: number;
}
