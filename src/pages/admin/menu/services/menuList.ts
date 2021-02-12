import request from '@/utils/request';

// 根据指定条件获取菜单信息
export async function getMenus(params: API.MenuSearchParams) {
  return request('/admin/menus', {
    method: 'GET',
    params,
  });
}

// 根据指定条件获取菜单信息
export async function getHigherMenus(menuGrade: number) {
  return request(`/admin/menus/menuGrade?menuGrade=${menuGrade}`, {
    method: 'GET',
  });
}

// 更新菜单信息
export async function updateMenu(menu: API.MenuListItem) {
  return request('/admin/menus', {
    method: 'PUT',
    data: menu,
  });
}

// 删除单个菜单
export async function deleteMenu(menu: API.MenuListItem) {
  return request(`/admin/menus/${menu.id}`, {
    method: 'DELETE',
  });
}

// 批量删除菜单
export async function deleteMenus(ids: (string | number | undefined)[]) {
  return request(`/admin/menus/`, {
    method: 'DELETE',
    data: ids,
  });
}

// 创建菜单
export async function createMenu(menu: API.MenuListItem) {
  return request('/admin/menus', {
    method: 'POST',
    data: menu,
  });
}
