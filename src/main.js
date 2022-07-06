// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { $http } from './utils/request'
import EventBus from './utils/bus'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import Confirm from './components/qaconfirm/qaconfirmjs'
import $diskLimit from './components/DiskMaxLimit/index'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import './assets/icons/iconfont.css'
import './index.css'


Vue.config.productionTip = false

Vue.prototype.$http = $http
Vue.prototype.$eventBus = EventBus

Vue.use(Confirm);
Vue.use($diskLimit)

import ViewUI from 'view-design';//Cron用到的ui
import locale from 'view-design/dist/locale/en-US';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI, { locale });


// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex, Logo message
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
