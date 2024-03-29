import request, { BASE_PATH } from '@/utils/request';

// 根据指定条件获取用户信息
export async function getUsers(params: API.UserSearchParams) {
  return request('/admin/users', {
    method: 'GET',
    params,
  });
}

// 更新用户信息
export async function updateUser(user: API.UserListItem) {
  return request('/admin/users', {
    method: 'PUT',
    data: user,
  });
}

// 删除单个用户
export async function deleteUser(user: API.UserListItem) {
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
  return `${BASE_PATH}/admin/users/import`;
}

// 导出用户列表
export async function exportUsers() {
  const oA = document.createElement('a');
  oA.setAttribute('href', `${BASE_PATH}/admin/users/export`);
  oA.click();
}

// 创建用户
export async function createUser(user: API.UserListItem) {
  return request('/admin/users', {
    method: 'POST',
    data: user,
  });
}

// 上传头像
export function uploadUserAvatarURL() {
  return `${BASE_PATH}/admin/users/avatar`;
}

// 增加用户角色
export async function addUserRole(params: API.AddUserRoleParams) {
  return request('/admin/users/roles', {
    method: 'POST',
    data: params,
  });
}

// 删除用户角色
export async function deleteUserRole(params: API.DeleteUserRoleParams) {
  return request('/admin/users/roles', {
    method: 'DELETE',
    data: params,
  });
}
