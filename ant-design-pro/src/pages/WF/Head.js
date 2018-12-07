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
 

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

const steps = [{
  title: '评级',
  content: 'First-content',
}, {
  title: '确认转交',
  content: 'Second-content',
}, {
  title: '评级结果',
  content: 'Last-content',
}];

class Head extends PureComponent {
 

  constructor(props) {
    super(props);
    const { params } = props;  
    this.state = {
        status:params.status,
        current: 0,
    };
  }
 
  componentDidMount() {
      const {status}  = this.state;
      console.log("head componentDidMount status:"+status);
  } 

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
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
    const { params } = this.props;  
    const { current } = this.state;

    return ( 
      <Card>   
            <Row  type="flex" justify="center" >
              <Col span={12}  > 
              <Icon type="key" /><span style={{fontSize:20}}>关于项目<span style={{color:'red'}}>  {params.status}</span> 当前所处环节<span style={{color:'red'}}>评级</span>,您需要做的</span>
              </Col> 
            </Row> 
             
            <Row  type="flex" justify="center"  >
              <Col span={6}> 
                  <div className="steps-action">
                  <ButtonGroup style={{margin:10}}>
                    <Button  type="primary" onClick={this.closeWin}>
                      关闭
                    </Button>
                    
                    {
                      current < steps.length - 1
                      && <Button type="primary" onClick={() => this.next()}>下一步<Icon type="right" /></Button>
                    }
                    {
                      current === steps.length - 1
                      && <Button type="primary" onClick={() => message.success('流程完结!')}>结束</Button>
                    }
                    {
                      current > 0
                      && (
                      <Button type="primary"  onClick={() => this.prev()}>
                        上一步<Icon type="left" />
                      </Button>
                      )
                    } 
                  </ButtonGroup> 
                   </div> 
              </Col> 
            </Row>  

            <Row>
              <Col span={20} offset={2}>
                <Steps current={current}>
                  {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps> 
              </Col> 
            </Row>  
          </Card>
    );
  }
}

export default Head;
