import request from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
  mobilePhone: string;
  smsCaptcha: string;
  autoLogin: boolean;
  type: string;
};

export async function doLogin(params: LoginParamsType) {
  if (params.type === 'account') {
    return request('/doLogin', {
      requestType: 'form',
      method: 'POST',
      data: params,
    });
  }
  return request('/doMobileLogin', {
    requestType: 'form',
    method: 'POST',
    data: params,
  });
}

export async function getSmsCaptcha(mobilePhone: string) {
  return request('/smsCaptcha', {
    method: 'POST',
    data: { mobilePhone, source: 'login' },
  });
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
