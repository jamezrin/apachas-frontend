import { ApiGroup } from './api_receive/ApiGroup';
import { Member } from './Member';

export interface Group extends ApiGroup<Member> {
  createdAtDate: Date;
}
