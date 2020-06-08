import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <template>
        <h1>Hello World</h1>
        <span>head: {props.header}</span>
      </template>
    )
  },
})
