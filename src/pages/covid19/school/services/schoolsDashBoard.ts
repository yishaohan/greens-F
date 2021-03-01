import request from '@/utils/request';

// 根据指定条件获取BC省学校COVID19信息
export async function getBCSchoolsCOVID19(params: API.BCSchoolsCOVID19SearchParams) {
  return request('/public/bcSchoolsCOVID19', {
    method: 'GET',
    params,
  });
}

// 根据起始时间获取BC省教育局COVID9统计信息
export async function getBCDistrictsCOVID19Summary(params: API.BCDistrictSummarySearchParams) {
  return request('/public/bcDistrictsCOVID19Summary', {
    method: 'GET',
    params,
  });
}

// 根据起始时间获取BC省学校COVID9统计信息
export async function getBCSchoolsCOVID19Summary(params: API.BCSchoolsSummarySearchParams) {
  return request('/public/bcSchoolsCOVID19Summary', {
    method: 'GET',
    params,
  });
}

// 根据起始时间获取BC省卫生局COVID9统计信息
export async function getBCHealthsCOVID19Summary(params: API.BCHealthsSummarySearchParams) {
  return request('/public/bcHealthsCOVID19Summary', {
    method: 'GET',
    params,
  });
}
