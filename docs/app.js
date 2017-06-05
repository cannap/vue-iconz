import Home from './Home'
import Vue from 'vue'
/* eslint-disable no-new */
import VueFuse from 'vue-fuse'

import 'ress'

Vue.use(VueFuse)

new Vue({
  el: '#app',
  ...Home
})
// greg
