// import request from '@/utils/request';

import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
  // return request('/public/bcSchoolsCOVID19', {
  //   method: 'GET',
  // });
}
