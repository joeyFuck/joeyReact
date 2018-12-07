import { parse } from 'url';

// 这里模仿后台返回的菜单数据 
/**
 * 获取查询header Input
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
  function getHeader(req, res, u) {
    const result = [
        {
            "GroupCode": "22544A0657524DF4AB7DC8927543F586",
            "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
            "FieldName": "规则名称",
            "FieldTable": "TSYS_USER",
            "Field": "name",
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
            key: "0D5FFBB271EE46E9B0EE811927D873B5@22544A0657524DF4AB7DC8927543F586",
            "EntityState": 3,
            "OperationMode": "3"
        },
        {
            "GroupCode": "22544A0657524DF4AB7DC8927543F586",
            "FieldCode": "F712E8FAA74A42B1B79AC423826299F0",
            "FieldName": "复选框",
            "FieldTable": "PKG_TEST",
            "Field": "O_CODE",
            "ComplexFormula": null,
            "Sort": "2",
            "DefaultValue": null,
            "FieldUI": "checkbox",
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
            key: "F712E8FAA74A42B1B79AC423826299F0@22544A0657524DF4AB7DC8927543F586",
            "EntityState": 3,
            "OperationMode": "3"
        },
        {
            "GroupCode": "22544A0657524DF4AB7DC8927543F586",
            "FieldCode": "272E924FD31A4BE29EDE7E2C4F11337C",
            "FieldName": "对象名称",
            "FieldTable": "PKG_TEST",
            "Field": "O_CODE_1",
            "ComplexFormula": null,
            "Sort": "3",
            "DefaultValue": null,
            "FieldUI": "assetSelect",
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
            "FUrl": "/ProjIndiv/CJZQ/SkipPage.html?O_TYPE={O_TYPE}",
            "IsKey": "0",
            "IsNull": "1",
            key: "272E924FD31A4BE29EDE7E2C4F11337C@22544A0657524DF4AB7DC8927543F586",
            "EntityState": 3,
            "OperationMode": "3"
        },
        {
            "GroupCode": "22544A0657524DF4AB7DC8927543F586",
            "FieldCode": "60EA0CF7EDD04552B4E9CC0F99CFF7EF",
            "FieldName": "对象类型",
            "FieldTable": "PKG_TEST",
            "Field": "O_TYPE",
            "ComplexFormula": null,
            "Sort": "4",
            "DefaultValue": null,
            "FieldUI": "objTypeSelect",
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
            key: "60EA0CF7EDD04552B4E9CC0F99CFF7EF@22544A0657524DF4AB7DC8927543F586",
            "EntityState": 3,
            "OperationMode": "3"
        },
    ] ;
  
    return res.json(result);
  }

/**
 * 获取对象类型下拉框DataSource
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
function getObjTypeSelect(req, res, u) {  
    const result = [{"R_ID":0,"CODE":"0","NAME":"债券","FLAG":"1","TNAME":"TBND","Key":"0","EntityState":3,"OperationMode":"3"},{"R_ID":1,"CODE":"1","NAME":"机构","FLAG":"1","TNAME":"TCORP","Key":"1","EntityState":3,"OperationMode":"3"},{"R_ID":26,"CODE":"26","NAME":"债权投资计划","FLAG":"1","TNAME":"TIPLAN","Key":"26","EntityState":3,"OperationMode":"3"},{"R_ID":27,"CODE":"27","NAME":"理财产品","FLAG":"1","TNAME":"TFINA","Key":"27","EntityState":3,"OperationMode":"3"},{"R_ID":28,"CODE":"28","NAME":"信托","FLAG":"1","TNAME":"TTRUST","Key":"28","EntityState":3,"OperationMode":"3"},{"R_ID":29,"CODE":"29","NAME":"资产支持证券","FLAG":"1","TNAME":"TABS","Key":"29","EntityState":3,"OperationMode":"3"},{"R_ID":30,"CODE":"30","NAME":"ABS","FLAG":"1","TNAME":"MD_TABS_DEAL","Key":"30","EntityState":3,"OperationMode":"3"},{"R_ID":90,"CODE":"90","NAME":"个人客户","FLAG":"1","TNAME":"TPS_BASIC","Key":"90","EntityState":3,"OperationMode":"3"},{"R_ID":91,"CODE":"91","NAME":"股权投资计划","FLAG":"1","TNAME":"TEQUITY_PLAN","Key":"91","EntityState":3,"OperationMode":"3"},{"R_ID":92,"CODE":"92","NAME":"不动产投资计划","FLAG":"1","TNAME":"TESTATE_PLAN","Key":"92","EntityState":3,"OperationMode":"3"},{"R_ID":93,"CODE":"93","NAME":"股权基金","FLAG":"1","TNAME":"TEQUITY_FUND","Key":"93","EntityState":3,"OperationMode":"3"},{"R_ID":94,"CODE":"94","NAME":"不动产金融产品","FLAG":"1","TNAME":"TESTATE_PRODUCT","Key":"94","EntityState":3,"OperationMode":"3"},{"R_ID":95,"CODE":"95","NAME":"协议存款","FLAG":"1","TNAME":"TDEPOSIT_AGREEMENT","Key":"95","EntityState":3,"OperationMode":"3"},{"R_ID":96,"CODE":"96","NAME":"其他资产","FLAG":"1","TNAME":"TOTHER_PRODUCT","Key":"96","EntityState":3,"OperationMode":"3"},{"R_ID":97,"CODE":"97","NAME":"行政区域","FLAG":"0","TNAME":"TREGION","Key":"97","EntityState":3,"OperationMode":"3"}];
    return res.json(result);
}
/**
 * 获取Column配置
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
function getListFields(req,res,u){
    const result = [
        {
            "GroupCode": "ED2A926DFE124CB3A91836B469FF2101",
            "FieldCode": "F0DAD2C71146405398C1B02A9A14DD60",
            "FieldName": "规则名称",
            "FieldTable": "TSYS_USER",
            "Field": "name",
            "ComplexFormula": null,
            "Sort": "1",
            "DefaultValue": null,
            "FieldUI": "textbox",
            "ConstType": null,
            "Width": "200",
            "Align": null,
            "Format": null,
            "FieldConfig": null,
            "IsReadonly": null,
            "IsShow": "1",
            "IsUpdate": null,
            "AppendCode": null,
            "UpdateFormula": null,
            "GroupType": null,
            "FUrl": null,
            "IsKey": "0",
            "IsNull": "1",
            "Key": "F0DAD2C71146405398C1B02A9A14DD60@ED2A926DFE124CB3A91836B469FF2101",
            "EntityState": 3,
            "OperationMode": "3"
        },
        {
            "GroupCode": "ED2A926DFE124CB3A91836B469FF2101",
            "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
            "FieldName": "描述",
            "FieldTable": "TSYS_USER",
            "Field": "desc",
            "ComplexFormula": null,
            "Sort": "2",
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
            "Key": "0D5FFBB271EE46E9B0EE811927D873B5@ED2A926DFE124CB3A91836B469FF2101",
            "EntityState": 3,
            "OperationMode": "3"
        },
        {
            "GroupCode": "ED2A926DFE124CB3A91836B469FF2101",
            "FieldCode": "0D5FFBB271EE46E9B0EE811927D873B5",
            "FieldName": "状态",
            "FieldTable": "TSYS_USER",
            "Field": "status",
            "ComplexFormula": null,
            "Sort": "2",
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
            "Key": "0D5FFBB271EE46E9B0EE811927D873B5@ED2A746DFE124CB3A91836B469FF2101",
            "EntityState": 3,
            "OperationMode": "3"
        }
    ];
    return res.json(result);
}
 
/**
 * 获取dataList
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
function getListData(req, res, u) {
    // mock tableListDataSource
    let tableListDataSource = [];
    for (let i = 0; i < 46; i += 1) {
      tableListDataSource.push({
          key: i,
          // disabled: i % 6 === 0,
          href: 'https://ant.design',
          avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name: `TradeCode ${i}`,
          title: `一个任务名称 ${i}`,
          owner: '曲丽丽',
          desc: '这是一段描述',
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 4,
          updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
          createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
          progress: Math.ceil(Math.random() * 100),
      });
    }

    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
   
    const params = parse(url, true).query;
   
    let dataSource = tableListDataSource;
  
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach(s => {
        filterDataSource = filterDataSource.concat(
          dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
        );
      });
      dataSource = filterDataSource;
    }
  
    if (params.name) {
      dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };
  
    return res.json(result);
}


/**
 * 动态获取下拉框
 * @param {*} req 
 * @param {*} res 
 * @param {*} u 
 */
function getDynamicSelect(req, res, u){
    //根据不同的配置id返回不同数据
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
   
    const params = parse(url, true).query;
    
    const resultData = [{text:"测试一",value:"test1"},{text:"测试二",value:"test2"},{text:"测试三",value:"test3"},{text:"测试四",value:"test4"},{text:"测试五",value:"test5"}];
    const result = resultData.filter(item => item.text.toLowerCase().indexOf(params.filter.toLowerCase()) >= 0);
    return res.json(result);
}
 
  export default {
    'GET /CommonTable/getHeader': getHeader,
    'GET /CommonTable/getObjTypeSelect': getObjTypeSelect,
    'GET /CommonTable/getListFields': getListFields,
    'GET /CommonTable/getListData': getListData,

    'GET /CommonTable/getDynamicSelect': getDynamicSelect, 
  };
  