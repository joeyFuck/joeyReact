/*
 *
 *  actions
 *
 */

import {
    LIST_DATA_REQUEST, 
    LIST_LOADING_CHANGE,
  } from './constants';

  import { queryListData } from '../../api/listData';
  
   
  
  const save = (payload) => { 
    return {
      type: LIST_DATA_REQUEST,
      isLoading: false,
      data:payload,
    };
  };

  /**
   * 修改loading状态
   * 一般用于发起请求时候=>isLoading:true
   * @param {*} isLoading 
   */
  const loadingAction = (isLoading) => {   
    return {
      type: LIST_LOADING_CHANGE,
      isLoading: isLoading,
    };
  };
  
   
  
  export const listDataAction = (params) => {  
     
    return async (dispatch) => { 
      try { 
        dispatch(loadingAction(true)); 
        
        const response = await queryListData(params); 
        dispatch(save(response.data)); 
      } catch (error) {
        // dispatch(userProfileFailure(error));
      }
    };
  };
  