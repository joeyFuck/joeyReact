import { stringify } from 'qs';
import request from '@/utils/request';
import {
    Badge
  } from 'antd';

/**
 * 获取权限配置
 * @param {*} params 
 */
export async function queryAuth(params){   
    // params,需标识哪个页面
    let data = {
        "addBtn":true,
        "other":false,
    };//该页面的全部组件权限k:string v:boolean 

    return data; 
}
  
/**
 *  获取查询header配置
 * @param {*} params 
 */
export async function queryHeader(params){   
    let resultList = request('/CommonTable/getHeader'); //这里到时候请求的时候要带上参数
    resultList = resultList.then(function(value) { 
        if (value) {
            // success 
            if (params.id == "123456") {
                value.push({
                    "GroupCode": "22544A0657524DF4AB7DC8927543F586",
                    "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
                    "FieldName": "数字",
                    "FieldTable": "TSYS_USER",
                    "Field": "EM_ID2",
                    "ComplexFormula": null,
                    "Sort": "1",
                    "DefaultValue": null,
                    "FieldUI": "numberbox",
                    "ConstType": null,
                    "Width": "100",
                    "Align": "left",
                    "Format": null,
                    "FieldConfig": null,
                    "IsReadonly": "0",
                    "IsShow": "1",
                    "IsUpdate": "0",
                    "AppendCode": null,
                    "UpdateFormula": null,
                    "GroupType": null,
                    "FUrl": null,
                    "IsKey": "1",
                    "IsNull": "1", 
                    key: "0D5FFBB271EE46E9B0EE811927D873B5@22544A0657524DF4QB7DC8927543F598",
                    "EntityState": 3,
                    "OperationMode": "3"
                });

                value.push({
                    "GroupCode": "22544A0657524DF4AB7DC8927543F586",
                    "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
                    "FieldName": "日期",
                    "FieldTable": "TSYS_USER",
                    "Field": "EM_ID3",
                    "ComplexFormula": null,
                    "Sort": "1",
                    "DefaultValue": null,
                    "FieldUI": "datebox",
                    "ConstType": null,
                    "Width": "100",
                    "Align": "left",
                    "Format": null,
                    "FieldConfig": null,
                    "IsReadonly": "0",
                    "IsShow": "1",
                    "IsUpdate": "0",
                    "AppendCode": null,
                    "UpdateFormula": null,
                    "GroupType": null,
                    "FUrl": null,
                    "IsKey": "1",
                    "IsNull": "1", 
                    key: "0D5FFBB271EE46E9B0EE811927D873B5@2254410657524DF4QB7DC8927543F598",
                    "EntityState": 3,
                    "OperationMode": "3"
                });
            } 
            if (params.id == "456789") {
                value.push({
                    "GroupCode": "22544A0657524DF4AB7DC8927543F586",
                    "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
                    "FieldName": "新字段",
                    "FieldTable": "TSYS_USER",
                    "Field": "EM_ID",
                    "ComplexFormula": null,
                    "Sort": "1",
                    "DefaultValue": null,
                    "FieldUI": "textbox",
                    "ConstType": null,
                    "Width": "100",
                    "Align": "left",
                    "Format": null,
                    "FieldConfig": null,
                    "IsReadonly": "0",
                    "IsShow": "1",
                    "IsUpdate": "0",
                    "AppendCode": null,
                    "UpdateFormula": null,
                    "GroupType": null,
                    "FUrl": null,
                    "IsKey": "1",
                    "IsNull": "1", 
                    key: "0D5FFBB271EE46E9B0EE811927D873B5@22544A0657524DF4QB7DC8927543F598",
                    "EntityState": 3,
                    "OperationMode": "3"
                });
        
                value.push({
                    "GroupCode": "22544A0657524DF4AB7DC8927543F586",
                    "FieldCode": "2EDF9121E52A460E8D7A33F495A0AB92",
                    "FieldName": "资产名称",
                    "FieldTable": "PKG_TEST",
                    "Field": "A_NAME",
                    "ComplexFormula": null,
                    "Sort": "5",
                    "DefaultValue": null,
                    "FieldUI": "textbox",
                    "ConstType": null,
                    "Width": null,
                    "Align": "left",
                    "Format": null,
                    "FieldConfig": null,
                    "IsReadonly": "0",
                    "IsShow": "1",
                    "IsUpdate": "0",
                    "AppendCode": null,
                    "UpdateFormula": null,
                    "GroupType": null,
                    "FUrl": null,
                    "IsKey": "0",
                    "IsNull": "1",
                    key: "2EDF9121E52A460E8D7A33F495A0AB92@22544A0657524DF4AB7DC8927543F586",
                    "EntityState": 3,
                    "OperationMode": "3"
                });
            }
            // console.log("2222");
            for (let index = 0; index < value.length; index++) {
          
                const element = value[index];
                if (element.FieldUI == "objTypeSelect") { 
                    let resDataSource = request('/CommonTable/getObjTypeSelect');
                    resDataSource = resDataSource.then(function(valDataSource) {
                        if (valDataSource) {
                             element["DataSource"] = valDataSource; 
                            //  console.log("3333");
                             return value;
                        }
                    }); 
                    return resDataSource;
                }
            }  
        } 
    }, function(error) {
        // failure
    });
    // console.log("1111");
    return resultList;  
}

/**
 * 获取查询列表Column配置
 * @param {*} params 
 */
export async function queryFieldList(params) {
    let resultList = request('/CommonTable/getListFields'); //这里到时候请求的时候要带上参数
    resultList = resultList.then(function(value) { 
        if (value) {
            // success 
            let resColumns = [];
            const statusMap = ['default', 'processing', 'success', 'error'];
            const status = ['关闭', '运行中', '已上线', '异常'];
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                //个性化配置 到时候去掉
                if (element.Field == "status") {
                    resColumns.push({
                        title:element.FieldName,dataIndex:element.Field,key:element.Key,
                        render(val) {
                          return <Badge status={statusMap[val]} text={status[val]} />;
                        },
                      });
                }else{
                    resColumns.push({title:element.FieldName,dataIndex:element.Field,key:element.Key});
                }
            }
            
            return resColumns;
        } 
    }, function(error) {
        // failure
    });
    return  resultList;
}

/**
 * 获取查询列表数据
 * @param {*} params 
 */
export async function queryDataList(params) {
    return request(`/CommonTable/getListData?${stringify(params)}`);
} 
/**
 * 动态获取下拉框
 * @param {*} params 
 */
export async function queryDynamicSelect(params) {
    return request(`/CommonTable/getDynamicSelect?${stringify(params)}`);
} 
 

 












