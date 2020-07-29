<template>
  <div class="stepState mb-3">
    <a-steps :current="getStep">
      <template v-for="(item,idx) in step">
        <a-step v-if="idx<4" :title="item" :key="idx"></a-step>
      </template>
    </a-steps>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      step: []
    }
  },
  computed: {
    ...mapGetters(['getStep'])
  },
  mounted() {
    this.step = this.$t('formList.step')
  }
}
</script>

<style lang="stylus" scoped>
.stepState
  background-color #fff
  padding 20px 40px
  border-radius 8px
  -webkit-box-shadow 0 0 5px 0 #ccc
  box-shadow 0 0 5px 0 #ccc
</style>
