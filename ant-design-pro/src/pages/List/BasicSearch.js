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

import {createFieldUi} from '../CommonTable/FieldUi'

import styles from './BasicSearch.less';
 
 
/* eslint react/no-multi-comp:0 */
@connect(({ search, loading }) => ({
  search,
  // loading: loading.models.search,
  loading: loading.effects['search/fetch'],
}))
@Form.create()
class BasicSearch extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };
  
  componentDidMount() {
    const { dispatch,  route: { search },location } = this.props;
    //  console.log(location);
     let searchId = location.query.id;
    /**
     * 列配置请求
     */
    dispatch({
      type: 'search/fetchColumns',
      payload:{
        id:searchId
      },//"页面Columns对应的ID"
    });  

    /**
     * 数据请求
     */
    dispatch({
      type: 'search/fetch',
      payload:{
        id:searchId
      },//"页面列表对应的ID"
    });
   
    /**
     * 搜索条件Header请求
     */
    dispatch({
      type: 'search/fetchHeader',
      payload:{
        id:searchId
      },//"页面Header对应的ID"
    });  


    /**
     * 权限请求
     */
    // dispatch({
    //   type: 'search/fetchAuth',
    //   payload:{
    //     pageType:search.id
    //   },
    // });  
  } 
 
  /**
   * 获取state中Header配置
   * 通用查询条件Header渲染
   */ 
  renderHeader() { 
    const {
      dispatch,
      form: { getFieldDecorator },
      search: { searchHeader } ,
      route: { search },
      location,
    } = this.props;
    let searchId = location.query.id;
    const headerKey = searchId;//search.id;

    var headerData = searchHeader[headerKey]; 
    if (!headerData) {
      return;
    }
    let rows = [];
    let cols = []; 
    for (let index = 0; index < headerData.length; index++) {
        const field = headerData[index]; 
        //todo:switch(item.type)...渲染不同的表单控件

        const ui = createFieldUi(field,headerKey,getFieldDecorator,dispatch);
       
        cols.push({...ui,key:index});

        if ((index + 1) % 3 == 0 || index == headerData.length -1) {
            //换行
            const r = (<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        {cols}
                    </Row>);
            rows.push({...r,key:index});
            cols = []; 
        } 
    }
    const searchRow = (<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button> 
        </span>
      </Col>
    </Row>);

    rows.push({...searchRow,key:headerData.length});
     
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {rows}
      </Form>
    ); 
  }

  /**
   * 获取state中的column配置
   * 通用查询条件column渲染
   */
  renderColumns(){
    const {
      search: { searchColumns },
      route: { search }, 
      location,
    } = this.props;
    let searchId = location.query.id;
    const headerKey = searchId;//search.id; 
    var columnsData = searchColumns[headerKey]; 
    if (!columnsData) {
      return [];
    }else{
      return columnsData;
    }
  }

  /**
   * 获取state中的列表数据
   * 通用查询条件列表数据渲染
   */
  renderListData(){
    const {
      search: { searchDataList },
      route: { search }, 
      location,
    } = this.props;
    let searchId = location.query.id;
    const headerKey = searchId;// search.id; 
    var listData = searchDataList[headerKey]; 
    if (!listData) {
      return {
        list: [],
        pagination: {},
      };
    }else{
      return listData;
    }
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, route: { search },location } = this.props;
    const { formValues,selectedRows } = this.state;


    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    
    // console.log(formValues);

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    let searchId = location.query.id;

    dispatch({
      type: 'search/fetch',
      payload: {
        ...params,
        id:searchId//search.id
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch ,route: { search },} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'search/fetch',
      payload:{
        id:searchId//search.id
      },//"页面列表对应的ID"
    });
  };
  /**
   * 表单条件查询
   */
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form, route: { search }, location} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      }); 
      
      let searchId = location.query.id;

      dispatch({
        type: 'search/fetch',
        payload:{
          ...values,
          id:searchId//search.id
        },//"页面列表对应的ID"
      });
    });
  };
 
  checkAuth = (authType)=> {
    const {
      search: { authList } 
    } = this.props;

    for (const key in authList) {
      if (authList.hasOwnProperty(key)) {
        const auth = authList[key];
        if(key == authType){
            return auth;
        }    
      }
    } 
    //判断是否有权限
    return false;
  };

  render() {
    const {  
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
      
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderHeader()}</div> 
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={this.renderListData()}
              columns={this.renderColumns()}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card> 
      </PageHeaderWrapper>
    );
  }
}

export default BasicSearch;
