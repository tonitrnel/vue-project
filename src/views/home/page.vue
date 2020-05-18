<template>
  <div class="home">
    <router-link to="/photo-album">相片集</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'home',
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
