export type Expense = {
  id: string;
  category: string;
  date: string;
  createdAt: string;
  amount: number;
};

export type ExpenseFormValues = {
  amount: number;
  category: string;
  date: string;
};
