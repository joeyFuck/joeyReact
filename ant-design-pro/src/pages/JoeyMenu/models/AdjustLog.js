import { queryAdjustlog,getOTypeList } from '@/services/api';

export default {
  namespace: 'adjustlog',

  state: {
    adjustlogdata: {
      list: [],
      pagination: {},
    },
    O_TYPE_List:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAdjustlog, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }, 
    *fetchOTypeList({ payload }, { call, put }) {
        const response = yield call(getOTypeList, payload);
        yield put({
          type: 'initOTypeList',
          payload: response,
        });
      },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        adjustlogdata: action.payload,
      };
    },
    initOTypeList(state, action) {
        return {
          ...state,
          O_TYPE_List: action.payload,
        };
      },
  },
};
