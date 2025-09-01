export interface TransactionAttributes {
  id: string;
  supplierId: string;
  transactionDate: Date;
  monthlyAmount: number;
  paymentStatus: string;
  paymentMethod: string;
}
