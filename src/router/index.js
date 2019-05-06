import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// import test from '../components/test.vue'
import app from '../App.vue'
import home from '../components/home.vue'
import member from '../components/member.vue'
import shopcar from '../components/shopcar.vue'
import search from '../components/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 配置 4个 主页面 路由 主页默认定向到 home 子组件路由
    { path: '/', component: app, redirect: '/home' },
    { path: '/home', component: home },
    { path: '/member', component: member },
    { path: '/shopcar', component: shopcar },
    { path: '/search', component: search },
  ],
  // 点击 那个 to 哪里 哪里就添加一个类名聚焦类名
  linkActiveClass: 'mui-active'
})
