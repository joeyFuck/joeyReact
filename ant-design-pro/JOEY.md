> Todo

1.  ~~多页签~~
2.  ie9
3.  ~~权限包括页面跟按钮~~
4.  ~~动态生成查询页面(多路由单组件)~~
5.  ~~动态路由~~
6.  ~~跨域~~
7.  ~~import函数动态加载组件(如何去按需动态加载未知组件（预先未知，只有需要到渲染的时候才知道）)~~
8.  对于页面中已经渲染的组件，如何去获取其组件类中的一些类属性。
9.  ~~使用async+await进行promise等异步操作“同步”的实现~~(有助于处理下一个异步操作依赖上一个异步操作的情况)
10. 现在是每一个新的查询配置页面跟新的流程页面都是一个新的路由+新的参数（组件是同一个），那么一堆流程怎么办，总不能把路由配置弄的很臃肿。查询配置页面反正都得新增菜单，可以这么做。流程页面肯定不行
11. 流程页面要不要在一个路由里？还是分成现在一样的多个路由页面
12. ~~通用查询页面现在新增配置后，不需要手动去新增router.config.js里的菜单项，已根据路由参数实现~~
12. 通用查询页面的tab切换跟菜单联动有问题，还得研究下菜单的激活本质。

> 下拉框

1.  动态单次获取DataSource
2.  动态获取DataSource，filter匹配
3.  固定数据

> 日期控件

1.  还有点问题，表单提交时候会将所有的内部input一起提交 官方issue

> 注意点

models的namespace名称以及路由配置的名称均需小写或者以多个小写字母-相连，不然报错`namespace需唯一`

> 一 跨域设置：

`credentials: 'include'` 

表明请求时候带上cookie，在服务端响应头那里设置  `Access-Control-Allow-Credentials: true `

此时`Access-Control-Allow-Origin`就不能设置为 * 了，需要用白名单，`Access-Control-Allow-Origin：'http://xxx.com'`

```js
HttpContext.Response.AppendHeader("access-control-allow-credentials", "true");
HttpContext.Response.AppendHeader("access-control-allow-origin", "http://localhost:8000"); 
HttpContext.Response.AppendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
```
https://blog.csdn.net/vincent_ling/article/details/51714691

https://www.2cto.com/kf/201612/573693.html

 

> 二 `FormData`：

https://blog.csdn.net/saharalili/article/details/79002568

```js
if (!(newOptions.body instanceof FormData){
  不是FormData的话用newOptions.body = JSON.stringify(newOptions.body); 
}
```

> 三 `Table`:

```js
export interface ColumnProps<T> {
  title?: React.ReactNode;
  key?: string;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) 
  => React.ReactNode;
  filters?: { text: string; value: string }[];
  onFilter?: (value: any, record: T) => boolean;
  filterMultiple?: boolean;
  filterDropdown?: React.ReactNode;
  sorter?: boolean | ((a: any, b: any) => number);
  colSpan?: number;
  width?: string | number;
  className?: string;
  fixed?: boolean | ('left' | 'right');
  filteredValue?: any[];
  sortOrder?: boolean | ('ascend' | 'descend');
}
```

> 四 fetch:

需要表单提交传递的参数为`new FormData()`对象

注意空的时候，实例化一个空的`FormData()`对象

便于封装好的`request`中判断

> 五 `getFieldDecorator`：

这里使用了props.form.getFieldDecorator(id,{选择操作})方法来包装一个Input输入框组件，传入的第一个参数表示这个字段的Id，第二个参数是一个配置对象，这里设置了表单控件的校验规则rules。

问题：填写Form表单时会发报 Warning: `getFieldDecorator` will override `value`, so please don't set `value` directly and use `setFieldsValue` to set it.

真因：使用getFieldDecorator（）方法包装后的组件会自动更新表单组件的value以及onChange事件，无需再手动添加value属性,但onChange事件可根据需求添加以便监听数据变化。

真是因为手动添加`value`属性才导致Warning的发生。

如果需要填写初始默认值可使用`initialValue`进行设置。
 
> 六 面包屑注释： 

`src\components\PageHeaderWrapper\index.js  <MenuContext.Consumer>`

> 七 布局Header的菜单项，搜索-··到··-语言 这一块

`component/GlobalHeader/RightContent.js`

> 八 TabPanel

/layouts/Header.js handleMenuClick

只需路由配置时，注意，不使用redirect时，将redirect路由对应的component直接赋值，如

```js
{
    path: '/form/step-form',
    name: 'stepform', 
    redirect: '/form/step-form/info',
},

=>

{
    path: '/form/step-form',
    name: 'stepform',
    component: './Forms/StepForm/Step1',
    // redirect: '/form/step-form/info',
},
```

注意，Tab页禁止使用redirect，这样会刷新页面，导致TabRoute重置。

分布路由页面，注意要设置父路由的属性 `hideChildrenInMenu: true`，这样路由切换只会刷新当前`Tab`，而非新增`Tab`.



> 九 api 异步async 方法返回需promise

```js
return resultList; //注意这里是返回promise对象，而非具体是数据本身，因为当前方法是异步执行，直接返回对象会先返回一个promise处理前的对象。
// let data = []
//promise处理操作data
// return data; //直接返回数据对象，这里就为[]了
```

