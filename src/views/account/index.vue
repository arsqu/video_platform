<template>
  <div id="userCent">
    <userHead />
    <div class="section">
      <router-view />
    </div>
  </div>
</template>
<script>
import userHead from '@views/module/userHead'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUname'])
  },
  components: {
    userHead
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
body
  background #F5F7FA
</style>

<style lang="stylus" scoped>
#userCent
  .section
    // max-width 1080px
    max-width 1180px
    margin 0 auto
    padding 72px 0 35px
    position relative
</style>
