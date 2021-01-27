import request from '@/utils/request';

export interface searchType {
  current?: number;
  pageSize?: number;
  nickname?: string;
  username?: string;
  mobilePhone?: string;
}

export interface UserListItem {
  id: number;
  avatarURL: string;
  nickname: string;
  username: string;
  mobilePhone: string;
  password: String;
  createDateTime: Date;
  enabled: boolean;
  locked: boolean;
}

export async function getUsers(params: searchType) {
  return request('/admin/users', {
    method: 'GET',
    params,
  });
}

export async function updateUser(user: UserListItem) {
  return request('/admin/users', {
    method: 'PUT',
    data: user,
  });
}

export async function deleteUser(user: UserListItem) {
  return request(`/admin/users/${user.id}`, {
    method: 'DELETE',
  });
}
