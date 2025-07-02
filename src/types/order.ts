export interface OrderAttributes {
  id?: string;
  collectedByEmployeeId: string;
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
