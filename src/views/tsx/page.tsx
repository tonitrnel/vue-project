import { defineComponent, ref } from '@vue/composition-api'
// import styles from './mod.less'
import styles from './page.less'
import HelloWorld from './components/hello-world'

export default defineComponent({
  name: 'App',
  setup() {
    const val = ref(0)
    const onClick = (): void => {
      console.log('+1')
      val.value++
    }
    console.log(JSON.stringify(styles))
    return () => (
      <div id="main" pir="2585">
        <HelloWorld header="k529416330" />
        <p>{val.value}</p>
        <button onClick={onClick}>click me</button>
      </div>
    )
  },
})
