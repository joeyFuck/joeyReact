import axios from 'axios'; 
 
/**
 * 获取参数对应的工作流配置参数
 * @param {*} params 
 */
export async function queryConfigData(params) { 
//   const response = await axios('/api/getConfigData');
     
    // const responseTest = await axios({
    //     url: 'http://localhost:5005/home/QueryAdjustLog',
    //     method: 'POST', 
    //     params:{
    //         ObjTypeName:"债券"
    //     },
    // });

  const response = await axios({
        url: '/api/getConfigData',
        method: 'get',
        params:params,
  });
  //mock数据的模拟过滤，到时候过滤是在后台进行的。
  if (params.id == "id=100306660940") {
      response.data.push({key:"FirstPage",params:{title:"列表Demo"}}); 
      response.data.push({key:"SecondPage",params:{title:"详情Demo"}});
  }else if (params.id == "id=100306660941") {
      response.data.push({key:"FirstPage",params:{title:"列表Demo"}});  
  }else{
    response.data = [];
  }
  return response; 
}


export default { 
    queryConfigData,
};
