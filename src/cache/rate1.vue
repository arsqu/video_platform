<template>
  <div id="rate">
    <h2 class="text-left">{{$t('account.navbar[3]')}}</h2>
    <simpleTable
      class="listView mt-1"
      :columns="columns"
      :size="'small'"
      :tableData="tableData"
      :pagination="pagination"
      :change="(pagination, filters, sorter)=>{handleTableChange(pagination, filters, sorter,'in')}"
    />
    <!-- :style="{height:autoHet}" -->
    <!-- <a-row :gutter="[12,12]">
      <a-col :md="12">
        <h2 class="text-left">{{$t('account.navbar[3]')}}</h2>
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
        <simpleTable
          class="listView mt-1"
          :columns="outColumns"
          :size="'small'"
          :tableData="out_tableData"
          :pagination="out_pagination"
          :change="(pagination, filters, sorter)=>{handleTableChange(pagination, filters, sorter,'out')}"
        />
      </a-col>
    </a-row>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  created() {},
  mounted() {
    var list = ['in', 'out']
    // 数据结果集合
    this.getDatas(list).then(res => {
      console.log(res)
      var data = res.data
      var pagination = { ...this.pagination }
      pagination.total = data.total
      pagination.pageSize = data.size
      this.pagination = pagination
      console.log(pagination)
      this.tableData = data.records
    })
    // this.queryData(null, 'in')
    // this.queryData(null, 'out')
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
          dataIndex: 'amount'
        },
        {
          title: _ => this.mWords('handFee'),
          dataIndex: 'handFee'
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
          title: _ => this.mWords('edAd'),
          dataIndex: 'edAd',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD h:mm:ss')
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
          title: _ => this.mWords('amount'),
          dataIndex: 'amount'
        },
        {
          title: _ => this.mWords('handFee'),
          dataIndex: 'handFee'
        },
        {
          title: _ => this.mWords('totalAmount'),
          dataIndex: 'totalAmount'
        },
        {
          title: _ => this.mWords('totalSetAmount'),
          dataIndex: 'totalSetAmount'
        },
        // ,
        // {
        //   width: 130,
        //   title: _ => this.mWords('beAd'),
        //   dataIndex: 'beAd',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD')
        //   }
        // },
        {
          title: _ => this.mWords('edAd'),
          dataIndex: 'edAd',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD h:mm:ss')
          }
        }
        // ,
        // {
        //   width: 130,
        //   title: _ => this.mWords('ad'),
        //   dataIndex: 'ad',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD')
        //   }
        // }
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
    // 请求数据
    getDetl(param, k) {
      return new Promise((resolve, reject) => {
        var pageParam = param || this.pageParam
        this.$axios
          .postData('account.currency.query.' + k, pageParam)
          .then(res => {
            if (res.code === 200) {
              resolve(res.data)
            } else {
              resolve('')
            }
          })
      })
    },
    getDatas(arr) {
      var promises = arr.map(item => this.getDetl(null, item))
      return Promise.all(promises)
        .then(res => {
          var arr = [] // 不为空的数据
          res.map((v, index) => {
            if (!v.records.length === 0) {
              console.log('第' + (index + 1) + '个接口空数据')
            } else {
              arr.push(v.records)
            }
          })
          var newArr = []
          var opt = {
            current: res[0] ? res[0].current : res[1] ? res[1].current : 1,
            pages: res[0] ? res[0].pages : res[1] ? res[1].pages : 1,
            size: res[0] ? res[0].size : res[1] ? res[1].size : 10,
            total: res[0] ? res[0].total : res[1] ? res[1].total : 0
          }
          for (var x = 0; x < arr[0].length; x++) {
            for (var y = 0; y < arr[1].length; y++) {
              if (
                arr[0][x].appId === arr[1][y].appId &&
                arr[0][x].currency === arr[1][y].currency
              ) {
                var item = JSON.parse(JSON.stringify(arr[0][x]))
                item.amount = arr[1][y].amount
                item.handFee = arr[1][y].handFee
                newArr.push(item)
              }
            }
          }
          opt.records = newArr
          console.log(res)
          console.log(newArr)
          // res.records = newArr
          return { data: opt }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询数据
    queryData(param, k) {
      var pageParam = param || this.pageParam
      this.$axios
        .postData('account.currency.query.' + k, pageParam)
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.listView >>> .ant-table
  overflow auto
</style>
