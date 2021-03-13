import request from '@/utils/request';

export async function submitOrder(params: API.SubmitOrder) {
  return request('/public/orders', {
    method: 'POST',
    data: params,
  });
}

export async function cancelOrder(params: API.SubmitOrder) {
  return request('/public/cancelOrder', {
    method: 'POST',
    data: params,
  });
}

export async function errorOrder(params: API.SubmitOrder) {
  return request('/public/errorOrder', {
    method: 'POST',
    data: params,
  });
}
