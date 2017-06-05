<template>
  <div class="wrapper">
  
    <div class="badgets">
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button"
        href="https://github.com/cannap/vue-iconz"
        data-icon="octicon-star"
        data-show-count="true"
        aria-label="Star cannap/vue-iconz on GitHub">Star</a>
    </div>
    <div class="loading"
      v-show="loading">
      <spinner></spinner>
    </div>
  
    <header class="container header">
      <div class="header-inner">
        <div class="search">
  
          <vue-fuse class="search-field"
            v-if="icons"
            :keys="keys"
            placeholder="search"
            :list="icons"
            eventName="bikesChanged"></vue-fuse>
  
        </div>
  
        <ul class="menu">
  
          <li v-for="set in iconSets"
            :class="{active: currentSet===set.path}">
            <a href=""
              @click.prevent="currentSet = set.path">{{set.name}}</a>
          </li>
        </ul>
  
      </div>
    </header>
    <section class=" icons-container">
  
      <div class="container">
  
        <div class="icons">
          <div class="icon"
            v-for="icon in icons"
            v-if="icons">
  
            <div class="icon-inner">
              <component :is="icon.name" />
            </div>
  
          </div>
        </div>
      </div>
    </section>
  
  </div>
</template>
<script>

import Spinner from 'vue-simple-spinner'
import counter from './iconCount'
import * as mdi from '../dist/mdi'
import * as ti from '../dist/ti'
import * as oct from '../dist/oct'
//import * as fa from '../dist/fa'
import * as ion from '../dist/ion'
var kebabCase = require('kebab-case')
import axios from 'axios'
import { omit } from 'underscore'
export default {
  name: 'Home',
  data () {
    return {
      size: 40,
      counter,
      icons: false,
      loading: false,
      currentSet: 'oct',
      setInfo: false,
      keys: ['tags', 'name'],
      iconSets: [
        {
          name: 'Ionicons',
          path: 'ion',

        },
        {
          name: 'Octicons',
          path: 'oct',

        }, {
          name: 'Material Design Icnons',
          path: 'mdi',
        }, {
          name: 'Typicons',
          path: 'ti'
        }
      ],
    }
  },
  //
  methods: {

    getImport (iconName) {

      var iconFile = kebabCase(iconName)
      var folder = iconFile.split('-')[0]

      return `import ${iconName} from 'vue-iconz/${folder}/${iconFile}'`
    },

    loadIcons () {

      this.loading = true
      axios.get(`/data/${this.currentSet}.json`).then(res => {
        this.icons = res.data.set
        this.loading = false
      })
    }
  },
  watch: {
    currentSet () {
      this.loadIcons()
    }

  },
  created () {


    this.loadIcons()
    this.$on('bikesChanged', results => {
      this.icons = results
    })
  },

  components: {
    ...mdi,
    ...ion,
    ...oct,
    ...ti,
    Spinner
  }
}
</script>

<style lang="scss">
//
body {
  font-family: 'Roboto', sans-serif;
  background: white;
  color: black;
  padding-top: 45px;
}

.container {
  margin: 0 auto;
  max-width: 1200px;
}

.loading {
  height: 40px;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 40px;
  background: white;
  top: 0;
  left: 0;
}



.icons {
  display: flex;
  flex-wrap: wrap;
  .icon {

    width: 33.33333333%;
    display: flex;
    margin-bottom: 30px;

    padding: 20px;
    flex-direction: row;


    .icon-inner {

      width: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
      display: flex;
      overflow: hidden;
      border: 2px solid #F5F5F5;
      height: 170px;
      border-radius: 4px;
    }
  }
}


.search-field {
  padding: 4px 6px;
  width: 175px;
  border: 0;
  border-radius: 4px;
  background: #F5F5F5;

  font-size: 14px;
}

.search {
  padding: 0 20px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.menu {
  display: flex;
  list-style-type: none;

  li {
    margin-right: 20px;


    &.active {
      a {
        font-weight: 700;
      }
    }
  }
}

a {
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.badgets {
  position: fixed;
  top: 20px;
  right: 20px;
}

.header {
  position: fixed;
  top: 0;
  width:100%;
  right:0;
  background:white;
}
</style>
