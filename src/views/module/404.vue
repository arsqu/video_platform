<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="reBack">Back Home</a-button>
    </template>
  </a-result>
</template>

<script>
import util from '@util/util'
export default {
  data() {
    return {
      publicPath: ''
    }
  },
  mounted() {
    this.publicPath = util.getPublicPath()
  },
  methods: {
    reBack() {
      location.href = this.publicPath + 'account.html'
    }
  }
}
</script>

<style>
</style>
