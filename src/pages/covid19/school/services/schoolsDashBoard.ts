import request from '@/utils/request';

// 根据指定条件获取BC省学校COVID19信息
export async function getBCSchoolsCOVID19(params: API.BCSchoolsCOVID19SearchParams) {
  return request('/public/bcSchoolsCOVID19', {
    method: 'GET',
    params,
  });
}

// 根据起始时间获取BC省教育局COVID9统计信息
export async function getBCSchoolsDistrictsCOVID19Summary(
  params: API.BCSchoolsDistrictSummarySearchParams,
) {
  return request('/public/bcSchoolsDistrictsCOVID19Summary', {
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
export async function getBCSchoolsHealthsCOVID19Summary(
  params: API.BCSchoolsHealthsSummarySearchParams,
) {
  return request('/public/bcSchoolsHealthsCOVID19Summary', {
    method: 'GET',
    params,
  });
}

// 获取所有BC省学校COVID9统计信息
export async function getBCSchoolsCOVID19TotalSummary() {
  return request('/public/bcSchoolsCOVID19TotalSummary', {
    method: 'GET',
  });
}
