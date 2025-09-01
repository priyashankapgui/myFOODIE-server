export interface OrderItemAttributes {
  id?: number;
  orderId: string;
  foodItemId: number;
  userId: string;
  quantity: number;
  receivedNumberOfItem?: number;
}
