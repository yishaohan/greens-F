import request from '@/utils/request';

// 根据指定条件获取用户信息
export async function getRoles(params: API.RoleSearchParams) {
  return request('/admin/roles', {
    method: 'GET',
    params,
  });
}

// 更新用户信息
export async function updateRole(role: API.RoleListItem) {
  return request('/admin/roles', {
    method: 'PUT',
    data: role,
  });
}

// 删除单个用户
export async function deleteRole(role: API.RoleListItem) {
  return request(`/admin/roles/${role.id}`, {
    method: 'DELETE',
  });
}

// 批量删除用户
export async function deleteRoles(ids: (string | number | undefined)[]) {
  return request(`/admin/roles/`, {
    method: 'DELETE',
    data: ids,
  });
}

// 导入用户列表
export function importRoles() {
  return 'https://xclass.highspeed.vip:50443/api/v1/admin/roles/import';
}

// 导出用户列表
export async function exportRoles() {
  const oA = document.createElement('a');
  oA.setAttribute('href', 'https://xclass.highspeed.vip:50443/api/v1/admin/roles/export');
  oA.click();
}

// 创建用户
export async function createRole(role: API.RoleListItem) {
  return request('/admin/roles', {
    method: 'POST',
    data: role,
  });
}
