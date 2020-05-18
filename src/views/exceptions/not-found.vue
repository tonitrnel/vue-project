<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <p class="link">
      <router-link to="/">home</router-link>
      <a href="javascript:history.back()">back</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'not-found',
}
</script>

<style scoped lang="less">
.not-found {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 16px;
  }
  .link a {
    padding: 0 10px;
  }
}
</style>
