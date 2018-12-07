import React from 'react';
import { Layout,Affix  } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { formatMessage } from 'umi/locale';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import SettingDrawer from '@/components/SettingDrawer';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';
import Exception404 from '../pages/Exception/404'; 

import { Tabs, Button ,Icon} from 'antd';

import zh_CN from '../locales/zh-CN'; 
import router from 'umi/router';
import styles from './BasicLayout.less';
// import { StickyContainer, Sticky } from 'react-sticky';

 

const { Content } = Layout;
const TabPane = Tabs.TabPane;

// Conversion router to menu.
function formatter(data, parentPath = '', parentAuthority, parentName) {
  return data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale,
      authority: item.authority || parentAuthority,
    };
    if (item.routes) {
      const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority, locale);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

/**
 * TabRoute
 * 获取所有菜单项 父菜单与子菜单，不包括隐藏菜单（分布菜单中的）
 * @param {*} data 
 * @param {*} parentName 
 * @param {*} icon 
 * @param {*} tabRoute 
 * @param {*} hideChildrenInMenu 表明该页是否为隐藏页（如分步表单，不在左侧菜单页显示）1
 */
function getTabRouteList(data, parentName,icon, tabRoute = [] ,hideChildrenInMenu=false) {
  // let tabRoute = []; 
  for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if(item.path){
        //该菜单下有页面
        //  locale 设置父路由的国际化name
        let locale = 'menu';
        if (parentName && item.name) {
          locale = `${parentName}.${item.name}`;
        } else if (item.name) {
          locale = `menu.${item.name}`;
        } else if (parentName) {
          locale = parentName;
        }

        if (!item.routes) {
          //直接是item
          const tabItem = {
            path: item.path,
            umipath:item.umipath,
            search:item.search,
            name: item.name,
            icon: icon,
            locale:locale,
            hideChildrenInMenu:hideChildrenInMenu,
          }
          tabRoute.push(tabItem);
        }else{
           //循环item.routes
           for (let index = 0; index < item.routes.length; index++) {
            const element = item.routes[index]; 
            //  localeElem 设置子路由的国际化name
            let localeElem = locale;
            if (parentName && element.name) {
              localeElem = `${parentName}.${element.name}`;
            } else if (element.name) {
              localeElem = `${locale}.${element.name}`;
            } else if (parentName) {
              localeElem = parentName;
            }

            if (element.path) {
              const tabItem = {
                  path: element.path,
                  umipath:element.umipath,
                  search:element.search,
                  name: element.name,
                  icon: item.icon,
                  locale:localeElem,
                  hideChildrenInMenu:hideChildrenInMenu,
              }
              tabRoute.push(tabItem); 
              if (element.routes) { //&& !element.hideChildrenInMenu  
                getTabRouteList(element.routes, localeElem,item.icon,tabRoute,element.hideChildrenInMenu); 
              }
            } 
          }  
        } 
      }
  }
  return tabRoute; 
}



