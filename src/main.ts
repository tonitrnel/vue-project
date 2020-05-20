import Vue from 'vue'
import App from './views/app.vue'
import router from './router'
import '~/components/global/svg-icon'
import CompositionAPI from '@vue/composition-api'

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})

Vue.use(CompositionAPI)
