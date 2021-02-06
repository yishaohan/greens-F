import request from '@/utils/request';

export async function getUser() {
  return request('/user/user', {
    method: 'GET',
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
