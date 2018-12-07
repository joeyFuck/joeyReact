import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { queryAuth } from '@/services/apiAuth';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    authList:{},//该页面的全部组件权限k:string v:boolean 
  },

  effects: { 
    *fetchAuth({ payload }, { call, put }) {
      const response = yield call(queryAuth, payload);
      yield put({
        type: 'saveAuth',
        payload: response,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveAuth(state, action){
      return {
        ...state,
        authList: action.payload,
      };
    }
  },
};
