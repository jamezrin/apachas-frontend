import { ApiExpense } from './ApiExpense';

export interface ApiMember<E extends ApiExpense = ApiExpense> {
  id: number;
  name: string;
  expenses: E[];
  createdAt: string;
}
