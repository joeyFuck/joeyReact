import React, { Component } from 'react';
import SimpleFooter from './components/SimpleFooter';
import workflowReducer from '../../store/workFlow/reducer'; 
import { configDataAction } from '../../store/workFlow/action';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';

import {EnableComponent} from './EnableComponent/ZTPJ';//这个有必要的话也可以换成import函数动态导入，这样就能动态导入对应的流程类别组件

//export default 
class Demo extends Component {
  static displayName = 'Demo';

  constructor(props) {
    super(props);
    this.state = {
      demo:[],
      hasRender:false,
    };  
  }

  componentDidUpdate(){
    //获取配置的组件，暂时放在生命周期componentDidUpdate.
    this.renderDemo();
  }


  componentDidMount() {   
    const { location } = this.props; 

    let searchId = "";
    if (location.search != "") {
        searchId = location.search.replace("?","");
    }

    /**
     *  通过页面参数获取页面对应配置
     */ 
    let params = {
        id:searchId 
    }; 
    this.props.configDataAction(params);
  } 

    /**
     * 动态import配置的组件
     * 用async+await实现同步异步操作
     * 暂时if (renderKey.length == 0 || hasRender) 这么判断着，防止无限请求，重新渲染
     */
    renderDemo = async function(){  
      const {
          workflow :{renderKey},
      }  = this.props;

      const {hasRender}  = this.state;  
      
      if (renderKey.length == 0 || hasRender) { 
           return;
      }else{
          this.state.hasRender = true; 
      }

      let newDemo = []; 
      for (let index = 0; index < renderKey.length; index++) {
          const item = renderKey[index]; 
          const key = item.key;
          const params = item.params;
          if (EnableComponent[key]) { 
              await  EnableComponent[key]().then((Component) => {
                  //do something with TheComponent = Component.default  
                  let dividerItem = "";
                  if (params.title) { 
                      dividerItem = (
                          <Component.default params = {params}/>
                          // <Collapse bordered={false} defaultActiveKey={['1']}>
                          //     <Panel header={params.title } key="1">
                          //         <Divider orientation="left"><Icon type="edit" theme="twoTone" />{params.title}</Divider> 
                          //         <Component.default params = {params}/>
                          //     </Panel> 
                          // </Collapse> 
                      )
                  }else{
                      dividerItem =(<Component.default params = {params}/>);
                  }
                  const App = () => {
                      return ( 
                          <div>  
                              {dividerItem} 
                          </div>
                      ) 
                  }  
                  newDemo.push({...App(),params:params,key:index});    
              }) 
          } 
      }  
      this.setState({demo: newDemo});  
  }  

  render() {  
    const {demo}  = this.state;   
    let renderDemo = demo;  
    
    return (
      <div className="demo-page">
        {renderDemo} 
        {/* <SimpleFooter /> */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  configDataAction,
};

/**
 * 处理reducer下的state=>props
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  return { workflow: state.workflow };
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
const withWorkflowReducer = injectReducer({
  key: 'workflow',
  reducer: workflowReducer,
});
 

export default compose(
  withWorkflowReducer, 
  withConnect
)(Demo);


