import { ApiGroupMember } from './api/ApiGroupMember';
import { GroupExpense } from './GroupExpense';

export interface GroupMember extends ApiGroupMember<GroupExpense> {
  createdAtDate: Date;
}
