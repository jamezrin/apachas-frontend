import apiMapperService from './api-mapper-service';
import { Group } from '../types/Group';
import { CreateExpenseBody } from '../types/api_send/CreateExpenseBody';
import { CreateMemberBody } from '../types/api_send/CreateMemberBody';
import { ApiGroup } from '../types/api_receive/ApiGroup';
import betterFetch from '../utils/betterFetch';

export const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

async function fetchGroupByName(name: string): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups/${name}`;
  return betterFetch<ApiGroup>(url, { method: 'GET' }).then((response) => {
    return apiMapperService.mapApiGroup(response.data);
  });
}

async function createNewGroup(): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups`;
  return betterFetch<ApiGroup>(url, { method: 'GET' }).then((response) =>
    apiMapperService.mapApiGroup(response.data),
  );
}

async function registerExpense(
  groupName: string,
  memberId: number,
  createExpenseBody: CreateExpenseBody,
): Promise<any> {
  const url =
    BACKEND_BASE_URL + `/groups/${groupName}/members/${memberId}/expenses`;
  return betterFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createExpenseBody),
  });
}

async function createMember(
  groupName: string,
  createMemberBody: CreateMemberBody,
): Promise<any> {
  const url = BACKEND_BASE_URL + `/groups/${groupName}/members`;
  return betterFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createMemberBody),
  });
}

export default {
  fetchGroupByName,
  createNewGroup,
  registerExpense,
  createMember,
};
