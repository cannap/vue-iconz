<template>
  <div class="container">
  
    <h2>Font Awesome</h2>
    <div class="icons">
      <div class="icon"
        v-for="icon in mdi"
        v-once>
  
        <component :is="icon"
          :height="50"
          :width="50" /> {{icon}}
  
      </div>
  
    </div>
  
  </div>
</template>
<script>


import * as mdi from '../dist/mdi'
//import * as fa from '../dist/fa'
//import * as ion from '../dist/ion'
var kebabCase = require('kebab-case')

export default {

  name: 'Home',
  computed: {
    mdi () {
      return Object.keys(mdi).map((key) => {
        return kebabCase(key)
      })
    }
  },

  data () {
    return {
      size: 512
    }
  },
  components: {
    ...mdi
  }
}
</script>

<style lang="scss">
.align {

  height: 24px;
  width: 24px;
}
</style>
