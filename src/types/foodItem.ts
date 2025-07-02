export interface FoodItemAttributes {
  id?: number;
  name: string;
  description?: string;
  supplierId: string;
  price: number;
  employeeprice: number;
  hospitalprice: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}
