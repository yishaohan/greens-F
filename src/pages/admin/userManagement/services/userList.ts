import request from '@/utils/request';

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
export async function deleteUsers(ids: (string | number | undefined)[]) {
  return request(`/admin/users/`, {
    method: 'DELETE',
    data: ids,
  });
}

// 导入用户列表
export function importUsers() {
  return 'https://xclass.highspeed.vip:50443/api/v1/admin/users/import';
}

// 导出用户列表
export async function exportUsers() {
  const oA = document.createElement('a');
  oA.setAttribute('href', 'https://xclass.highspeed.vip:50443/api/v1/admin/users/export');
  oA.click();
}

// 创建用户
export async function createUser(user: UserListItem) {
  return request('/admin/users', {
    method: 'POST',
    data: user,
  });
}

// 上传头像
export function uploadUserAvatarURL() {
  return 'https://xclass.highspeed.vip:50443/api/v1/user/avatar';
}
