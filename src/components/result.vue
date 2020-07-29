<template>
  <div class="infoResult">
    <a-result>
      <template #title>{{getResult}}</template>
      <template #extra>
        <a-button type="primary" @click="backHome">{{$t('components.result.btnTxt')}}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getResult'])
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    backHome() {
      this.$router.push({ name: 'accMain' })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
