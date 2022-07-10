import { ApiMember } from './api_receive/ApiMember';
import { Expense } from './Expense';

export interface Member extends ApiMember<Expense> {
  createdAtDate: Date;
}
