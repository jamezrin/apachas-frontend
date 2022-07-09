import { ApiGroupExpense } from './api/ApiGroupExpense';
import { GroupExpense } from './GroupExpense';
import { GroupMember } from './GroupMember';

export interface FlatMemberExpense extends GroupExpense {
  member: GroupMember;
}
