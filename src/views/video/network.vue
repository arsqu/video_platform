<template>
  <div id="anchor">
    <div>只能查询最近一小时的记录</div>
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          mode="multiple"
          style="width: 200px"
          :placeholder="mWords('metric', 's')"
          v-model="orderForm.metric"
          @change="handleChange"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.video.network.metric')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          :loading="loading"
          @click="
            () => {
              this.submit()
            }
          "
        >
          <a-icon type="search"></a-icon>查询
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <!-- x: 1300, -->
    <simpleTable
      class="listView"
      :size="'small'"
      :bordered="false"
      :expand="expand"
      :scroll="{ y: sHet }"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :pagination="{}"
      :change="handleTableChange"
    />
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    this.submit()
  },
  data() {
    return {
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      loading: false,
      sHet: null,
      formData: {},
      pagination: {
        // '2', 测试用
        pageSizeOptions: ['10', '30', '50', '100'],
        showTotal: total => {
          return `Total ${total} items`
        },
        showSizeChanger: true,
        showQuickJumper: true
      },
      mapConfig: {},
      orderForm: {
        startTime: null,
        endTime: null,
        metric: []
      },
      columns: [
        {
          title: _ => this.mWords('videoUpstreamExcellentTransRate', 't'),
          dataIndex: 'videoUpstreamExcellentTransRate'
        },
        {
          title: _ => this.mWords('audioUpstreamExcellentTransRate', 't'),
          dataIndex: 'audioUpstreamExcellentTransRate'
        },
        {
          title: _ => this.mWords('videoEnd2EndExcellentTransRate', 't'),
          dataIndex: 'videoEnd2EndExcellentTransRate'
        },
        {
          title: _ => this.mWords('audioEnd2EndExcellentTransRate', 't'),
          dataIndex: 'audioEnd2EndExcellentTransRate'
        },
        {
          title: _ => this.mWords('ts', 't'),
          dataIndex: 'ts',
          render: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        }
        // {
        //   width: 80,
        //   title: _ => this.$t('tableList.header.operation'),
        //   dataIndex: '',
        //   fixed: 'right',
        //   customRender: (v, d, idx) => {}
        // }
      ]
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current // 当前页
      this.pagination = pager
      this.submit({ page: pagination.current, pageSize: pagination.pageSize })
    },
    mWords(key, type) {
      var map = {
        s: 'searchForm',
        t: 'defTable',
        f: 'defForm'
      }
      return this.$t('video.network.' + map[type] + '.' + key)
    },
    setDefDate() {
      var d = moment().unix()
      var h = 60 * 60
      var origin = {
        startTime: d - h,
        endTime: d
      }
      var sT = origin.startTime
      var sE = origin.endTime
      return { sT, sE }
    },
    submit(param) {
      var v = {}
      var sDate = this.setDefDate()
      var { sT, sE } = sDate
      v = this.$util.deepClone(this.orderForm) // 克隆数据
      v.startTime = sT
      v.endTime = sE
      v.metric = v.metric.toString()
      this.loading = true
      this.$axios
        .postData('video.network.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            this.tableData = data.records
          } else {
            this.$util.Message('error', res.message)
          }
          // console.log(res)
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>
