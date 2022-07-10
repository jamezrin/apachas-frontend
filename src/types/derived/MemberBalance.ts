import { ApiExpense } from '../api/ApiExpense';
import { Expense } from '../Expense';
import { Member } from '../Member';

export interface MemberBalance {
  member: Member;
  balance: number;
}
