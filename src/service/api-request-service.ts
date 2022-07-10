import apiMapperService from './api-mapper-service';
import { Group } from '../types/Group';
import { CreateExpenseBody } from '../types/api_send/CreateExpenseBody';
import { CreateMemberBody } from '../types/api_send/CreateMemberBody';
import { ApiError } from '../types/api_receive/ApiError';
import { ApiGroup } from '../types/api_receive/ApiGroup';

export const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

interface BetterResponse<T = any> extends Response {
  data: T | any;
}

function betterFetch<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<BetterResponse<T>> {
  return new Promise((resolve, reject) => {
    fetch(input, init).then(async (response) => {
      const requestClone = response.clone() as BetterResponse<T>;

      const contentType = requestClone.headers.get('Content-Type');

      Object.assign(requestClone, {
        data: await (async () => {
          switch (contentType) {
            case 'application/json':
              return await requestClone.json();
            case 'text/plain':
              return await requestClone.text();
          }

          return null;
        })(),
      });

      response.ok ? resolve(requestClone) : reject(requestClone);
    });
  });
}

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
