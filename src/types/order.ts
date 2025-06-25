export interface OrderAttributes {
  id?: string;
  userId: string;
  foodId: number;
  quantity: number;
  orderDate: Date;
  status: string;
}
