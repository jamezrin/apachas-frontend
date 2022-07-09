import { ApiGroupExpense } from './ApiGroupExpense';

export interface ApiGroupMember<E extends ApiGroupExpense = ApiGroupExpense> {
  id: number;
  name: string;
  expenses: E[];
  createdAt: string;
}
