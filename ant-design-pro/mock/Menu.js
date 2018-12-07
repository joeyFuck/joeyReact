// 这里模仿后台返回的菜单数据
export default {
  'GET /DynamicMenu/getDynamicMenu':  
   // app
  [ 
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      routes: [
        {
          path: '/dashboard/analysis',
          name: 'analysis',
          component: './Dashboard/Analysis',
        },
        {
          path: '/dashboard/monitor',
          name: 'monitor',
          component: './Dashboard/Monitor',
        },
        {
          path: '/dashboard/workplace',
          name: 'workplace',
          component: './Dashboard/Workplace',
        }, 
      ],
    }, 
     // forms
     {
      path: '/form',
      icon: 'form',
      name: 'form',
      routes: [
        {
          path: '/form/basic-form',
          name: 'basicform',
          component: './Forms/BasicForm',
        },
        {
          path: '/form/step-form',
          name: 'stepform',
          component: './Forms/StepForm',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/form/step-form',
              name: 'stepform',
              component: './Forms/StepForm/Step1',
              // redirect: '/form/step-form/info',
            },
            {
              path: '/form/step-form/info',
              name: 'info',
              component: './Forms/StepForm/Step1',
            },
            {
              path: '/form/step-form/confirm',
              name: 'confirm',
              component: './Forms/StepForm/Step2',
            },
            {
              path: '/form/step-form/result',
              name: 'result',
              component: './Forms/StepForm/Step3',
            },
          ],
        },
        {
          path: '/form/advanced-form',
          name: 'advancedform',
          authority: ['admin'],
          component: './Forms/AdvancedForm',
        },
      ],
    },
    // list
    {
      path: '/list',
      icon: 'table',
      name: 'list',
      routes: [
        {
          path: '/list/table-basic-search',
          umipath: '/list/table-basic-search',
          name: 'basicsearch',
          component: './List/BasicSearch',
          search:{
            id:"123456",
            name:"test",
          },
        },
        {
          path: '/list/table-basic-search2',
          umipath: '/list/table-basic-search',
          name: 'basicsearch2',
          component: './List/BasicSearch',
          search:{
            id:"456789"
          },
        },
        {
          path: '/list/table-basic-search3',
          umipath: '/list/table-basic-search',
          name: 'basicsearch3',
          component: './List/BasicSearch',
          search:{
            id:'789456'
          },
        },  
        // {
        //   path: '/list/table-basic-search2',
        //   name: 'basicsearch2',
        //   component: './List/BasicSearch',
        //   search:{
        //     id:"456789"
        //   },
        // },
        // {
        //   path: '/list/table-basic-search3',
        //   name: 'basicsearch3',
        //   component: './List/BasicSearch',
        //   search:{
        //     id:'789456'
        //   },
        // },  
        {
          path: '/list/table-list-updown',
          name: 'updowntable',
          component: './List/TableListUpDown',
        },
        {
          path: '/list/table-list-leftright',
          name: 'leftrighttable',
          component: './List/TableListLeftRight',
        },
        {
          path: '/list/table-list',
          name: 'searchtable',
          component: './List/TableList',
        },
        {
          path: '/list/basic-list',
          name: 'basiclist',
          component: './List/BasicList',
        },
        {
          path: '/list/card-list',
          name: 'cardlist',
          component: './List/CardList',
        },
        {
          path: '/list/search',
          name: 'searchlist',
          component: './List/List',
          routes: [
            {
              path: '/list/search',
              // redirect: '/list/search/articles',
              component: './List/Articles',
            },
            {
              path: '/list/search/articles',
              name: 'articles',
              component: './List/Articles',
            },
            {
              path: '/list/search/projects',
              name: 'projects',
              component: './List/Projects',
            },
            {
              path: '/list/search/applications',
              name: 'applications',
              component: './List/Applications',
            },
          ],
        },
      ],
    },  
    
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          path: '/account/center',
          name: 'center',
          component: './Account/Center/Center',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/account/center',
              component: './Account/Center/Articles',
              // redirect: '/account/center/articles',
            },
            {
              path: '/account/center/articles',
              component: './Account/Center/Articles',
            },
            {
              path: '/account/center/applications',
              component: './Account/Center/Applications',
            },
            {
              path: '/account/center/projects',
              component: './Account/Center/Projects',
            },
          ],
        },
        {
          path: '/account/settings',
          name: 'settings',
          component: './Account/Settings/Info',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/account/settings',
              // redirect: '/account/settings/base',
              component: './Account/Settings/BaseView',
            },
            {
              path: '/account/settings/base',
              component: './Account/Settings/BaseView',
            },
            {
              path: '/account/settings/security',
              component: './Account/Settings/SecurityView',
            },
            {
              path: '/account/settings/binding',
              component: './Account/Settings/BindingView',
            },
            {
              path: '/account/settings/notification',
              component: './Account/Settings/NotificationView',
            },
          ],
        },
      ],
    }, 
    // joey
    { 
      name: 'joeymenu', 
      icon: 'table', 
      path: '/joeymenu', 
      routes: [
        {
          path: '/joeymenu/list', 
          name: 'list', 
          //component: './JoeyMenu/Success',
          // component: './JoeyMenu/TableList', 
          component: './JoeyMenu/TablePoolLog',
        },  
        {
          path: '/joeymenu/list2', 
          name: 'list2',  
          component: './JoeyMenu/TablePoolLog',
        },  
        
      ], 
    },
    //  workflow
     { 
      name: 'wf', 
      icon: 'table', 
      path: '/wf', 
      routes: [
        {
          path: '/wf/demo',
          name: 'demo',  
          component: './WF/Demo',
        },   
      ], 
    },
]
};
