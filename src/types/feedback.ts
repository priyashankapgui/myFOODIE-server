export interface FeedbackAttributes {
  id?: number;
  userId: string;
  foodId: number;
  supplierId: string;
  rating: number;
  comment?: string;
}
