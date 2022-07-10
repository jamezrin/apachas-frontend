import { ApiGroup } from './api/ApiGroup';
import { Member } from './Member';
import { FlatMemberExpense } from './derived/FlatMemberExpense';

export interface Group extends ApiGroup<Member> {
  createdAtDate: Date;
}
