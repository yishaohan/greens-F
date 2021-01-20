// https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
import {extend} from 'umi-request';

const request = extend({
  prefix: 'https://127.0.0.1:50443/api/v1',
  timeout: 3000,
  credentials: 'include',  // 默认请求是否带上cookie
});

export default request;
