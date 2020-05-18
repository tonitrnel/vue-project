<template>
  <svg :class="['icon', customClass]">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      required: true,
      type: String,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
  },
})
</script>

<style scoped lang="less">
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
