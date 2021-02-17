import request, { BASE_PATH } from '@/utils/request';

// 根据指定条件获取角色信息
export async function getRoles(params: API.RoleSearchParams) {
  return request('/admin/roles', {
    method: 'GET',
    params,
  });
}

// 更新角色信息
export async function updateRole(role: API.RoleListItem) {
  return request('/admin/roles', {
    method: 'PUT',
    data: role,
  });
}

// 删除单个角色
export async function deleteRole(role: API.RoleListItem) {
  return request(`/admin/roles/${role.id}`, {
    method: 'DELETE',
  });
}

// 批量删除角色
export async function deleteRoles(ids: (string | number | undefined)[]) {
  return request(`/admin/roles/`, {
    method: 'DELETE',
    data: ids,
  });
}

// 导入角色列表
export function importRoles() {
  return `${BASE_PATH}/admin/roles/import`;
}

// 导出角色列表
export async function exportRoles() {
  const oA = document.createElement('a');
  oA.setAttribute('href', `${BASE_PATH}/admin/roles/export`);
  oA.click();
}

// 创建角色
export async function createRole(role: API.RoleListItem) {
  return request('/admin/roles', {
    method: 'POST',
    data: role,
  });
}

// 更新角色权限
export async function updateRoleAuths(roles: API.UpdateRoleAuthParam) {
  return request('/admin/roles/auths', {
    method: 'PUT',
    data: roles,
  });
}

// 更新角色菜单
export async function updateRoleMenus(menus: API.UpdateRoleMenuParam) {
  return request('/admin/roles/menus', {
    method: 'PUT',
    data: menus,
  });
}
