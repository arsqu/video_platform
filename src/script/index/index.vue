<template>
  <!-- <a-locale-provider :locale="locale"> -->
  <div id="main">
    <router-link to="/">Home</router-link>|
    <router-link to="/about.html">About</router-link>|
    <router-link to="/test.html">test</router-link>
    <router-view />
  </div>
  <!-- </a-locale-provider> -->
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    // location.href = this.$util.getPublicPath() + 'login.html'
  },
  methods: {}
}
</script>

<style lang="stylus">
#main
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
