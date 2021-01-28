import request from '@/utils/request';
import type React from 'react';

export interface SearchCondition {
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
  password: string;
  createDateTime: Date;
  enabled: boolean;
  locked: boolean;
}

export interface DeleteIds {
  id: React.ReactText;
}

// 根据指定条件获取用户信息
export async function getUsers(params: SearchCondition) {
  return request('/admin/users', {
    method: 'GET',
    params,
  });
}

// 更新用户信息
export async function updateUser(user: UserListItem) {
  return request('/admin/users', {
    method: 'PUT',
    data: user,
  });
}

// 删除单个用户
export async function deleteUser(user: UserListItem) {
  return request(`/admin/users/${user.id}`, {
    method: 'DELETE',
  });
}

// 批量删除用户
export async function deleteUsers(ids: DeleteIds[]) {
  return request(`/admin/users/`, {
    method: 'DELETE',
    data: ids,
  });
}
