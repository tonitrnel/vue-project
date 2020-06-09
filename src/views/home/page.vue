<template>
  <div class="home">
    <router-link
      style="display: block; padding: 10px 0;"
      v-for="item in links"
      :key="item.link"
      :to="item.link"
    >
      {{ item.name }}
    </router-link>
    <router-link to="/tsx"></router-link>
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/composition-api'
export default {
  name: 'home',
  data() {
    return {
      links: [
        {
          link: '/photo-album',
          name: '相片集',
        },
        {
          link: '/tsx',
          name: 'Vue Composition + TSX测试',
        },
        {
          link: '/graphql-example',
          name: 'GraphQL Example',
        },
      ],
    }
  },
  created() {
    document.title = '根目录'
  },
}
</script>

<style scoped lang="less">
.home {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
}
</style>
