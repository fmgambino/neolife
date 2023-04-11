<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import dayjs from 'dayjs';
import 'dayjs/locale/es';
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs
    }
  }
})
Vue.use(Vuelidate)
export default {
  name: 'App'
}
</script>
