import { ApiExpense } from '../api/ApiExpense';
import { Expense } from '../Expense';
import { Member } from '../Member';

export interface FlatMemberExpense extends Expense {
  member: Member;
}
