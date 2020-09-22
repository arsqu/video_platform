<template>
  <div id="anchor">
    <div>只能查询最近24小时的记录</div>
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-input
          v-model="orderForm.cname"
          :placeholder="mWords('cname', 's')"
        ></a-input>
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
      :expand="{}"
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
        cname: ''
      },
      columns: [
        {
          title: _ => this.mWords('cname', 't'),
          dataIndex: 'cname'
        },
        {
          title: _ => this.mWords('created_ts', 't'),
          dataIndex: 'created_ts',
          customRender: v => {
            console.log(v)
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        },
        {
          title: _ => this.mWords('destroyed_ts', 't'),
          dataIndex: 'destroyed_ts',
          customRender: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        },
        {
          title: _ => this.mWords('finished', 't'),
          dataIndex: 'finished',
          customRender: v => {
            return this.$t('mapConfig.video.callList.finished')[v]
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
      return this.$t('video.callList.' + map[type] + '.' + key)
    },
    setDefDate() {
      var d = moment().unix()
      var h = 60 * 60
      var origin = {
        startTime: d - 24 * h,
        endTime: d
      }
      var sT = origin.startTime
      var sE = origin.endTime
      return { sT, sE }
    },
    submit(param) {
      var v = {}
      // 查询过去24小时,单位(秒)
      var sDate = this.setDefDate()
      var { sT, sE } = sDate
      v = this.$util.deepClone(this.orderForm)
      v.startTime = sT
      v.endTime = sE
      var formdata = new FormData()
      for (var k in v) {
        formdata.append(k, v[k])
      }
      this.loading = true
      this.$axios
        .postData('video.callList.query', formdata, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          this.loading = false
          console.log(res)
          if (res.code === 200) {
            res.call_lists.map((res, idx) => {
              // table必须有唯一标识符,默认为id
              res.id = idx
            })
            this.tableData = res.call_lists
          } else {
            this.$util.Message('destroy')
            this.$util.Message('error', res.message)
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>
