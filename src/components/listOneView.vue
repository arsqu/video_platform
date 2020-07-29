<template>
  <a-list
    class="cus_list"
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="listData"
  >
    <!-- ,index -->
    <!-- slot="extra" -->
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
      <img
        width="252"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
      <template slot="extra">
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.href">{{ item.title }}</a>
        </a-list-item-meta>
        {{ item.content }}
        <div class="mt-1 text-right">
          <a-button class="text-right" type="primary" size="large">重新提交</a-button>
        </div>
      </template>
    </a-list-item>
    <!-- <div slot="footer">
                您的
                <b>应用列表</b>
    </div>-->
  </a-list>
</template>

<script>
const listData = []
for (let i = 0; i < 8; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      }
    }
  }
}
</script>

<style>
</style>
