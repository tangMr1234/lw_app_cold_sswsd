import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Login')) }) } // 登录
const Home = resolve => { require.ensure([], () => { resolve(require('@/views/Home')) }) } // 主页面框架
const TabHome = resolve => { require.ensure([], () => { resolve(require('@/views/TabHome')) }) } // tab页面框架

const Index = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Index')) }) } // 首页
const Curve = resolve => { require.ensure([], () => { resolve(require('@/views/Curve/Curve')) }) } // 温度曲线
const Grid = resolve => { require.ensure([], () => { resolve(require('@/views/Grid/Grid')) }) } // 温度表格

const Details = resolve => { require.ensure([], () => { resolve(require('@/views/Details/Details')) }) } // 装备详情
const NotFound = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/404')) }) } // 错误404

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        {path: '/index', component: Home, name: '实时温湿度', meta:{ link: '#/details' }}
      ]
    },
    {
      path: '/details',
      redirect: {path: '/details/detail'},
      NewRouter: 'details',
      component: TabHome,
      name: '实时温湿度详情',
      children: [
        {path: '/details/detail', component: Details, name: '装备详情'},
        {path: '/details/curve', component: Curve, name: '温度曲线'},
        {path: '/details/grid', component: Grid, name: '温度列表'}
      ]
    }
  ]
})
