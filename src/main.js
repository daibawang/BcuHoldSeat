import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import request from './utils/request.js'
import mixin from './mixins/util.js'
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$proxy = request;
Vue.prototype.$store = store;
Vue.mixin(mixin)
const app = new Vue({
  mpType: 'app',
  ...App
})
app.$mount()
