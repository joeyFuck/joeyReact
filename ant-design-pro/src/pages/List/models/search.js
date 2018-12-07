import { queryAuth,queryDataList,queryHeader,queryFieldList ,queryDynamicSelect} from '@/services/apiAuth';

export default {
  namespace: 'search',

  state: { 
    authList:{},//该页面的全部组件权限k:string v:boolean 
    searchDataList:{},//查询列表Data集合 key:id(配置的页面标识),value:listData(配置的页面List)
    searchHeader:{},//查询条件header集合 key:id(配置的页面标识),value:headerData(配置的页面header)
    searchColumns:{},//查询列表Column集合 key:id(配置的页面标识),value:columnData(配置的页面column)
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
      const response = yield call(queryDataList, payload);
      const newResponse = {data:response,parmas:payload};
      yield put({
        type: 'save',
        payload: newResponse,
      });
    }, 
    *fetchHeader({ payload }, { call, put }) {
      const response = yield call(queryHeader, payload);
      const newResponse = {data:response,parmas:payload};
      yield put({
        type: 'saveSearchHeader',
        payload: newResponse, 
      });
    }, 
    *fetchColumns({ payload }, { call, put }) {
      const response = yield call(queryFieldList, payload);
      const newResponse = {data:response,parmas:payload};
      yield put({
        type: 'saveSearchColumns',
        payload: newResponse, 
      });
    }, 
    *fetchDynamicSelect({ payload }, { call, put }) {
      const response = yield call(queryDynamicSelect, payload);
      const newResponse = {data:response,parmas:payload};
      yield put({
        type: 'saveDynamicSelect',
        payload: newResponse,
      });
    },
  },

  reducers: { 
    save(state, action) {
      const newItemKey = action.payload.parmas.id; 
      const newSearchDataList = state.searchDataList;
      newSearchDataList[newItemKey] = action.payload.data;//构建新的dataList字典  
      return {
        ...state, 
        searchDataList:newSearchDataList,
      }; 
    },
    saveAuth(state, action){
      return {
        ...state,
        authList: action.payload,
      };
    },
    saveSearchHeader(state, action){  
      const newItemKey = action.payload.parmas.id; 
      const newSearchHeader = state.searchHeader;
      newSearchHeader[newItemKey] = action.payload.data;//构建新的header字典 
      return {
        ...state, 
        searchHeader:newSearchHeader,
      };
    }, 
    saveSearchColumns(state, action){  
      const newItemKey = action.payload.parmas.id; 
      const newSearchColumns = state.searchColumns;
      newSearchColumns[newItemKey] = action.payload.data;//构建新的column字典  
      return {
        ...state, 
        searchColumns:newSearchColumns,
      };
    },
    saveDynamicSelect(state, action){  
      const newItemKey = action.payload.parmas.id; 
      const newItemFieldKey = action.payload.parmas.field; 
      const newSearchHeader = state.searchHeader;
      
      const target = newSearchHeader[newItemKey].filter(item => item.Field === newItemFieldKey);
      if(target.length > 0){
         target[0]["DataSource"] = action.payload.data; //构建新的header字典 
      } 
      return {
        ...state, 
         searchHeader:newSearchHeader,
      };
    }, 
  },
};
