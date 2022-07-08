// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import CommonLayout from '@/layouts/CommonLayout'
import TitleView from '@/layouts/TitleView'
import { svgFiles } from '@/assets/svgFiles/index'


const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

// 登录页url
export const LOGIN_PATH = '/user/login'


/**
 * 路由
 * */
const menuList = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/demo',
    children: [
      {
        name: 'demo',
        path: '/demo',
        component: RouteView,
        redirect: '/demoList',
        meta: { title: 'Demo', icon: svgFiles.userMgt,},
        children: [
          {
            path: '/demoList',
            name: 'demoList',
            component: () => import('@/views/demo/Demo'),
            meta: { title: '列表Demo' }
          },
          {
            path: '/multipleTab',
            name: 'multipleTab',
            component: RouteView,
            redirect: '/tab1',
            hideChildrenInMenu: true,
            meta: { title: '多页签Demo' },
            children: [
              {
                path: '/tab1',
                name: 'tab1',
                component: () => import('@/views/demo/Tab1'),
                meta: { title: 'TAB1' }
              },
              {
                path: '/tab2',
                name: 'tab2',
                component: () => import('@/views/demo/Tab2'),
                meta: { title: 'TAB2' }
              },
            ]
          }
        ]
      },
      {
        name: 'userMgt',
        path: '/userMgt',
        component: () => import('@/views/userMgt/userMgt'),
        meta: { title: '用户管理', icon: svgFiles.userMgt, permission: ['admin'] },
      },
      //审计员
      {
        path: '/logMgt',
        name: 'logMgt',
        component: () => import('@/views/logMgt/logMgt.vue'),
        meta: { title: '操作日志', icon: svgFiles.logMgt, permission: ['auditor'] },
      },
      //  操作员
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export const asyncRouterMap = menuList

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/test',
    name: 'test',
    component: CommonLayout,
    redirect: '/test/testFile',
    children: [
      {
        path: 'testFile',
        name: 'testFile',
        component: () => import('@/views/testPage/TestPage'),
        meta:{keepAlive:true},
        children: [
          {
            path: 'upload',
            name: 'upload',
            component: () => import('@/views/testPage/components/FileUpload'),
            meta:{keepAlive:true}
          },
          {
            path: 'upload2',
            name: 'upload2',
            component: () => import('@/views/user/Login'),
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    component: CommonLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

// 面包屑菜单层级关系在这维护, 使用组件HeadBreadcrumb
export const breadcrumbs = [
  {
    path: '/home',
    name: '首页',
    children: [
      {
        path: '/childTest1',
        name: '子页面1',
        children: [
          {
            path: '/grandson',
            name: '孙页面1',
          }
        ]
      },
      {
        path: '/childTest2',
        name: '子页面2'
      },
      {
        path:'/home/content/waitTargetTest',
        name:'待测目标管理'
      }
    ]
  }
]



