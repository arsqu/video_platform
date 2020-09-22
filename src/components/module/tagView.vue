<template>
  <div class="tagView">
    <a-tag
      size="medium"
      v-for="(item, idx) in tags"
      :class="{ active: getCurr == idx }"
      :key="idx"
      :type="item.type"
      :closable="item.closable"
      @click.native="handleClick(item, idx)"
      @close="
        preventDefault => {
          handleClose(preventDefault, idx)
        }
      "
      >{{ item.name }}</a-tag
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tagView',
  data() {
    return {
      tags: []
    }
  },
  computed: {
    ...mapGetters(['getTags', 'getCurr'])
  },
  create() {},
  mounted() {
    this.tags = this.getTags
    this.checkTags()
  },
  methods: {
    ...mapActions(['setTags', 'delTag', 'setCurr']),
    // 默认选中tag
    checkTags() {
      var route = this.$route
      var opt = {
        name: route.meta.title || route.name || '',
        url: route.path,
        closable: true
      }
      this.setTags(opt)
      this.setCurr(0)
    },
    // 选中标签
    handleClick(item, idx) {
      if (idx < 0 || item.url === this.$route.path) return
      this.setCurr(idx)
      if (item.url) {
        this.$router.push({ path: item.url })
      }
    },
    // 关闭标签
    handleClose(e, idx) {
      e.preventDefault()
      var tags = this.getTags
      if (tags.length === 1) {
        return
      }
      // 最后一个
      if (idx === tags.length - 1) {
        this.delTag(idx)
        idx--
        this.handleClick(tags[idx], idx)
        return
      }
      this.delTag(idx)
      this.handleClick(tags[idx], idx)
    }
  }
  // watch: {
  //   $route: {
  //     handler(to, from) {
  //       this.checkTags()
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
/* 全局样式 */
.ant-tag
  background #fff
  margin-bottom 5px
  margin-right 5px
  color #666
  border-color #ddd
  cursor pointer
  line-height 27px
  height 27px
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  user-select none
  &:hover
    opacity 1
  &.active
    background #256BFF
    // background #409eff
    color #fff
    &:before
      background #fff
      width 8px
      height 8px
      content ''
      display inline-block
      border-radius 50%
      margin-right 5px

.tagView
  & >>> .ant-tag.active .anticon-close
    color #fff
    border-radius 50%
  & >>> .anticon-close:hover
    background-color #88919c
    color #fff
</style>
