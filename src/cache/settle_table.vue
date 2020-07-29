<template>
  <div id="record">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          :placeholder="mWords('searchForm.searchType')"
          size="large"
          style="min-width:150px"
          v-model="orderForm.searchType"
        >
          <a-select-option
            v-for="(item,idx) in $t('mapConfig.record.searchType')"
            :key="idx"
            :value="idx"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-input size="large" v-model="orderForm.str" :placeholder="mWords('searchForm.str')" />
      </a-form-model-item>
      <a-form-model-item :validate-status="isCurrency?'error':''" class="lf">
        <a-select
          :placeholder="mWords('searchForm.currency')"
          size="large"
          style="min-width:120px"
          v-model="orderForm.condition.condition.currency"
        >
          <a-select-option v-for="(item,idx) in currencyList" :key="idx" :value="item">{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          size="large"
          v-model="orderForm.condition.condition.orderNo"
          :placeholder="mWords('searchForm.orderNo')"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          class="c-block"
          size="large"
          v-model="orderForm.condition.ad"
          :disabled-date="disabledEndDate"
          format="YYYY/MM/DD"
          :placeholder="mWords('searchForm.ad')"
          @openChange="handleEndOpenChange"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          :loading="loading"
          icon="search"
          size="large"
          @click="()=>{this.submit()}"
        ></a-button>
      </a-form-model-item>
    </a-form-model>
    <h2 class="mt-2">{{$t('mapConfig.record.searchType')[searchType]}}</h2>
    <!-- x: 1300, -->
    <simpleTable
      class="listView"
      :columns="showColumns"
      :scroll="{ y: 450 }"
      :size="'small'"
      :tableData="tableData"
      :pagination="pagination"
      :change="handleTableChange"
    />
    <a-modal
      :footer="''"
      :width="'1024px'"
      :visible="visible"
      :title="'Order'"
      @cancel="handleCancel"
    >
      <!-- x: 1300, -->
      <simpleTable
        :columns="showDetlColumns"
        :size="'small'"
        :scroll="{ y: 450 }"
        :tableData="detlTableData"
        :pagination="false"
      />
      <!--   :pagination="detlPagination"
      :change="detlHandleTableChange"-->
    </a-modal>
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.showColumns = this.columns
    this.showDetlColumns = this.detlColumns
    this.queryCurrency()
  },
  data() {
    return {
      tableData: [],
      detlTableData: [],
      visible: false,
      pageParam: {
        page: 1,
        pageSize: 10
      },
      currencyList: [],
      searchType: {},
      loading: false,
      pagination: {},
      detlPagination: {},
      mapConfig: {},
      orderForm: {
        str: '',
        searchType: '0',
        condition: {
          timeName: 'ad',
          startTime: null,
          endTime: null,
          condition: {
            currency: undefined,
            orderNo: '',
            payStatus: undefined
          }
        }
      },
      showDetlColumns: [],
      detlOutColumns: [
        {
          width: 100,
          title: _ => this.mOWords('orderNo'),
          dataIndex: 'orderNo'
        },
        {
          title: _ => this.mOWords('mchCustId'),
          dataIndex: 'mchCustId'
        },
        {
          title: _ => this.mOWords('amount'),
          dataIndex: 'amount'
        },
        {
          title: _ => this.mOWords('handFee'),
          dataIndex: 'handFee'
        },
        {
          title: _ => this.mOWords('syncStatus'),
          dataIndex: 'syncStatus',
          customRender: v => {
            return this.$t('mapConfig.record.syncStatus')[v]
          }
        },
        {
          title: _ => this.mOWords('payoutsStatus'),
          dataIndex: 'payoutsStatus',
          customRender: v => {
            return this.$t('mapConfig.record.payoutsStatus')[v]
          }
        },
        {
          title: _ => this.mOWords('mchCallbackUrl'),
          dataIndex: 'mchCallbackUrl'
        },
        {
          title: _ => this.mOWords('custPhone'),
          dataIndex: 'custPhone'
        },
        {
          title: _ => this.mOWords('custMail'),
          dataIndex: 'custMail'
        }
      ],
      detlColumns: [
        {
          width: 100,
          title: _ => this.mOWords('orderNo'),
          dataIndex: 'orderNo'
        },
        {
          title: _ => this.mOWords('mchOrderNo'),
          dataIndex: 'mchOrderNo'
        },
        {
          title: _ => this.mOWords('mchParam'),
          dataIndex: 'mchParam'
        },
        {
          title: _ => this.mOWords('custId'),
          dataIndex: 'custId'
        },
        {
          title: _ => this.mOWords('amount'),
          dataIndex: 'amount'
        },
        {
          title: _ => this.mOWords('mchBackUrl'),
          dataIndex: 'mchBackUrl'
        },
        {
          width: 130,
          title: _ => this.mOWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD')
          }
        },
        {
          title: _ => this.mOWords('payStatus'),
          dataIndex: 'payStatus',
          customRender: v => {
            return this.$t('mapConfig.record.payStatus')[v]
          }
        },
        {
          title: _ => this.mOWords('syncStatus'),
          dataIndex: 'syncStatus',
          customRender: v => {
            return this.$t('mapConfig.record.syncStatus')[v]
          }
        },
        {
          title: _ => this.mOWords('custPhone'),
          dataIndex: 'custPhone'
        },
        {
          title: _ => this.mOWords('custMail'),
          dataIndex: 'custMail'
        }
      ],
      showColumns: [],
      outColumns: [
        {
          width: 100,
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
        },
        {
          width: 80,
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
          width: 130,
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD')
          }
        },
        {
          width: 100,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  this.showModal(v)
                }}
              >
                {this.$t('btnGroup.detl')}
              </a>
            )
          }
        }
      ],
      columns: [
        {
          width: 100,
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
        },
        {
          width: 100,
          title: _ => this.mWords('currency'),
          dataIndex: 'currency'
        },
        {
          width: 100,
          title: _ => this.mWords('amount'),
          dataIndex: 'amount'
        },
        {
          width: 100,
          title: _ => this.mWords('setAmount'),
          dataIndex: 'setAmount'
        },
        {
          width: 100,
          title: _ => this.mWords('headFee'),
          dataIndex: 'headFee'
        },
        {
          width: 100,
          title: _ => this.mWords('headFeeRate'),
          dataIndex: 'headFeeRate'
        },
        {
          width: 120,
          title: _ => this.mWords('exchangeRate'),
          dataIndex: 'exchangeRate'
        },
        {
          width: 130,
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD')
          }
        },
        {
          width: 100,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  this.showModal(v)
                }}
              >
                {this.$t('btnGroup.detl')}
              </a>
            )
          }
        }
      ]
    }
  },
  methods: {
    showModal(v) {
      this.queryDetl(v)
      this.visible = true
    },
    // 移除该事件后点击modal外层不会消失
    handleCancel() {
      this.visible = false
    },
    // 货币
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
      //  this.orderForm.condition.condition.currency =
    },
    // 查询详情
    queryDetl(v) {
      var url = {
        0: 'in',
        1: 'out'
      }
      url = url[this.searchType]
      if (this.searchType === '0') {
        this.showDetlColumns = this.detlColumns
      } else {
        this.showDetlColumns = this.detlOutColumns
      }
      this.$axios
        .postData('account.settlement.detl.' + url, { srcId: v.srcId })
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            // var pagination = { ...this.pagination }
            // pagination.total = data.total
            this.detlTableData = [data]
            // this.pagination = pagination
          }
          console.log(res)
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current // 当前页
      this.pagination = pager
      this.submit({ page: pagination.current, pageSize: pagination.pageSize })
    },
    // detlHandleTableChange(pagination, filters, sorter) {
    //   const pager = { ...this.detlPagination }
    //   pager.current = pagination.current // 当前页
    //   this.detlPagination = pager
    //   this.submit({ page: pagination.current, pageSize: pagination.pageSize })
    // },
    mOWords(key, text) {
      return this.$t('tableList.recordTable.' + key)
    },
    mWords(key, text) {
      return this.$t('tableList.settleTable.' + key)
    },
    loopMap(o, v) {
      var exch = ['startTime', 'endTime']
      for (var k in v) {
        if (v[k]) {
          if (Object.prototype.toString.call(v[k]) === '[object Object]') {
            o[k] = o[k] || {}
            this.loopMap(o[k], v[k])
          } else if (typeof v[k] !== 'object') {
            o[k] = v[k]
          }
          if (exch.indexOf(k) !== -1) {
            v[k] = moment().valueOf()
          }
        } else if (!v[k]) {
          continue
        }
      }
      return o
    },
    submit(param) {
      var v = {}
      v = JSON.parse(JSON.stringify(this.orderForm))
      v.condition.startTime = v.condition.startTime
        ? moment(v.condition.startTime).valueOf()
        : null
      v.condition.endTime = v.condition.endTime
        ? moment(v.condition.endTime).valueOf()
        : null
      v = this.loopMap({}, v) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      console.log(v)
      this.loading = true
      var url = {
        0: 'in',
        1: 'out'
      }
      url = url[v.searchType]
      if (v.searchType === '0') {
        this.showColumns = this.columns
      } else {
        this.showColumns = this.outColumns
      }
      this.searchType = v.searchType
      this.$axios
        .postData('account.settlement.query.' + url, v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            var pagination = { ...this.pagination }
            pagination.total = data.total
            this.tableData = data.records
            this.pagination = pagination
          }
          console.log(res)
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
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
