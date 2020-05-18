import Vue from 'vue'
import App from './views/app.vue'
import router from './router'
import '~/components/global/svg-icon'

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})
