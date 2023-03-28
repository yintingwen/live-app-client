import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './i18n'

// 页面布局组件
import PageLayout from './components/common/PageLayout'
import PageHeader from './components/common/PageHeader'
import CConfirm from './components/common/CConfirm'
import CIcon from './components/common/CIcon'
import CInp from './components/common/CInp'

Vue.component('PageLayout', PageLayout)
Vue.component('PageHeader', PageHeader)
Vue.component('CConfirm', CConfirm)
Vue.component('CIcon', CIcon)
Vue.component('CInp', CInp)

// 工具
import router from './utils/router'
import * as api from './api'

Vue.prototype.router = router
Vue.prototype.api = api

// 混入
import mixins from './mixins/global'
Vue.mixin(mixins)

// 其他
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  i18n,
  store,
  ...App
})
app.$mount()
