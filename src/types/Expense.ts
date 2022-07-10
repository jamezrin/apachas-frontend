import { ApiExpense } from './api_receive/ApiExpense';

export interface Expense extends ApiExpense {
  expenseAtDate: Date;
  createdAtDate: Date;
}
