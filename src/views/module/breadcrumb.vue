<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <!-- <router-link :to="{ name: 'index' }">首页</router-link> -->
        首页
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="(item, idx) in breadData"
        :key="idx"
        :href="item.src"
      >
        <template v-if="item.src">
          <!-- <router-link :to="{ name: item.src }">{{ item.name }}</router-link> -->
          {{ item.name }}
        </template>
        <template v-else>{{ item.name }}</template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadData: []
    }
  },
  mounted() {
    this.createBread()
  },
  watch: {
    $route(to, from) {
      this.createBread()
      // this.createTagView()
    }
  },
  methods: {
    // createTagView() {
    //   var route = this.$route
    //   console.log(route)
    //   // var item = e.item
    //   var opt = {
    //     name: route.name,
    //     url: route.path,
    //     closable: true
    //   }
    //   var tags = this.getTags
    //   for (var i = 0; i < tags.length; i++) {
    //     if (tags[i].name === item.$el.innerText) {
    //       this.setCurr(i)
    //       this.$router.push({ path: e.key })
    //       return
    //     }
    //   }
    //   // this.$router.push({ path: e.key })
    //   // this.setTags(opt)
    //   // this.setCurr(tags.length - 1)
    // },
    createBread() {
      var route = this.$route
      if (route.name !== 'index') {
        var arr = [
          {
            name: route.meta.title,
            src: ''
          }
        ]
        arr.push({
          name: route.name,
          src: route.fullPath
        })
        this.breadData = arr
      }
    }
  }
}
</script>
