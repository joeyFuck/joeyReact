 import {  queryConfigData } from '@/services/workflow';  

export default {
  namespace: 'workflow',

  state: { 
    renderKey:[], 
  },

  effects: {     
    *fetch({ payload }, { call, put }) {
    const response = yield call(queryConfigData, payload);  
    //key：组件标识名称，跟组件路径挂钩。 params：该组件所需的props 这两个参数固定 
    if (response.length == 0) {
        response.push({key:"ExceptionWF",params:{
              status : ""
          }});
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },  
  },

  reducers: { 
    save(state, action) {  
      return {
        ...state, 
        renderKey:action.payload,
      }; 
    }, 
  },
};

 