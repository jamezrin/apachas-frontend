import { Group } from '../types/Group';

export const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

export async function fetchGroupByName(name: string): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups/${name}`;
  return fetch(url, {
    method: 'GET',
  }).then((reply) => reply.json());
}
