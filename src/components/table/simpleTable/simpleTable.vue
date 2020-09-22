<template>
  <!-- slot-scope="record" -->
  <a-table
    :columns="columns"
    :data-source="tableData"
    :rowKey="record => record.id"
    :pagination="pagination"
    :scroll="expand.table ? {} : scroll"
    :loading="loading"
    :size="size"
    @change="
      (pagination, filters, sorter) => {
        change(pagination, filters, sorter)
      }
    "
    :bordered="bordered"
  >
    <template v-if="expand.table">
      <a-table
        slot-scope="record"
        slot="expandedRowRender"
        :columns="expand.table.columns"
        :data-source="record[expand.table.childKey] || []"
        :rowKey="record => record.id"
        :pagination="false"
      ></a-table>
    </template>
  </a-table>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    expand: {
      type: String,
      default() {
        return false
      }
    },
    loading: {
      type: String,
      default() {
        return false
      }
    },
    bordered: {
      type: String,
      default() {
        return true
      }
    },
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
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus" scoped></style>
