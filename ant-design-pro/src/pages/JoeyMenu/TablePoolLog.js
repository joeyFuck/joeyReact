import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TablePoolLog.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

/* eslint react/no-multi-comp:0 */
@connect(({ adjustlog, loading }) => {
  // console.log(adjustlog);
  return ({
    adjustlog,
    loading: loading.models.adjustlog,
  })
})
@Form.create()
class TablePoolLog extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: '对象代码',
      dataIndex: 'O_CODE',
      width:'100px',
    },
    {
      title: '对象名称',
      dataIndex: 'O_NAME',
    },  
    {
      title: '对象类型',
      dataIndex: 'O_TYPE_NAME',  
      width:'100px',        
    },  
    {
      title: '操作类型',
      dataIndex: 'ACTION_TYPE',
      width:'100px',
    }, 
    
    {
      title: '调整原因',
      dataIndex: 'REASON',
      width:'100px',
    }, {
      title: '操作内容',
      dataIndex: 'ACTION_CONTENT',
    }, 
    {
      title: '操作时间',
      dataIndex: 'CREATED_DATE',
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      width:'100px',
    },
    {
      title: '操作人',
      dataIndex: 'USER_NO',
      width:'100px',
    }, 
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => ({})}>配置</a>
          <Divider type="vertical" /> 
        </Fragment>
      ),
    },
  ];
 

  constructor(props) {
    super(props);
    const  { 
      dispatch ,  
    } = this.props;
 
  }

  componentWillMount() {
    //请求不建议放这这里，一个是组件未加载完成，还有可能会被调用多次
    // this.props.dispatch({
    //   type: 'adjustlog/fetchOTypeList',
    // })
  } 

  componentDidMount() {
    const  { 
      dispatch ,  
    } = this.props;

    dispatch({
      type: 'adjustlog/fetch',
    });//执行查询 

    //请求最好放在这里，在页面渲染完后记载数据，更新状态。 
    dispatch({
      type: 'adjustlog/fetchOTypeList',
    });//执行下拉框初始化 O_Type
 
  } 

  /**
   * 处理Table change 即请求参数变化的情况
   * 包括分页请求，列表头排序  etc
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues ,selectedRows} = this.state;

    console.log(selectedRows);

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    let params = new FormData(); 
    params.append("currentPage",pagination.current);
    params.append("pageSize",pagination.pageSize); 
    if(formValues.ObjType){
      params.append("ObjType",formValues.ObjType);
    }
     

    // const params = {
    //   currentPage: pagination.current,
    //   pageSize: pagination.pageSize,
    //   ...formValues,
    //   // ...filters,
    // };

    // console.log(formValues);


    // if (sorter.field) {
    //   params.sorter = `${sorter.field}_${sorter.order}`;
    // }

    dispatch({
      type: 'adjustlog/fetch',
      payload: params,
    }); 
  };


  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /**
   * 处理条件查询
   */
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
     
    form.validateFields((err, fieldsValue) => { 
      if (err) return; 
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      }); 
     
      let params = new FormData();  
      if(values.ObjType){
        params.append("ObjType",values.ObjType);
      } 

      // let params = values;

      // console.log(params);

      //Todo values=>params
      dispatch({
        type: 'adjustlog/fetch',
        payload: params,
      });
    });
  };

  /**
   * 查询条件重置
   */
  handleFormReset = () => {
    const { form, dispatch } = this.props;

    form.resetFields();

    this.setState({
      formValues: {},
    }); 

    dispatch({
      type: 'adjustlog/fetch',
      payload: new FormData(),
    });
  };
   


  renderSimpleForm() { 
    const {
      form: { getFieldDecorator },
      adjustlog: { O_TYPE_List }, //adjustlog是上面connect传进来的state
    } = this.props;
      
    let optionsO_Type = O_TYPE_List.map(d => <Option key={d.value}>{d.text}</Option>);
 
    return ( 
      <Form onSubmit={this.handleSearch} layout="inline">
       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
            <FormItem label="对象类型">
              {getFieldDecorator('ObjType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {/* <Option value="0">债券</Option>
                  <Option value="1">机构</Option> */}
                  {optionsO_Type}
                </Select> 
              )}
            </FormItem>
          </Col> 
          <Col md={8} sm={24}>
            <FormItem label="对象名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>  
       </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}> 
        <Col md={8} sm={24}>
            <FormItem label="操作日期">
              {getFieldDecorator('startDate')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入起始操作日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="至">
              {getFieldDecorator('endDate')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入终止操作日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} >
                导出
              </Button> 
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  
  renderForm() { 
    return this.renderSimpleForm();
    // const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      adjustlog: { adjustlogdata },
      loading,
    } = this.props;
    // console.log(456);
    // console.log(this.props);
    
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    
    return (
      <PageHeaderWrapper title="证券池调整日志">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={()=>({})}>
                新建
              </Button> 
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={adjustlogdata}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card> 
      </PageHeaderWrapper>
    );
  }
}

export default TablePoolLog;

// export default  function() {
//   return (
//     <div className={styles.normal}>
//       <h1>Page TablePoolLog</h1>
//     </div>
//   );
// }
