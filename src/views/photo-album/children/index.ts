import { Vue } from 'vue/types/vue'

type Page = { path: string }
const pages = require.context('./', false, /\.vue$/).keys()

interface ChildrenModule {
  default: Vue
}

function loader(module: string): Promise<ChildrenModule> {
  return import(`./${module}.vue`)
}

export async function load(id: string): Promise<Vue> {
  if (pages.includes(`./${id}.vue`)) {
    return (await loader(id)).default
  } else {
    return (await loader('empty')).default
  }
}
