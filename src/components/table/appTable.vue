<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :rowKey="record=>record.id"
    :pagination="pagination"
    :scroll="scroll"
    :size="size"
    @change="(pagination, filters, sorter)=>{change(pagination, filters, sorter)}"
    bordered
  >
    <!-- <template v-for="(item, idx) in columns" :slot="item.slotName">
      <span :key="idx">{{ this.mWords(item.slotName) }}</span>
    </template> -->
    <!-- <span slot="cusContent" slot-scope="txt">{{ txt }}</span> -->
  </a-table>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    size: {
      type: String
    },
    change: {
      type: Function,
      default() {
        return function() {}
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    scroll: {
      type: Object,
      default() {
        return {}
      }
    },
    pagination: {
      type: Object,
      default() {
        return {}
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {}
}
</script>
