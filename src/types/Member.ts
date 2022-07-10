import { ApiMember } from './api/ApiMember';
import { Expense } from './Expense';

export interface Member extends ApiMember<Expense> {
  createdAtDate: Date;
}
