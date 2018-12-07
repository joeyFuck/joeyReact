> 第一版
```js
import React, { PureComponent } from 'react';

const EnableComponent = {
    TableListDemo: () => {
        return import('../List/TableList')
    },
}
  
  
class Demo extends PureComponent { 
    state = { 
        demo:null
    };
    componentDidMount() {
         this.renderDemo();
    }
    renderDemo = ()=>{ 
        EnableComponent["TableListDemo"]().then((Component) => {
            //do something with TheComponent = Component.default
            // console.log(Component);
            const App = () => {
                return ( 
                    <Component.default/> 
                )
              }
            this.setState({demo:(App())});
        }) 
    } 

    render() {
       const {demo}  = this.state;

       return (
        <div>
             {demo} 
        </div>
       ) 
    }
}

export default Demo;

```

>   第二版

```js
import React, { PureComponent } from 'react';

const EnableComponent = {
    WorkFlowHeadDemo: () => {
        return import('./head')
    },
    TableListDemo: () => {
        return import('../List/TableList')
    },
}
   
  
class Demo extends PureComponent { 
    state = { 
        demo:[]
    }; 

    componentDidMount() {
        const renderKey = ["WorkFlowHeadDemo","TableListDemo"];
       //  this.renderDemo(renderKey);//方式一
       //  this.himmel(this.renderDemo(renderKey)); //方式二 用yield进行promise同步，单次渲染
        this.renderDemo(renderKey); //方式三 用async+await实现同步异步操作
   } 

    /**
     * 方式二
     * 本质就是递归 promise().then(new promise().then(...))
     * yield 相当于暂停，其实就是await
     * 现在可以用async+await替代
     */
    himmel = function(gen) {
        const item = gen.next()
        if (item.done) {
            // console.log(item.value);
            // console.log(222);
            this.setState({demo: item.value});
            return item.value
        }
        
        const { value, done } = item
        if (value instanceof Promise) {
            value.then((e) => this.himmel(gen))
        } else {
            this.himmel(gen)
        }
    } 
    //方式二 星号和 yield进行promise同步，单次渲染
    // renderDemo = function* (renderKey){ 
    //     let newDemo = [];//用slice实现简单的深拷贝
    //     for (let index = 0; index < renderKey.length; index++) {
    //         const key = renderKey[index]; 
    //         if (EnableComponent[key]) {
    //             yield  EnableComponent[key]().then((Component) => {
    //                 //do something with TheComponent = Component.default  
    //                 const App = () => {
    //                     return ( 
    //                         <Component.default/> 
    //                     )
    //                 } 
    //                 // console.log(index);// 0 1 2...
    //                 newDemo.push({...App(),key:index});    
    //             }) 
    //         } 
    //     } 
    //     return  newDemo; 
    // } 

    /**
     * 方式三 用async+await
     */
    renderDemo = async function(renderKey){ 
        let newDemo = [];//用slice实现简单的深拷贝
        for (let index = 0; index < renderKey.length; index++) {
            const key = renderKey[index]; 
            if (EnableComponent[key]) {
                await  EnableComponent[key]().then((Component) => {
                    //do something with TheComponent = Component.default  
                    const App = () => {
                        return ( 
                            <Component.default/> 
                        )
                    } 
                    // console.log(index);// 0 1 2...
                    newDemo.push({...App(),key:index});    
                }) 
            } 
        }
        this.setState({demo: newDemo});  
    }  
     
    //方式一，导致多次更新state，多次渲染
    // renderDemo = (renderKey)=>{  
    //     for (let index = 0; index < renderKey.length; index++) {
    //         const key = renderKey[index]; 
    //         if (EnableComponent[key]) {
    //               EnableComponent[key]().then((Component) => {
    //                 //do something with TheComponent = Component.default 
    //                 let newDemo = this.state.demo.slice();//用slice实现简单的深拷贝
    //                 const App = () => {
    //                     return ( 
    //                         <Component.default/> 
    //                     )
    //                 } 
    //                 newDemo.push({...App(),key:index});   
    //                 console.log(index);//1 0 2...看promise的延迟，越快则返回越早
    //                 this.setState({demo:newDemo});
    //             }) 
    //         } 
    //     } 
    // } 

    render() { 
    //    console.log(11111);
       const {demo}  = this.state;  
       let renderDemo = [];
       for (let index = 0; index < demo.length; index++) {
           const element = demo[index];
           renderDemo.push(element);
       }  
    //    renderDemo = renderDemo.sort((a, b) => a.key > b.key ? 1 : -1);//方式一由于返回的顺序不同，组件需要重新排序
       return (
        <div>
             {renderDemo} 
        </div>
       ) 
    }
}

export default Demo;
 
```