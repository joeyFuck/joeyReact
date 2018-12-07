import React, { Component } from 'react';
import { Input, Table, Pagination,Loading } from '@icedesign/base';

import listDataReducer from '../../../store/listData/reducer'; 
import { listDataAction } from '../../../store/listData/action';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../../utils/injectReducer';
 
class TableFilter extends Component {
  static displayName = 'TableFilter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  componentDidMount() {   
    /**
     *  通过页面参数获取页面对应配置
     */ 
    let params = {
         
    }; 
      
    this.props.listDataAction(params);
  } 



  handlePaginationChange = (current) => {
    let params = {
      currentPage:current,
    }; 
    // this.props.loadingAction(true);
    this.props.listDataAction(params);

    // this.setState({
    //   current,
    // });
  };

  onChange = (value) => {
    console.log({ value });
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>详情</a>
        <span style={styles.separator} />
        <a style={styles.link}>申请权限</a>
      </div>
    );
  };

  render() {
    const {
      listData :{listData,pagination,isLoading},
    }  = this.props;
    
    const dataSource = listData;//getData(); 

    return (
      <div style={styles.container}>
        <div style={styles.tableHead}>
          <div style={styles.label}>页面名称:</div>
          <Input
            placeholder="请输入页面名称"
            hasClear
            onChange={this.onChange}
            size="large"
            style={{ width: '220px' }}
          />
        </div>
        <Loading shape="fusion-reactor" style={{textAlign: 'center'}} color="#fff" visible={isLoading}>
          <Table dataSource={dataSource} hasBorder={false}>
            <Table.Column title="对象代码" dataIndex="O_CODE" width={100} />
            <Table.Column title="对象名称" dataIndex="O_NAME" />
            <Table.Column title="对象类型" dataIndex="O_TYPE_NAME" width={100} />
            <Table.Column title="操作类型" dataIndex="ACTION_TYPE" width={100} />
            <Table.Column title="调整原因" dataIndex="REASON" width={100} />
            <Table.Column title="操作内容" dataIndex="ACTION_CONTENT" />
            <Table.Column title="操作时间" dataIndex="CREATED_DATE" width={100}/>
            <Table.Column title="操作人" dataIndex="USER_NO" width={100}/>

            {/*<Table.Column title="操作" cell={this.renderOper} width={200} /> */}
          </Table>
          <Pagination
            style={styles.pagination}
            current={pagination.current}
            total={pagination.total}
            onChange={this.handlePaginationChange}
          /> 
        </Loading>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '10px 0',
  },
  tableHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};


const mapDispatchToProps = {
  listDataAction, 
};

/**
 * 处理reducer下的state=>props
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  return { listData: state.listData };
};

/**
 * 注入action跟reducer下的state
 */
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

/**
 * 注入reducer
 * 可多个
 */
const withListDataReducer = injectReducer({
  key: 'listData',
  reducer: listDataReducer,
});
 

export default compose(
  withListDataReducer, 
  withConnect
)(TableFilter);