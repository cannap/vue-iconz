import Home from './Home'
import Vue from 'vue'
/* eslint-disable no-new */
import VueFuse from 'vue-fuse'
import Ripple from 'vue-ripple-directive'

import 'ress'
Vue.directive('ripple', Ripple)

new Vue({
  el: '#app',
  ...Home
})
// greg
