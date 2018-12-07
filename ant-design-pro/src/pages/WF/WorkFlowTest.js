import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {EnableComponent} from './EnableComponent/ztpj';//这个有必要的话也可以换成import函数动态导入，这样就能动态导入对应的流程类别组件
import {
    Row,
    Col, 
    Divider,
    Icon,
    BackTop,
    Collapse, 
  } from 'antd';

  const Panel = Collapse.Panel;
  
@connect(({ workflow, loading }) => ({
    workflow, 
    loading: loading.effects['workflow/fetch'],
  }))  
class WorkFlowTest extends PureComponent { 
    state = {  
        demo:[],
        hasRender:false,
    }; 
    componentDidUpdate(){
        //获取配置的组件，暂时放在生命周期componentDidUpdate.
        this.renderDemo();
    }

    componentDidMount() {
        const { dispatch,location } = this.props;
        // const { dispatch,  route: { search }, } = this.props;//到时候要取route里面的参数
 
        /**
         *  通过页面参数获取页面对应配置
         */
        dispatch({
            type: 'workflow/fetch',
            payload:{
                id:location.query.id
            }, 
        });  
       
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
                            <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Panel header={params.title } key="1">
                                    <Divider orientation="left"><Icon type="edit" theme="twoTone" />{params.title}</Divider> 
                                    <Component.default params = {params}/>
                                </Panel> 
                            </Collapse> 
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
        <div>
             <BackTop /> 
             {renderDemo} 
        </div>
       ) 
    }
}

export default WorkFlowTest;
 
 