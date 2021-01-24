import request from '@/utils/request';

interface searchType {
  current?: number;
  pageSize?: number;
}

export async function getUsers(params: searchType) {
  return request('/admin/users', {
    method: 'GET',
    params,
  });
}
