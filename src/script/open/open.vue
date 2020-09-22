<template>
  <!-- <a-config-provider :locale="locale"> -->
  <div id="open">
    <router-view />
    <cusFooter />
  </div>
  <!-- </a-config-provider> -->
</template>

<script>
import cusFooter from '@views/module/footer'
// import { mapGetters } from 'vuex'

export default {
  computed: {
    // ...mapGetters(['getLang']),
    // locale: function() {
    //   return this.$antModuleLocale[this.getLang]
    // }
  },
  data() {
    return {}
  },
  created() {
    // this.locale = this.$antModuleLocale[this.getLang]
  },
  components: { cusFooter },
  mounted() {},
  methods: {}
}
</script>
