import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Checkbox,
} from 'antd'; 
  
const FormItem = Form.Item;
const Option = Select.Option;

export function createFieldUi(field,headerKey,getFieldDecorator,dispatch){
    let id = field.Field;
    let ui = (<div></div>);
     

    //循环创建
    switch (field.FieldUI) {
      case "checkbox":
          ui = createCheckbox(id, field,getFieldDecorator);
          break;
      case "textbox":
          ui = createTextbox(id,field,getFieldDecorator);
          break;
      case "numberbox":
          ui = createNumberbox(id, field,getFieldDecorator);
          break;
      case "datebox":
          ui =  createDatebox(id, field,getFieldDecorator);
          break;
      case "combobox":
          ui = createCombobox(id, field,getFieldDecorator);
          break;
      case "constSelect":
          ui = createConstSelect(id, field,getFieldDecorator);
          break;
      case "corpSelect":
          ui = createCorpSelect(id, field,getFieldDecorator);
          break;
      case "assetSelect": 
            /**
             * 处理动态下拉框查询
             * @param {*} value 
             */
            function handleSearch(value){
                dispatch({
                    type: 'search/fetchDynamicSelect',
                    payload:{
                        id:headerKey,
                        field:id,
                        filter:value,
                    },
                });  
            };
          ui =  createAssetSelect(id, field, getFieldDecorator,handleSearch);
          break;
      case "bondSelect":
          ui = createAssetSelect(id, field, getFieldDecorator);
          break;
      case "deptSelect":
          ui =  createDeptSelect(id, field,getFieldDecorator);
          break;
      case "industrySelect":
          ui = createIndustrySelect(id, field,getFieldDecorator);
          break;
      case "logicPoolSelect":
          ui = createLogicPoolSelect(id, field,getFieldDecorator);
          break;
      case "objTypeSelect":
          ui = createObjTypeSelect(id, field,getFieldDecorator);
          break;
      case "objTypeSelectMulti":
          ui = createObjTypeSelectMulti(id, field,getFieldDecorator);
          break;
      case "quarterSelect":
          ui = createQuarterSelect(id, field,getFieldDecorator);
          break;
      case "bizTypeSelect":
          ui = createBizTypeSelect(id, field,getFieldDecorator);
          break;
      case "rlatObjGrid":
          ui = createRlatObjGrid(id, field,getFieldDecorator);
          break;
      case "marketSelect":
          ui = createMarketSelect(id, field,getFieldDecorator);
          break;
      default:
          break;
  } 

  return ui;
}



 
//文本
function createTextbox(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
        <FormItem label={field.FieldName}>
          {getFieldDecorator(id)(<Input placeholder="请输入" />)}
        </FormItem>
      </Col>
    );
} 

//对象类型选择 （动态单次获取DatSource）
function createObjTypeSelect(id, field,getFieldDecorator) {  
    let dataSource = [];
    if(field["DataSource"]){
        dataSource = field["DataSource"];
    } 

    return (
      <Col md={8} sm={24}>
            <FormItem label={field.FieldName}>
              {getFieldDecorator(id)(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear={true}> 
                   {  
                        dataSource.map(item => ( 
                            <Option  value={item.CODE}  key={item.CODE}>{item.NAME}</Option> 
                            )) 
                    }
                </Select>
              )}
            </FormItem>
      </Col>
    );
}   

//资产选择 （动态filter获取DatSource）
function createAssetSelect(id, field,getFieldDecorator,handleSearch) { 
    let dataSource = [];
    if(field["DataSource"]){
        dataSource = field["DataSource"];
    }  
   
    const options = dataSource.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Col md={8} sm={24}>
      <FormItem label={field.FieldName}>
              {getFieldDecorator(id)(
                 <Select
                 showSearch 
                 allowClear={true}
                 placeholder="请选择"
                 style={{ width: '100%' }}
                 defaultActiveFirstOption={false}
                 showArrow={true}
                 filterOption={false}
                 onSearch={handleSearch}
                 onChange={()=>{}}
                 notFoundContent={null}
               >
                 {options}
               </Select>
              )}
            </FormItem> 
      </Col>
    );
}  

//复选框  
function createCheckbox(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
       <FormItem label={field.FieldName}>
          {getFieldDecorator(id)(<Checkbox style={{ width: '100%' }} onChange={()=>{}}>Checkbox</Checkbox>)}
        </FormItem> 
      </Col>
    );
}
 
//数字 
function createNumberbox(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
        <FormItem label={field.FieldName}>
          {getFieldDecorator(id)(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>  
      </Col>
    );
} 

//日期  有点问题 已提官方issue
function createDatebox(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         <FormItem label={field.FieldName}>
         {/* <DatePicker id={id} style={{ width: '100%' }} placeholder="请输入日期" /> */}
          {getFieldDecorator(id)(<DatePicker id={id} style={{ width: '100%' }} placeholder="请输入日期" />)}
        </FormItem>   
      </Col>
    );
} 


  
//选择框 Todo
function createCombobox(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
} 
 
//枚举 Todo
function createConstSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}  
//主体选择 Todo
function createCorpSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}   
   
//部门选择 Todo
function createDeptSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}  
//行业选择 Todo
function createIndustrySelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}   
//逻辑池选择 Todo
function createLogicPoolSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}  
 
//对象类型选择(多选) Todo
function createObjTypeSelectMulti(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}    

//季报选择 Todo
function createQuarterSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}  
//业务类型选择 Todo
function createBizTypeSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}   
//主体和个人选择 Todo
function createRlatObjGrid(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}  
//市场选择 Todo
function createMarketSelect(id, field,getFieldDecorator) { 
    return (
      <Col md={8} sm={24}>
         
      </Col>
    );
}   

