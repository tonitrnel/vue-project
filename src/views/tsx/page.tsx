import { defineComponent, ref } from '@vue/composition-api'
import styles from './page.module.less'
import './page.less'
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
      <div id="main" class={styles.wrap} pir="2585">
        <HelloWorld msg="k2d-9416330" header="779142" header2="2441" />
        <p>{val.value}</p>
        <button onClick={onClick}>click me</button>
      </div>
    )
  },
})
