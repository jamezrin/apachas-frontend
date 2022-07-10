import apiMapperService from './api-mapper-service';
import { Group } from '../types/Group';
import { ApiGroup } from '../types/api/ApiGroup';

export const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  const body = await response.json();
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(body);
    } else {
      reject(body);
    }
  });
}

async function fetchGroupByName(name: string): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups/${name}`;
  return fetch(url, { method: 'GET' })
    .then(handleResponse<ApiGroup>)
    .then(apiMapperService.mapApiGroup);
}

async function createNewGroup(): Promise<Group> {
  const url = BACKEND_BASE_URL + `/groups`;
  return fetch(url, { method: 'GET' })
    .then(handleResponse<ApiGroup>)
    .then(apiMapperService.mapApiGroup);
}

export default {
  fetchGroupByName,
  createNewGroup,
};