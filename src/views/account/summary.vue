<template>
  <div id="rate">
    <!-- :style="{height:autoHet}" -->
    <a-row :gutter="[12,12]">
      <a-col :md="12">
        <h2 class="text-center">{{$t('tableList.rateTable.insummary')}}</h2>
        <!-- :scroll="{y: autoHet }" -->
        <!-- :style="{height:autoHet + 'px'}" -->
        <simpleTable
          class="listView mt-1"
          :columns="columns"
          :size="'small'"
          :tableData="tableData"
          :pagination="pagination"
          :change="(pagination, filters, sorter)=>{handleTableChange(pagination, filters, sorter,'in')}"
        />
      </a-col>
      <a-col :md="12">
        <h2 class="text-center">{{$t('tableList.rateTable.outsummary')}}</h2>
        <!-- :scroll="{ y: autoHet }" -->
        <!-- :style="{height:autoHet + 'px'}" -->
        <simpleTable
          class="listView mt-1"
          :columns="outColumns"
          :size="'small'"
          :tableData="out_tableData"
          :pagination="out_pagination"
          :change="(pagination, filters, sorter)=>{handleTableChange(pagination, filters, sorter,'out')}"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.queryData(null, 'in')
    this.queryData(null, 'out')
    this.calcHet() // 计算表格高度
  },
  data() {
    return {
      autoHet: '',
      loading: false,
      out_tableData: [],
      out_pagination: {
        showSizeChanger: true
      },
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 20
      },
      pagination: {
        showSizeChanger: true
      },
      mapConfig: {},
      orderForm: {},
      outColumns: [
        // {
        //   title: _ => this.mWords('appName'),
        //   dataIndex: 'appName'
        // },
        {
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('currency'),
          dataIndex: 'currency'
        },
        {
          title: _ => this.mWords('amount'),
          dataIndex: 'amount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        {
          title: _ => this.mWords('handFee'),
          dataIndex: 'handFee',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        // {
        //   width: 130,
        //   title: _ => this.mWords('beAd'),
        //   dataIndex: 'beAd',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD')
        //   }
        // },
        {
          width: 150,
          title: _ => this.mWords('edAd'),
          dataIndex: 'edAd',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        }
        // ,{
        //   width: 130,
        //   title: _ => this.mWords('ad'),
        //   dataIndex: 'ad',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD')
        //   }
        // }
      ],
      columns: [
        // {
        //   title: _ => this.mWords('appName'),
        //   dataIndex: 'appName'
        // },
        {
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('currency'),
          dataIndex: 'currency'
        },
        {
          title: _ => this.mWords('totalAmount'),
          dataIndex: 'totalAmount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        {
          title: _ => this.mWords('totalSetAmount'),
          dataIndex: 'totalSetAmount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        {
          width: 150,
          title: _ => this.mWords('edAd'),
          dataIndex: 'edAd',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        }
      ]
    }
  },
  methods: {
    // 默认只读第一次
    calcHet() {
      this.$nextTick(_ => {
        var het =
          document.body.clientHeight -
          document.querySelector('.csfooter').clientHeight -
          document.querySelector('#rate').offsetTop -
          130 // 剩余元素高度
        // this.autoHet = het
        var tables = document.querySelectorAll('.listView .ant-table')
        tables = Array.prototype.slice.call(tables)
        tables.map(res => {
          res.style.height = het + 'px'
        })
      })
    },
    handleTableChange(pagination, filters, sorter, key) {
      var cPage
      if (key === 'in') {
        cPage = ''
      } else {
        cPage = key + '_'
      }
      const pager = { ...this[cPage + 'pagination'] }
      pager.current = pagination.current
      this[cPage + 'pagination'] = pager
      this.queryData(
        {
          page: pagination.current,
          pageSize: pagination.pageSize
        },
        key
      )
    },
    queryData(param, k) {
      var pageParam = param || this.pageParam
      this.$axios
        .postData('account.summary.query.' + k, pageParam)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            var cPage
            var data = res.data
            cPage = k === 'in' ? '' : k + '_'
            var pagination = { ...this[cPage + 'pagination'] }
            pagination.total = data.total
            pagination.pageSize = data.size
            this[cPage + 'pagination'] = pagination
            console.log(pagination)
            this[cPage + 'tableData'] = data.records
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    mWords(key, text) {
      return this.$t('tableList.rateTable.' + key)
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>

<style lang="stylus" scoped>
.listView >>> .ant-table
  overflow auto
</style>
