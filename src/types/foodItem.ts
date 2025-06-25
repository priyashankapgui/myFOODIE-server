export interface FoodItemAttributes {
  id?: number;
  name: string;
  description?: string;
  supplierId: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}
