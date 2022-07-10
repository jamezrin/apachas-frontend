import apiMapperService from './api-mapper-service';
import { Group } from '../types/Group';
import { CreateExpenseBody } from '../types/api_send/CreateExpenseBody';
import { CreateMemberBody } from '../types/api_send/CreateMemberBody';

export const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

function handleResponse(response: Response): Promise<Response> {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response);
    } else {
      reject(response);
    }
  });
}

async function fetchGroupByName(name: string): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups/${name}`;
  return fetch(url, { method: 'GET' })
    .then(handleResponse)
    .then((reply) => reply.json())
    .then(apiMapperService.mapApiGroup);
}

async function createNewGroup(): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups`;
  return fetch(url, { method: 'GET' })
    .then(handleResponse)
    .then((reply) => reply.json())
    .then(apiMapperService.mapApiGroup);
}

async function registerExpense(
  groupName: string,
  memberId: number,
  createExpenseBody: CreateExpenseBody,
): Promise<any> {
  const url =
    BACKEND_BASE_URL + `/groups/${groupName}/members/${memberId}/expenses`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createExpenseBody),
  }).then(handleResponse);
}

async function createMember(
  groupName: string,
  createMemberBody: CreateMemberBody,
): Promise<any> {
  const url = BACKEND_BASE_URL + `/groups/${groupName}/members`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createMemberBody),
  }).then(handleResponse);
}

export default {
  fetchGroupByName,
  createNewGroup,
  registerExpense,
  createMember,
};
