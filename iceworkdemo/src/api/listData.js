import axios from 'axios'; 
 
/**
 * 获取数据列表
 * @param {*} params 
 */
export async function queryListData(params) {   
    const response = await axios({
        url: 'http://localhost:5005/home/QueryAdjustLog',
        method: 'POST', 
        params:params,
    }); 
  return response; 
}


export default { 
    queryListData,
};
