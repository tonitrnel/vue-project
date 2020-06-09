import { defineComponent } from '@vue/composition-api'

interface Props {
  msg: string
  header: string
}

export default defineComponent<Props>({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div>
        <h1>Hello World</h1>
        <span>Msg id: {props.msg}</span>
        <span>Header data: {props.header}</span>
      </div>
    )
  },
})
