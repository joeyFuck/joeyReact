/*
 *
 * workflow reducer
 *
 */

import {
  LIST_DATA_REQUEST, 
  LIST_LOADING_CHANGE,
  } from './constants';
  
  // The initial state
  const initialState = { 
    isLoading:true,
    listData:[],
    pagination:{
      current:1,
      total:0,
    },
  };
  
  function listDataReducer(state = initialState, action) {
    switch (action.type) {
      case LIST_DATA_REQUEST: 
        return Object.assign({}, state, {
          isLoading: action.isLoading,
          listData:action.data.list,
          pagination:action.data.pagination,
        }); 
      case LIST_LOADING_CHANGE:
        return Object.assign({}, state, {
          isLoading: action.isLoading, 
        }); 
      default:
        return state;
    }
  }
  
  export default listDataReducer;
  