 
import React, { PureComponent } from 'react'; 
import {Card,Row,Col,Icon,Button,Popconfirm,Modal} from 'antd';
import Link from 'umi/link';
      
   
class ExceptionWF extends PureComponent { 
    state = {  
        
    }; 
    componentDidUpdate(){
       
    }

    componentDidMount() {
         
    }  

    closeWin(){
        Modal.confirm({
            title: '关闭窗口',
            content: '确定要离开此页面吗？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>window.close(),
            // onOk: () => this.deleteItem(currentItem.id),
        }); 
    }

    render() {  
       return (
           <Card>
            <Row type="flex" justify="center" >
                <Col span={10} offset={2}>
                    <Icon type="key" />您目前所访问的地址存在问题,请从正规入口进入!
                </Col> 
            </Row>  
            <br/>
            <Row type="flex" justify="center" >
                <Col span={5} offset={2}>
                    {/* <Popconfirm title="是否要离开此页面？" onConfirm={this.closeWin}>
                        <Button  type="primary">
                            关闭
                        </Button>
                    </Popconfirm>  */}
                    <Button  type="primary" onClick={this.closeWin}>
                            关闭
                    </Button>
                </Col> 
            </Row>  
        </Card> 
       ) 
    }
}

export default ExceptionWF;
 