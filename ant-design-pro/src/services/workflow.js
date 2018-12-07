import request from '@/utils/request';
import { stringify } from 'qs';
/**
 * 获取参数对应的工作流配置参数
 * @param {*} params 
 */
export async function queryConfigData(params) {
    return request(`/workflow/getConfigData?${stringify(params)}`);
}  