const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log('constructor'); 
 
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
 
  }

  state = {
    rendering: true,
    isMobile: false,
    activeKey: '',//当前Active的TabPanel
    panes:[],//保存打开的TabPanels信息
    menuData:[],//joeyroute formatter后的菜单数据
    tabRoutes:[],//joeyroute getTabRouteList后的路由数据
  };


  /**
   * 组件挂载之前判断是否要更新tab
   */
  componentWillMount() {
     console.log('componentWillMount');

     const { 
      route: { routes },
      joeyRoutes
    } = this.props; 
     
     const tabRoutes = getTabRouteList(joeyRoutes); 
     let newTabItem = this.getRouteFilter(tabRoutes,this.props.location);// tabRoutes.filter(item=>item.path == this.props.location.pathname);//+this.props.location.search
      
     if (newTabItem.length > 0) {
        this.onTabAdd(this.props, newTabItem[0]);
     }else{
       //两种情况，1、不在路由设置中，也就是404  2、页面正在初始化
       const allRoutes = getTabRouteList(routes);
       let routeExist =  this.getRouteFilter(allRoutes,this.props.location);// allRoutes.filter(item=>item.path == this.props.location.pathname);
       if (routeExist.length ==  0) {
          console.log("404,如有问题请检查路由设置");
          this.setState({ activeKey:'0' });  
       } else{
          console.log("首页刷新，初始化");
       }
     }  
  }


  /**
   * 每次在react-router中切换时也要判断是否更新tab
   */
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    
     // FIXME: hack, 在react-router中切换时会触发这个方法两次, 据说是和hashHistory有关, 需要手动处理下
     const action = this.props.location.action;
     if (action === 'PUSH') {  // action有PUSH、POP、REPLACE等几种, 不太清楚分别是做什么用的
       return;
     }
 
     // FIXME: hack, 因为要区分react-router引起的re-render和redux引起的re-render
     if (this.props.collapse === nextProps.collapse) {

      const { 
        joeyRoutes, 
      } = this.props;
      
      if (this.state.tabRoutes.length == 0 && joeyRoutes.length > 0) { 
         this.state.tabRoutes =  getTabRouteList(joeyRoutes);  
      } 

       const tabRoutes = this.state.tabRoutes;// getTabRouteList(joeyRoutes);  

       let newTabItemArr = this.getRouteFilter(tabRoutes,nextProps.location); 
        
        // console.log(newTabItemArr);
        if (newTabItemArr.length == 0) { 
          if (tabRoutes.length == 0) {
            console.log("初始化中，获取权限路由");
          }else{
            console.log("还有这种情况？路由切换，而该路由不在TabRoute中");
          }  
          return;
        }

       if (newTabItemArr[0].hideChildrenInMenu) {  
          //说明是隐藏页面，如分布表单
          //更新当前tab 
          console.log("更新Tab");
          this.onTabUpdate(nextProps,newTabItemArr[0]);
       }else{
          console.log("新增Tab"); 
          this.onTabAdd(nextProps,newTabItemArr[0]);
       }  
     } 
  }


  getRouteFilter(tabRoutes,location){
    return tabRoutes.filter(item=>{
      if (item.umipath) {
        //说明是通用查询框架
        //umipath: "/list/table-basic-search" 统一与router.config.js中的对应，path: "/list/table-basic-search2"各自唯一
         if(item.search.id){
            return item.search.id == location.query.id;
         }else{
            return false;
         }
      }else{
        return item.path ==  location.pathname
      } 
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });

    //动态获取路由
    dispatch({
      type: 'joeymenu/fetchRoute',
    });   
 
  }

  componentDidUpdate(preProps) { 
    console.log('componentDidUpdate');
 
    //After changing to phone mode,
    //if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }    
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    console.log('getMenuData');
    const {
      route: { routes },
      joeyRoutes,
    } = this.props; 
    
    //  debugger;
    // console.log(formatter(routes));
    //  console.log(JSON.stringify(formatter(joeyRoutes)));
    //  console.log(filterRoutes);
    let menuData = [];
    if (this.state.menuData.length == 0 && joeyRoutes.length > 0) {  
      this.state.menuData = formatter(joeyRoutes);
    }
    // return menuData; 
    return this.state.menuData;//formatter(joeyRoutes); 
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData()); 
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return 'Ant Design Pro';
    }
    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${message} - Ant Design Pro`;
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '2px 2px 0 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if ((rendering || process.env.NODE_ENV === 'production') && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  }

  /**
   * 获取国际化中对应key的value
   * @param {*} k 
   */
  getZH_CNValue(k){
    const v = zh_CN[k];
    if (v) {
      return v;
    }else{
      return k;
    } 
  }

  /**
   * 新增tabPane
   */
  onTabAdd = (props,newTabItem)=> {   
    
    let key = newTabItem.path;// props.location.pathname+;//+ this.props.location.search; 
    const tabTitle = this.getZH_CNValue(newTabItem.locale);     
    const tabIcon =  newTabItem.icon;
  
    // 当前key对应的tab是否已经显示了? 防止重复显示同一Tab
    let exist = false;
    for (const pane of this.state.panes) {
      if (pane.key === key) {
        exist = true;
        break;
      }
    } 

    // 如果key不存在就要新增一个tabPane
    if (!exist) {
      this.state.panes.push({
        key,
        umipath:newTabItem.umipath,
        title: tabTitle,
        //content: React.cloneElement(props.children),  // 我本来是想clone一下children的, 这样比较保险, 不同tab不会互相干扰, 但发现似乎不clone也没啥bug
        content: props.children,
        Icon:tabIcon,
      });  
    } 
     //保证activeKey是当前tab
     //更新当前选中的tab
     if (this.state.activeKey != key) {
        this.state.activeKey = key;
     } 
    // this.setState({ panes, activeKey:key }); 
  }

  /**
   * 更新Tab 如分布表单
   */
  onTabUpdate = (props,newTabItem)=> {
    const panes = this.state.panes;
    for (const pane of panes) { 
      if (pane.key === this.state.activeKey) { 
        pane.content = props.children
        pane.title = this.getZH_CNValue(newTabItem.locale);
        pane.Icon = newTabItem.icon;
        break;
      }
    }  
    this.setState({ panes });   
  }

  /**
   * Tab切换
   */
  onTabChange = (activeKey) => {  
    console.log("Tab切换");
    const p = this.state.panes;
   debugger
    const activeP = p.filter(item=>{ 
        return item.key ==  activeKey
    });
    if (activeP && activeP.length > 0) {
      if (activeP[0].umipath) {
        this.setState({ activeKey });//修改Tab激活项
      }else{
        router.push(activeKey);//同步菜单激活项 push路由的时候会同步更新Tab激活项
      }
    } 
    // console.log(activeKey);
    // this.setState({ activeKey });//修改Tab激活项
    // router.push(activeKey);//同步菜单激活项 push路由的时候会同步更新Tab激活项
  }

  /**
   * Tab点击
   */
  onTabClick = () => {
    // alert(2);
    // 暂时用不上，有onTabChange够用了
  }

  
  /**
   * Tab移除
   */
  onTabRemove = (targetKey) => {
    // console.log('targetKey:'+targetKey);
    let activeKey = this.state.activeKey;
    let currentTabIndex = -1; 
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) { 
        currentTabIndex = i;
      }
    });
    const allPanes = this.state.panes;
    const panes = allPanes.filter(pane => pane.key !== targetKey);
      
    if (currentTabIndex > 0 && panes.length > 0) {
        // 如果当前tab左边还有tab, 就激活左边的
      activeKey = allPanes[currentTabIndex - 1].key;
    }else if(currentTabIndex === 0 && panes.length > 0){
      // 否则就激活右边的tab
      activeKey = allPanes[1].key;
    }else{
      //空激活默认页面，现在是404
      activeKey = '0';
    }
    this.setState({ panes, activeKey });
  }

  render() {
    console.log("render");
     
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
    } = this.props;
    const { isMobile } = this.state;
    const isTop = PropsLayout === 'topmenu';
    // debugger
    const menuData = this.getMenuData();
    // const routerConfig = this.matchParamsPath(pathname);
 

    const layoutTab = ( 
      <div className={styles.tabBar}>
         <Tabs
       hideAdd
       onChange={this.onTabChange}
       activeKey={this.state.activeKey}
       type="editable-card"
       onEdit={this.onTabRemove} 
       animated={true}
       onTabClick={this.onTabClick}
    > 
        { 
          this.state.panes.length > 0 ?
          this.state.panes.map(pane => ( 
          <TabPane tab={<span><Icon type={pane.Icon} /> {pane.title}</span>} key={pane.key}>{pane.content}</TabPane> 
          )):(<TabPane tab={'Index'} key={'0'}><Exception404/></TabPane>)
        }

        {/* <TabPane tab={'Tab 1'} key={'1'}>{children}</TabPane> <Exception404/>*/}
        
        </Tabs>
      </div> 
    );


    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
    
          <SiderMenu
            logo={logo}
            Authorized={Authorized}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props} 
          />   
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
        {/* <Affix offsetTop={0}>  */}
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          {/* </Affix> */}
          <Content style={this.getContentStyle()}>
            {/* <Authorized authority={routerConfig.authority} noMatch={<Exception403 />}>
              {layoutTab}  
            </Authorized> */}
            {layoutTab}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {this.renderSettingDrawer()}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting,joeymenu,loading}) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  joeyRoutes:joeymenu.routeList, 
  loading: loading.effects['joeymenu/fetchRoute'],
  ...setting,
}))(BasicLayout);
