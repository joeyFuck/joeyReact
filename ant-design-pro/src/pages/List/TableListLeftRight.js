import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Form,
} from 'antd';

import TableListDemo from './TableList';
 
 
/* eslint react/no-multi-comp:0 */
 
@Form.create()
class TableList extends PureComponent { 
  render() { 
    return ( 
      <div> 
      <Row>
        <Col span={12}>
            <TableListDemo/>
        </Col>
        <Col span={12}>
            <TableListDemo/>
        </Col>
      </Row> 
    </div> 
    );
  }
}

export default TableList;
