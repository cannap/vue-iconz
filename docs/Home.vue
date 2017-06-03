<template>
  <div class="class">
   <div v-for="icon in icons">

   </div>
  </div>
</template>
<script>




import Icon from '../dist/ti/world.js'
import icons from './icons.json'

export default {
  name: 'Home',
  data() {
    return {
      icons
    }
  },
  components: {
    Icon,
   
  }
}
</script>

<style>
svg {
  vertical-align: middle;
  display: inline-block;
}
</style>
