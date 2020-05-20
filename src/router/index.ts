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
    path: '/photo-album/:page',
    name: 'photo-album',
    component: load('photo-album'),
  },
  {
    path: '/photo-album',
    redirect: '/photo-album/1',
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
