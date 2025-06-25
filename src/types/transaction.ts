export interface TransactionAttributes {
  id?: number;
  supplyerId: string;
  transactionDate: Date;
  monthlyAmount: number;
  status: string;
  paymentMethod: string;
}
