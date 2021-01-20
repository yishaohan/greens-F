import request from '@/utils/request'
import {UserRegisterParams} from '../index';

// 请求验证码
export async function getSmsCaptcha(mobilePhone: string) {
  return request('/smsCaptcha', {
    method: 'POST',
    data: {mobilePhone, source: 'register'},
  });
}

// 注册用户
export async function userRegister(params: UserRegisterParams) {
  return request('/register', {
    method: 'POST',
    data: params,
  });
}
