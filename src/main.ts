import Vue from 'vue'
import '~/components/global/svg-icon'
import CompositionAPI from '@vue/composition-api'
import App from './views/tsx/page'
import router from './router'

Vue.use(CompositionAPI)
new Vue({
  el: '#app',
  router,
  errorCaptured(v) {
    const stack = v.stack
      ?.replace(/(.+)/g, '<code style="padding: 4px 0">$1</code>')
      .replace(
        /at ([\w._]+)/g,
        'at <span style="color: #8c2bcc; font-weight: bold">$1</span>'
      )
      .replace(
        /\/\/\/\.([@./\-_\w]+)/g,
        '<span style="color: #f0a446">///.$1</span>'
      )
      .replace(
        /:(\d+):(\d+)/g,
        ':<span style="color: #379ced">$1</span>:<span style="color: #6081ed">$2</span>'
      )
    document.documentElement.innerHTML = `
      <h2>全局错误</h2>
      <p>未处理的全局错误将导致整个应用崩溃</p>
      <pre>${stack}</pre>
    `
  },
  render: (h) => h(App),
})
