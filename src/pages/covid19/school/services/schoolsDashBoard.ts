import request from '@/utils/request';

// 根据指定条件获取BC省学校COVID19信息
export async function getBCSchoolsCOVID19(params: API.BCSchoolsCOVID19SearchParams) {
  return request('/public/bcSchoolsCOVID19', {
    method: 'GET',
    params,
  });
}
