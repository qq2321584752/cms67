// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import moment from 'moment'
// Vue.use(moment)
// Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.config.productionTip = false
Vue.use(MintUI)

import 'mint-ui/lib/style.css'
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'
import './lib/fonts/mui.ttf'

// 引入 配置 axios
import axios from 'axios'

// 引入Moment模块
import moment from 'moment'

// 定义全局的时间过滤器
Vue.filter('dateFormat', a => {
  return moment(a).format('YYYY-MM-DD HH:mm:ss')
})
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
