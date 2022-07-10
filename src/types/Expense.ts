import { ApiExpense } from './api/ApiExpense';
import { FlatMemberExpense } from './derived/FlatMemberExpense';

export interface Expense extends ApiExpense {
  expenseAtDate: Date;
  createdAtDate: Date;
}
