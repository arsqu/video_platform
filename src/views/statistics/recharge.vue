<template>
  <div id="anchor">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-input
          v-model="orderForm.condition.userName"
          :placeholder="mWords('userName', 's')"
        ></a-input>
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-select
          allowClear
          style="width:120px"
          v-model="orderForm.condition.condition.optType"
          :placeholder="mWords('optType','s')"
        >
          <a-select-option
            v-for="(item,idx) in $t('mapConfig.statistics.pay.optType')"
            :key="idx"
            :value="idx"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          allowClear
          style="width:120px"
          v-model="orderForm.condition.condition.type"
          :placeholder="mWords('type','s')"
        >
          <a-select-option
            v-for="(item,idx) in $t('mapConfig.statistics.pay.type')"
            :key="idx"
            :value="idx"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>-->
      <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.condition.startTime"
          :placeholder="mWords('startTime', 's')"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.condition.endTime"
          :placeholder="mWords('endTime', 's')"
        />
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
    // 二级菜单
    // var showKey = ['imgUrl', 'voiveUrl', 'videoUrl']
    // this.expand.table.columns = this.columns.filter(res => {
    //   if (showKey.indexOf(res.dataIndex) !== -1) {
    //     return res
    //   }
    // })
  },
  data() {
    return {
      content: '',
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
        // str: '',
        condition: {
          timeName: 'recDate',
          orderBy: 'recDate',
          asc: '0',
          startTime: null,
          endTime: null,
          condition: {
            userName: undefined
          }
        }
      },
      columns: [
        {
          title: _ => this.mWords('userName', 't'),
          dataIndex: 'userName'
        },
        {
          title: _ => this.mWords('recMoney', 't'),
          dataIndex: 'recMoney'
        },
        {
          title: _ => this.mWords('recCoin', 't'),
          dataIndex: 'recCoin'
        },
        {
          title: _ => this.mWords('rewardCoin', 't'),
          dataIndex: 'rewardCoin'
        },
        {
          title: _ => this.mWords('recDate', 't'),
          width: 150,
          dataIndex: 'recDate',
          sorter: true,
          defaultSortOrder: 'ascend', // 默认升序
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        }
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
      var sort = {
        ascend: 0,
        descend: 1
      }
      if (sorter.field && sorter.order) {
        sort = sort[sorter.order]
      } else {
        sort = 0
      }
      this.pagination = pager
      this.orderForm.condition.asc = sort
      this.submit({ page: pagination.current, pageSize: pagination.pageSize })
    },
    mWords(key, type) {
      var map = {
        s: 'searchForm',
        t: 'defTable',
        f: 'defForm'
      }
      return this.$t('statistics.recharge.' + map[type] + '.' + key)
    },
    setDefDate() {
      var origin = this.orderForm.condition
      var sT = origin.startTime
      var sE = origin.endTime
      if (!sT && !sE) {
        sT = moment().startOf('day')
        sE = moment().endOf('day')
      } else if (!sT && sE) {
        sT = moment(sE).startOf('day')
      } else if (sT && !sE) {
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
      var sDate = this.setDefDate()
      var { sT, sE } = sDate
      v = this.$util.loopMap({}, this.orderForm)
      v.condition.startTime = sT.valueOf()
      v.condition.endTime = sE.valueOf()
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('statistics.recharge.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            var pagination = { ...this.pagination }
            pagination.total = data.total
            pagination.pageSize = data.size
            this.tableData = data.records
            if (!param) {
              pagination.current = 1
            }
            this.pagination = pagination
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
