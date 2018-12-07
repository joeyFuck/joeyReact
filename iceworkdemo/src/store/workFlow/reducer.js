/*
 *
 * workflow reducer
 *
 */

import {
    WORK_FLOW_REQUEST, 
  } from './constants';
  
  // The initial state
  const initialState = {
    renderKey:[],  
  };
  
  function workflowReducer(state = initialState, action) {
    switch (action.type) {
      case WORK_FLOW_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
          renderKey:action.renderKey,
        }); 
      default:
        return state;
    }
  }
  
  export default workflowReducer;
  