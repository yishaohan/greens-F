import request from '@/utils/request';

export interface searchType {
  current?: number;
  pageSize?: number;
  nickname?: string;
  username?: string;
  mobilePhone?: string;
}

export async function getUsers(params: searchType) {
  return request('/admin/users', {
    method: 'GET',
    params,
  });
}
