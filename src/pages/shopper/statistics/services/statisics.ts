import request from '@/utils/request';

// 根据指定条件获取订单信息
export async function getOrders(params: API.OrderListItemSearchParams) {
  return request('/user/orders', {
    method: 'GET',
    params,
  });
}

// 更新订单信息
export async function updateOrder(params: API.OrderListItem) {
  return request('/user/orders', {
    method: 'PUT',
    data: params,
  });
}

export async function getStatistics() {
  return request('/user/statistics', {
    method: 'GET'
  });
}
