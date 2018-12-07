import { stringify } from 'qs';
import request from '@/utils/request';
  
export async function queryRoute(params){   
    return request('/DynamicMenu/getDynamicMenu'); 
}