<template>
  <div class="wrapper">
  
    <button class="toggleSidebar sidebar-toggle"
      @click="isSidebar = true">
      <component is="oct-three-bars" />
    </button>
  
    <div class="loading"
      v-show="loading">
      <spinner></spinner>
    </div>
    <div class="sidebar"
      v-show="isSidebar">
      <button class="close-sidebar"
        @click="isSidebar = false">
        <component is="ion-android-close" />
      </button>
  
      <div class="">
        <div class="search">
  
          <input type="text"
            v-model="search"
            class="search-field">
        </div>
  
        <ul class="menu">
  
          <li v-for="set in iconSets"
            :class="{active: currentSet===set.path}">
            <a href=""
              @click.prevent="currentSet = set.path">{{set.name}}</a>
          </li>
        </ul>
  
        <div class="badgets">
          <!-- Place this tag where you want the button to render. -->
          <a class="github-button"
            href="https://github.com/cannap/vue-iconz"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star cannap/vue-iconz on GitHub">Star</a>
        </div>
      </div>
    </div>
    <section class="icons-container">
  
      <div class="container">
        <div class="icons">
          <div class="icon"
            v-for="icon in icons">
  
            <div v-ripple="'rgba(245, 245, 245, .5)'"
              class="icon-inner">
              <component :is="icon.name" /> {{icon.name}}
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
import Fuse from 'fuse.js'
import * as ion from '../dist/ion'
var kebabCase = require('kebab-case')
import axios from 'axios'
import { omit } from 'underscore'
export default {
  name: 'Home',
  data () {
    return {
      fuse: null,
      size: 40,
      counter,
      icons: [],
      search: '',
      loading: false,
      backupIcons: [],
      currentSet: 'oct',
      isSidebar: false,
      setInfo: false,
      keys: ['tags'],
      iconSets: [
        {
          name: 'Ionicons',
          path: 'ion'

        },
        {
          name: 'Octicons',
          path: 'oct'

        }, {
          name: 'Material Design',
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
        this.backupIcons = res.data.set
        this.fuse = new Fuse(this.icons, {
          keys: this.keys
        })

         if(this.search.length > 0) {
          this.icons = this.fuse.search(this.search)
         }
      })
    }
  },
  watch: {
    currentSet () {
      this.loadIcons()
    },
    search (newVal, old) {
      if (newVal.length === 0) {
        console.log('reset icons')
        this.icons = this.backupIcons
      } else {
        this.icons = this.fuse.search(newVal)
      }
    }
  },
  created () {
    this.loadIcons() 
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
  padding-top: 120px;
}

.container {
  margin: 0 auto;
  max-width: 800px;
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
  z-index: 99999;
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
      position: relative;
      z-index: 9;
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



.menu {

  list-style-type: none;
  align-content: center;
  margin-top: 20px;
  li {
    margin-right: 20px;

    margin-bottom: 10px;
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
  /* position: fixed;
  top: 20px;
  right: 20px;*/
  margin-top: 20px;
}



.sidebar {

  padding-top: 60px;
  width: 220px;
  position: fixed;
  height: 100%;
  z-index: 12;
  background: white;
  top: 0;
  text-align: center;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12);
}

.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
}

.close-sidebar {
  margin-bottom: 20px;
}
</style>
