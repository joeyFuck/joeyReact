import { stringify } from 'qs';
import request from '@/utils/request';


 
export async function getOTypeList(params){   
  // params = JSON.stringify(params); 
  let resultList = request('http://localhost:5005/home/GetLogType', {
    method: 'GET', 
    body:params, 
  });
   
  // let data = [];

  resultList.then(function(value) { 
    if (value) {
       // success
      for (let i = 0; i < value.length; i += 1){  
        value[i] = {...value[i],value:value[i].CODE,text:value[i].NAME} 
      }
    } 
  }, function(error) {
    // failure
  });

  return resultList; //注意这里是返回promise对象，而非具体是数据本身，因为当前方法是异步执行，直接返回对象会先返回一个promise处理前的对象。
  // return data; 
}

 /**
  * 证券池调整日志查询接口
  * @param {*} params 
  */
export async function queryAdjustlog(params){  
  if (!params) {
    params = new FormData();
  } 
  let resultList = request('http://localhost:5005/home/QueryAdjustLog', {
    method: 'POST', 
    body:params, 
  });
  // console.log("joey");
  // console.log(resultList);

  resultList.then(function(value) {
    // success
    if (value.list) {
      for (let i = 0; i < value.list.length; i += 1){
         value.list[i] = {...value.list[i],key:value.list[i].Key}
      }
    } 
  }, function(error) {
    // failure
  });
 
  return resultList;
  // return request(`/api/adjustlog?${stringify(params)}`);
}


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
