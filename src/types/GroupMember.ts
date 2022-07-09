import { GroupExpense } from './GroupExpense';

export interface GroupMember {
  id: number;
  name: string;
  expenses: GroupExpense[];
  createdAt: string;
}
