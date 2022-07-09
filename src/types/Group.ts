import { ApiGroup } from './api/ApiGroup';
import { GroupMember } from './GroupMember';

export interface Group extends ApiGroup<GroupMember> {
  createdAtDate: Date;
}
