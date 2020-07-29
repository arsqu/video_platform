<template>
  <div class="site-description-item-profile-wrapper">
    <p class="site-description-item-profile-p-label">
      <slot name="title">{{title}}</slot>
      <template v-if="colon">:</template>
    </p>
    <slot name="content">{{content}}</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    colon: {
      type: Boolean,
      default() {
        return true
      }
    },
    title: String,
    content: String
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.site-description-item-profile-wrapper
  margin-bottom 7px
  color rgba(0, 0, 0, .65)
  font-size 14px
  line-height 1.5715
.site-description-item-profile-p-label
  display inline-block
  margin-right 8px
  color rgba(0, 0, 0, .85)
</style>
