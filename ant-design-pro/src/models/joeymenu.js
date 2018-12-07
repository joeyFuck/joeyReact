import { queryRoute } from '@/services/apiRoute';

export default {
  namespace: 'joeymenu',

  state: { 
    routeList:[],  
  },

  effects: { 
    *fetchRoute({ payload }, { call, put }) {
      const response = yield call(queryRoute, payload);
      yield put({
        type: 'saveRoute',
        payload: response,
      });
    }, 
  },

  reducers: { 
    saveRoute(state, action){
      return {
        ...state,
        routeList: action.payload,
      };
    }, 
  },
};
