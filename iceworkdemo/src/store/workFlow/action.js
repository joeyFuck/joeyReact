/*
 *
 * workflow actions
 *
 */

import {
    WORK_FLOW_REQUEST, 
  } from './constants';

  import { queryConfigData } from '../../api/workflow';
  
   
  
  const save = (payload) => {
    if (payload.length == 0) {
        payload.push({key:"WFException",params:{
              status : ""
        }});
    }
    return {
      type: WORK_FLOW_REQUEST,
      isLoading: false,
      renderKey:payload,
    };
  };
   
  
  export const configDataAction = (params) => {
    return async (dispatch) => { 
      try { 
        const response = await queryConfigData(params);
        
        dispatch(save(response.data));
      } catch (error) {
        // dispatch(userProfileFailure(error));
      }
    };
  };
  