import { ApiGroupMember } from './ApiGroupMember';

export interface ApiGroup<M extends ApiGroupMember = ApiGroupMember> {
  id: number;
  name: string;
  friends: M[];
  createdAt: string;
}
