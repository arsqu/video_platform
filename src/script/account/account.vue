<template>
  <a-config-provider :locale="locale">
    <div id="account">
      <router-view />
      <cusFooter />
    </div>
  </a-config-provider>
</template>

<script>
import cusFooter from '@views/module/footer'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLang']),
    locale: function() {
      return this.$antModuleLocale[this.getLang]
    }
  },
  data() {
    return {}
  },
  created() {},
  components: { cusFooter },
  mounted() {},
  methods: {
    ...mapActions(['setShowStep'])
  },
  watch: {
    $route(to, from) {
      var type = to.query.type
      console.log(type)
      if (type !== null && type !== undefined) {
        this.setShowStep(type)
      } else {
        this.setShowStep('hide')
      }
    }
  }
}
</script>
