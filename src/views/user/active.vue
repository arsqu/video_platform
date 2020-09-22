<template>
  <div id="anchor">
    <!-- x: 1300, -->
    <simpleTable
      class="listView"
      :size="'small'"
      :bordered="false"
      :scroll="{ y: sHet }"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :pagination="pagination"
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
        // condition: {
        //   timeName: 'registerDate',
        //   orderBy: 'registerDate',
        //   asc: '0',
        //   startTime: null,
        //   endTime: null,
        //   condition: {
        //     utype: undefined
        //   }
        // }
      },
      columns: [
        {
          title: _ => this.mWords('currentActiveNum', 't'),
          dataIndex: 'currentActiveNum'
        },
        {
          title: _ => this.mWords('yesterdayActiveNum', 't'),
          dataIndex: 'yesterdayActiveNum'
        },
        {
          title: _ => this.mWords('firstMonthNum', 't'),
          dataIndex: 'firstMonthNum'
        },
        {
          title: _ => this.mWords('currentMonthActiveNum', 't'),
          dataIndex: 'currentMonthActiveNum'
        }
        // {
        //   width: 150,
        //   title: _ => this.mWords('registerDate', 't'),
        //   dataIndex: 'registerDate',
        //   customRender: v => {
        //     return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
        //   }
        // }
      ]
    }
  },
  methods: {
    createEl(v) {
      v = v ? v.split(',') : []
      return v.map(item => {
        return (
          <div class="over_ellipsis" title={item}>
            <a target="_blank" href={item}>
              {item}
            </a>
          </div>
        )
      })
    },
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
      return this.$t('user.active.' + map[type] + '.' + key)
    },
    loopMap(o, v) {
      for (var k in v) {
        if (v[k]) {
          if (Object.prototype.toString.call(v[k]) === '[object Object]') {
            o[k] = o[k] || {}
            this.loopMap(o[k], v[k])
          } else if (typeof v[k] !== 'object') {
            o[k] = v[k]
          }
        } else if (!v[k] && typeof v[k] !== 'number') {
          continue
        }
      }
      return o
    },
    setDefDate() {
      var origin = this.orderForm.condition
      var sT = origin.startTime
      var sE = origin.endTime
      if (!sT && !sE) {
        sT = moment().startOf('day')
        sE = moment().endOf('day')
      } else if (!sT && sE) {
        // 只有结束时间
        sT = moment(sE).startOf('day')
      } else if (sT && !sE) {
        // 只有开始时间
        sE = moment(sT).endOf('day')
      } else {
      }
      origin.startTime = sT
      origin.endTime = sE
      return { sT, sE }
    },
    submit(param) {
      var v = {}
      // 默认时间
      //   var sDate = this.setDefDate()
      //   var { sT, sE } = sDate
      v = JSON.parse(JSON.stringify(this.orderForm)) // 克隆数据
      //   v.condition.startTime = sT.valueOf()
      //   v.condition.endTime = sE.valueOf()
      v = this.loopMap({}, v) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('user.active.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            data.id = parseInt(Math.random() * 10000)
            this.tableData = [data]
            // var pagination = { ...this.pagination }
            // pagination.total = data.total
            // pagination.pageSize = data.size
            // this.tableData = data.records
            // if (!param) {
            //   pagination.current = 1
            // }
            // this.pagination = pagination
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
