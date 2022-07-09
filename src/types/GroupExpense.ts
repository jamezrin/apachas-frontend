import { ApiGroupExpense } from './api/ApiGroupExpense';

export interface GroupExpense extends ApiGroupExpense {
  expenseAtDate: Date;
  createdAtDate: Date;
}
