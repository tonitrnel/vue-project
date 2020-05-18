import Vue from 'vue'
import VueRouter, { RouteConfig as Config } from 'vue-router'

Vue.use(VueRouter)

function load(dir: string, component = 'page') {
  return (): Promise<typeof import('*.vue')> =>
    import(`~/views/${dir}/${component}.vue`)
}

const routes: Config[] = [
  {
    path: '/',
    name: 'home',
    component: load('home'),
  },
  {
    path: '*',
    name: 'not-found',
    component: load('exceptions', 'not-found'),
  },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
