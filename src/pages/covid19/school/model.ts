import { Effect, Reducer } from 'umi';

import { AnalysisData } from './data.d';
import { fakeChartData } from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
}

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  bcSchoolsCOVID19DataType: {},
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
};

const Model: ModelType = {
  namespace: 'dashboardAnalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      console.log('==========================');
      console.log(state);
      console.log(payload);
      return {
        ...state,
        // ...payload,
        bcSchoolsCOVID19DataType: payload.bcSchoolsCOVID19DataType,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
