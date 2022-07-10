import { ApiMember } from './ApiMember';

export interface ApiGroup<M extends ApiMember = ApiMember> {
  id: number;
  name: string;
  friends: M[];
  createdAt: string;
}
