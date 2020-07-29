<template>
  <div id="withdrawal">
    <!-- {{$t('tableList.withdrawalTable')}} -->
    <a-form-model :model="orderForm" :layout="'inline'">
      <!-- has-feedback -->
      <a-form-model-item>
        <a-input size="large" v-model="orderForm.str" :placeholder="mWords('searchForm.str')" />
      </a-form-model-item>
      <a-form-model-item :validate-status="isCurrency?'error':''" class="lf">
        <a-select
          :placeholder="mWords('searchForm.currency')"
          style="min-width:120px"
          size="large"
          v-model="orderForm.condition.condition.currency"
        >
          <a-select-option v-for="(item,idx) in currencyList" :key="idx" :value="item">{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          :placeholder="mWords('searchForm.carryStatus')"
          size="large"
          allowClear
          style="min-width:130px"
          v-model="orderForm.condition.condition.carryStatus"
        >
          <a-select-option
            v-for="(item,idx) in $t('mapConfig.withdrawal.carryStatus')"
            :key="idx"
            :value="idx"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          class="c-block"
          size="large"
          v-model="orderForm.condition.startTime"
          :placeholder="mWords('searchForm.startTime')"
        />
        <!-- format="YYYY/MM/DD" -->
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          class="c-block"
          size="large"
          v-model="orderForm.condition.endTime"
          @change="onChange"
          :placeholder="mWords('searchForm.endTime')"
        />
        <!-- format="YYYY/MM/DD" -->
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          :loading="loading"
          icon="search"
          size="large"
          @click="()=>{this.submit()}"
        ></a-button>
        <!-- <a-button
            class="ml-1"
            icon="export"
            type="primary"
            size="large"
            @click="()=>{this.exportExcel()}"
        ></a-button>-->
      </a-form-model-item>
    </a-form-model>
    <!--  x: 1300, -->
    <simpleTable
      class="listView mt-2"
      :columns="showColumns"
      :size="'small'"
      :scroll="{y: 450 }"
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
    // this.orderForm.condition.startTime = moment()
    this.queryCurrency()
  },
  data() {
    return {
      loading: false,
      currencyList: [],
      isCurrency: false,
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      pagination: {},
      mapConfig: {},
      orderForm: {
        condition: {
          orderBy: 'ad',
          asc: '0',
          timeName: 'ad',
          str: '',
          startTime: null,
          endTime: null,
          condition: {
            currency: undefined,
            carryStatus: undefined
          }
        }
      },
      showColumns: [
        {
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('amount'),
          dataIndex: 'amount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        {
          title: _ => this.mWords('currency'),
          className: 'font-break',
          dataIndex: 'currency'
        },
        {
          title: _ => this.mWords('carryStatus'),
          dataIndex: 'carryStatus',
          customRender: v => {
            return this.$t('mapConfig.withdrawal.carryStatus')[v]
          }
        },
        {
          title: _ => this.mWords('merchantName'),
          dataIndex: 'merchantName'
        },
        {
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        }
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
    mWords(key, text) {
      return this.$t('tableList.withdrawalTable.' + key)
    },
    // 查询货币
    queryCurrency() {
      var arr = []
      this.$axios.postData('account.currency.query').then(res => {
        if (res.code === 200) {
          var data = res.data
          data.map(res => {
            arr.push(res.currency1)
          })
          this.currencyList = arr
        }
      })
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
        } else if (!v[k]) {
          continue
        }
      }
      return o
    },
    // 查询
    submit(param) {
      var v = {}
      var origin = this.orderForm.condition // 显示时间
      var sT = origin.startTime
      var sE = origin.endTime
      if (!sT && !sE) {
        sT = moment().startOf('day')
        sE = moment().endOf('day')
        origin.startTime = sT
        origin.endTime = sE
        sT = sT.startOf('day').valueOf()
        sE = sE.endOf('day').valueOf()
      } else if (!sT && sE) {
        // 只有结束时间
        sT = moment(sE).startOf('day')
        origin.startTime = sT
        sT = sT.startOf('day').valueOf()
        sE = sE.valueOf()
      } else if (sT && !sE) {
        // 只有开始时间
        sE = moment(sT).endOf('day')
        origin.endTime = sE
        sE = sE.endOf('day').valueOf()
        sT = sT.valueOf()
      } else {
        sT = sT.valueOf()
        sE = sE.valueOf()
      }
      v = JSON.parse(JSON.stringify(this.orderForm)) // 克隆数据
      v.condition.startTime = sT
      v.condition.endTime = sE
      v = this.loopMap({}, v) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('account.withdrawal.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            var pagination = { ...this.pagination }
            pagination.total = data.total
            if (!param) {
              pagination.current = 1
            }
            this.tableData = data.records
            this.pagination = pagination
          }
          console.log(res)
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>
