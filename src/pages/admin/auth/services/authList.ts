import request from '@/utils/request';

// 根据指定条件获取用户信息
export async function getAuths(params: API.AuthSearchParams) {
  return request('/admin/auths', {
    method: 'GET',
    params,
  });
}

// 根据指定条件获取用户信息
export async function getHigherAuths(authGrade: number) {
  return request(`/admin/auths/authGrade?authGrade=${authGrade}`, {
    method: 'GET',
  });
}

// 更新用户信息
export async function updateAuth(auth: API.AuthListItem) {
  return request('/admin/auths', {
    method: 'PUT',
    data: auth,
  });
}

// 删除单个用户
export async function deleteAuth(auth: API.AuthListItem) {
  return request(`/admin/auths/${auth.id}`, {
    method: 'DELETE',
  });
}

// 批量删除用户
export async function deleteAuths(ids: (string | number | undefined)[]) {
  return request(`/admin/auths/`, {
    method: 'DELETE',
    data: ids,
  });
}

// 创建用户
export async function createAuth(auth: API.AuthListItem) {
  return request('/admin/auths', {
    method: 'POST',
    data: auth,
  });
}
