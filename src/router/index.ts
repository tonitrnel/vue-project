import Vue from 'vue'
import VueRouter, { RouteConfig as Config } from 'vue-router'

Vue.use(VueRouter)

function loadVueFile(dir: string, component = 'page') {
  return (): Promise<typeof import('*.vue')> =>
    import(`~/views/${dir}/${component}.vue`)
}
function loadVTSXFile(dir: string, component = 'page') {
  return (): Promise<typeof import('')> =>
    import(`~/views/${dir}/${component}.tsx`)
}

const routes: Config[] = [
  {
    path: '/',
    name: 'home',
    component: loadVueFile('home'),
  },
  {
    path: '/tsx',
    name: 'tsx',
    component: loadVTSXFile('tsx'),
  },
  {
    path: '/photo-album/:page',
    name: 'photo-album',
    component: loadVueFile('photo-album'),
  },
  {
    path: '/photo-album',
    redirect: '/photo-album/1',
  },
  {
    path: '*',
    name: 'not-found',
    component: loadVueFile('exceptions', 'not-found'),
  },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
