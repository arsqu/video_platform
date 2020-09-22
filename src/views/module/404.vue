<template>
  <div>
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <a-button type="primary" @click="reBack">Back Home</a-button>
      </template>
    </a-result>
  </div>
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
    console.log(this.$route)
    this.publicPath = util.getPublicPath()
  },
  methods: {
    reBack() {
      location.href = this.publicPath + 'index.html'
    }
  }
}
</script>

<style></style>
