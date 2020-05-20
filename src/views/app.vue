<template>
  <main id="app">
    <router-view />
  </main>
</template>
<style lang="less">
@import '~assets/styles/initial';
@import '~assets/styles/variables';
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Josefin Sans', 'Sarasa Mono T SC', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  .variables();
}
</style>
