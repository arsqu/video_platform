<template>
  <!-- defaultOpenKeys -->
  <!-- openKeys(加上.sync后缀将无法控制只显示一个主菜单)与openChange配合使用 -->
  <a-menu
    theme="light"
    mode="inline"
    :selectedKeys="this.$route.path"
    :openKeys="defaultOpenKeys"
    @select="handleSelect"
    @openChange="onOpenChange"
  >
    <template v-for="item in list">
      <!-- 点击菜单直接跳转 -->
      <a-menu-item
        v-if="!item.children"
        :key="item.url + '.html'"
        :title="item.title"
      >
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <!-- 父级菜单 -->
      <sub-menu v-else :key="item.id" :menu-info="item" />
    </template>
  </a-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Menu } from 'ant-design-vue'
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.url" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon v-if="menuInfo.icon" :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="(item.url + '.html')" :title="item.title">
            <span>{{item.title}}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.id + '.html'" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
export default {
  components: {
    'sub-menu': SubMenu
  },
  computed: {
    ...mapGetters(['getMenu', 'getTags', 'getBread'])
  },
  data() {
    return {
      defaultOpenKeys: [],
      list: []
    }
  },
  created() {},
  mounted() {
    this.list = localStorage.getItem('menuList')
    this.list = typeof this.list === 'string' ? JSON.parse(this.list) : []
    var b = this.l(this.list, this.$route.path)
    b && (this.defaultOpenKeys = b)
  },
  props: {},
  methods: {
    ...mapActions(['setCurr', 'setTags']),
    onOpenChange(openKeys) {
      // console.log(openKeys)
      const latestOpenKey = openKeys.find(
        key => this.defaultOpenKeys.indexOf(key) === -1
      )
      // console.log(latestOpenKey, openKeys)
      // const rootSubmenuKeys = ['1.html', '2.html', '3.html', '4.html', '5.html']
      // 根目录下没找到则不变
      // if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      //   this.defaultOpenKeys = openKeys
      // } else {
      this.defaultOpenKeys = latestOpenKey ? [latestOpenKey] : []
      // }
    },
    l(arr, txt) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].url + '.html' === txt) {
          return []
        }
        if (arr[i].children) {
          var b = this.l(arr[i].children, txt)
          if (b) {
            b.unshift(arr[i].id)
            return b
          }
        }
      }
    },
    handleSelect(e) {
      var item = e.item
      var opt = {
        name: item.title,
        url: e.key,
        closable: true
      }
      var tags = this.getTags
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].name === item.$el.innerText) {
          this.setCurr(i)
          this.$router.push({ path: e.key })
          return
        }
      }
      this.$router.push({ path: e.key })
      this.setTags(opt)
      this.setCurr(tags.length - 1)
    }
  }
}
</script>
