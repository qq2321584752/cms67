import Vue from 'vue'
import Router from 'vue-router'

// import test from '../components/test.vue'
import app from '../App.vue'
import home from '../components/home.vue'
import member from '../components/member.vue'
import shopcar from '../components/shopcar.vue'
import search from '../components/search.vue'
import goodslist from '../components/goodslist.vue'
import goodsinfo from '../components/goodsinfo.vue'
import goodsdesc from '../components/goodsdesc.vue'
import goodscomment from '../components/goodscomment.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 配置 4个 主页面 路由 主页默认定向到 home 子组件路由
    { path: '/', component: app, redirect: '/home' },
    { path: '/home', component: home },
    { path: '/home/goodslist', component: goodslist },
    { path: '/home/goodsinfo/:id', component: goodsinfo },
    { path: '/home/goodsdesc/:id', component: goodsdesc },
    { path: '/home/goodscomment/:id', component: goodscomment },



    { path: '/member', component: member },
    { path: '/shopcar/:id/:num', component: shopcar },
    { path: '/search', component: search },
  ],
  // 点击 那个 to 哪里 哪里就添加一个类名聚焦类名
  linkActiveClass: 'mui-active'
})
