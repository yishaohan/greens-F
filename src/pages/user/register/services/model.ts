import {Effect, Reducer} from 'umi';

import {userRegister} from './register';

export interface StateType {
  // status?: 'ok' | 'error';
  status?: 201 | 400 | 500 | 422;
  msg?: string;
  data?: object;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userRegister',

  state: {
    status: undefined,
  },

  effects: {
    * submit({payload}, {call, put}) {
      const response = yield call(userRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, {payload}) {
      console.log(state);
      return {
        ...state,
        status: payload.status,
        msg: payload.msg,
        data: payload.data,
      };
    },
  },
};

export default Model;
