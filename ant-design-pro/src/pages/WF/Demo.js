import React, { PureComponent } from 'react';
import { connect } from 'dva'; 
import {Button,Table, Divider, Tag} from 'antd';
import Link from 'umi/link';
      
  
@connect(({ loading }) => ({
  
}))  
class Demo extends PureComponent { 
    state = {  
        
    }; 
    componentDidUpdate(){
       
    }

    componentDidMount() {
         
    }  

    render() {   

        const columns = [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) =><Link to={`/baseworkflow/workflow-test?id=${record.id}`} target="_blank">进入wf页面:{text}</Link>,
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                    {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                    </span>
                ),
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <a href="javascript:;">Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                    </span>
                ),
        }];

        const data = [{
            key: '1',
            name: '14万科MTN001201810098',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            id:123,
          }, {
            key: '2',
            name: '15石油',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            id:456,
          }, {
            key: '3',
            name: '华东医药',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            id:789,
          }]; 
 
       return (
        <div style={{margin:10}}>
            {/* <Link to={`/baseworkflow/workflow-test?id=${item.id}`} target="_blank">进入wf页面</Link> */}
            {/* {linkArr} */}
            <Table columns={columns} dataSource={data} />
            <a type="primary" >按钮进入wf页面</a>
        </div>
       ) 
    }
}

export default Demo;
 