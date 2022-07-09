import { GroupMember } from './GroupMember';

export interface Group {
  id: number;
  name: string;
  friends: GroupMember[];
  createdAt: string;
}
