export interface Expense {
  expenseCategoryId: number;
  category? :string;
  amount: number;
  description: string;
  createdDate: string; 
}
