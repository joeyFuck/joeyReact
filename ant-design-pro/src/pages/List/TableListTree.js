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
  Tree ,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableListTree.less';
import TableListDemo from './TableList';
const TreeNode = Tree.TreeNode;
 
 
/* eslint react/no-multi-comp:0 */
 
@Form.create()
class TableList extends PureComponent { 
  render() { 
    return ( 
      <div> 
      <Row>
        <Col span={24}>
            <TableListDemo/>
        </Col> 
      </Row> 
      <Row>
        <Col span={24}>
            <TableListDemo/>
        </Col> 
      </Row> 
    </div> 
    );
  }
}

export default TableList; 