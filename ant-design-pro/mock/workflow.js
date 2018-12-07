import { parse } from 'url';

/**
 * 获取参数对应的工作流配置参数
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
function getConfigData(req, res, u){
    //根据不同的配置id返回不同数据
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
   
    const params = parse(url, true).query;
    let resultData = [] ;
    if (params.id == 123) {
        resultData = [
            {key:"WorkFlowHeadDemo",params:{  status : "this is args from config.id:123",  }},
            {key:"TableListDemo",params:{title:"列表Demo"}},
            {key:"ProfileDemo",params:{title:"详情Demo"}} 
        ]; 
    }else if (params.id == 456) {
        resultData = [
            {key:"WorkFlowHeadDemo",params:{
                    status : "this is args from config.id:456"
                }},
           
        ]; 
    }else if (params.id == 789) {
        resultData = [
            {key:"WorkFlowHeadDemo",params:{
                    status : "this is args from config.id:789"
                }},
            {key:"TableListDemo",params:{}}
        ]; 
    } 
    return res.json(resultData);
}
 
  export default {
    'GET /workflow/getConfigData': getConfigData, 
  };