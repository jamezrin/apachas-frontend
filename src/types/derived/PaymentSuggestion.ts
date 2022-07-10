import { Member } from '../Member';

export interface PaymentSuggestion {
  from: Member;
  to: Member;
  amount: number;
}
