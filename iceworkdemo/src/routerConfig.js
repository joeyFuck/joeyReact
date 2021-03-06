// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import WFLayout from './layouts/WFLayout';
import WorkFlowLayout from './layouts/WorkFlowLayout';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import Portlets from './pages/Portlets';
import Terms from './pages/Terms';
import Result from './pages/Result';
import Fail from './pages/Fail';
import ServerError from './pages/ServerError';
import Forbidden from './pages/Forbidden';
import Empty from './pages/Empty';
import List from './pages/List';
import CardList from './pages/CardList';
import BasicTable from './pages/BasicTable';
import TableDisplay from './pages/TableDisplay';
import WorkFlow from './pages/WorkFlow';

import Demo from './pages/WFDemo';
import Panel from './pages/WPanel';
import Page20 from './pages/Page20';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/exception/500',
    component: ServerError,
    layout: BasicLayout,
  },
  {
    path: '/portlets/base',
    component: Portlets,
    layout: BasicLayout,
  },
  {
    path: '/table/table-display',
    component: TableDisplay,
    layout: BasicLayout,
  },
  {
    path: '/chart/chart-list',
    component: Charts,
    layout: BasicLayout,
  },
  {
    path: '/list/article-list',
    component: List,
    layout: BasicLayout,
  },
  {
    path: '/list/card-list',
    component: CardList,
    layout: BasicLayout,
  },
  {
    path: '/result/success',
    component: Result,
    layout: BasicLayout,
  },
  {
    path: '/result/fail',
    component: Fail,
    layout: BasicLayout,
  },
  {
    path: '/table/basic-table',
    component: BasicTable,
    layout: BasicLayout,
  },
  {
    path: '/portlets/terms',
    component: Terms,
    layout: BasicLayout,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: BasicLayout,
  },
  {
    path: '/exception/403',
    component: Forbidden,
    layout: BasicLayout,
  },
  {
    path: '/exception/204',
    component: Empty,
    layout: BasicLayout,
  },
  {
    path: '/exception/404',
    component: NotFound,
    layout: BasicLayout,
  },
  {
    path: '/user/login',
    component: UserLogin,
    layout: UserLayout,
  },
  {
    path: '/user/register',
    component: UserRegister,
    layout: UserLayout,
  },
  {
    path: '/workflow/index',
    layout: BasicLayout,
    component: WorkFlow,
  },
  {
    path: '/wf/demo',
    layout: WorkFlowLayout,
    component: Demo,
  },
  {
    path: '/wf/panel',
    layout: WorkFlowLayout,
    component: Panel,
  },
  {
    path: '/test/page20',
    layout: WorkFlowLayout,
    component: Page20,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
