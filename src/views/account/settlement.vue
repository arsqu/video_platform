<template>
  <div id="record">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          :placeholder="mWords('searchForm.searchType')"
          size="large"
          style="width:100%"
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
      <!--  class="lf" -->
      <a-form-model-item :validate-status="isCurrency?'error':''">
        <a-select
          :placeholder="mWords('searchForm.currency')"
          size="large"
          allowClear
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
          show-time
          size="large"
          v-model="orderForm.condition.startTime"
          :placeholder="mWords('searchForm.startTime')"
        />
        <!-- format="YYYY/MM/DD" -->
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          size="large"
          v-model="orderForm.condition.endTime"
          :placeholder="mWords('searchForm.endTime')"
        />
        <!-- format="YYYY/MM/DD" -->
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-date-picker
          class="c-block"
          size="large"
          v-model="orderForm.condition.ad"
          :disabled-date="disabledEndDate"
          format="YYYY/MM/DD"
          :placeholder="mWords('searchForm.ad')"
          @openChange="handleEndOpenChange"
        />
      </a-form-model-item>-->
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
    <a-drawer width="640" placement="right" :closable="false" :visible="visible" @close="onClose">
      <template v-for="(item,idx) in showDrawColumns">
        <div :key="idx">
          <p class="detlTxt">{{$t(item.txt)}}</p>
          <a-row>
            <template v-for="(detl,idx) in item.rule">
              <a-col :span="detl.span || 24" :key="idx">
                <descriptionItem
                  :title="(item.trans?mOWords(detl.title,'l'):mWords(detl.title,'l'))"
                  :content="formData[detl.title]"
                >
                  <template #content v-if="detl.render">{{detl.render(formData[detl.title])}}</template>
                </descriptionItem>
              </a-col>
            </template>
          </a-row>
          <a-divider />
        </div>
      </template>
    </a-drawer>
  </div>
</template>
<script>
import descriptionItem from '@components/view/descriptionItem'
export default {
  created() {},
  components: {
    descriptionItem
  },
  mounted() {
    this.showColumns = this.columns
    // this.showDetlColumns = this.detlColumns
    // this.orderForm.condition.startTime = moment()
    this.queryCurrency()
  },
  data() {
    return {
      tableData: [],
      visible: false,
      pageParam: {
        page: 1,
        pageSize: 10
      },
      formData: {},
      currencyList: [],
      searchType: {},
      loading: false,
      pagination: {},
      mapConfig: {},
      orderForm: {
        str: '',
        searchType: '0',
        condition: {
          orderBy: 'ad',
          asc: '0',
          timeName: 'ad',
          startTime: null,
          endTime: null,
          condition: {
            orderNo: '',
            currency: undefined,
            payStatus: undefined
          }
        }
      },
      showDrawColumns: {},
      drawOutColumns: {
        settle: {
          txt: 'common.revenue',
          rule: [
            {
              title: 'orderNo'
            },
            {
              title: 'currency',
              span: 12
            },
            {
              title: 'amount',
              span: 12
            },
            {
              title: 'handFee',
              span: 12
            },
            {
              title: 'ad',
              render: v => {
                return moment(v).format('YYYY/MM/DD HH:mm:ss')
              }
            }
          ]
        },
        income: {
          txt: 'common.originOrder',
          trans: 'tableList.recordTable',
          rule: [
            {
              title: 'orderNo'
            },
            {
              title: 'amount',
              span: 12
            },
            {
              title: 'payoutsStatus',
              span: 12,
              render: v => {
                return this.$t('mapConfig.record.payoutsStatus')[v]
              }
            },
            {
              title: 'syncStatus',
              span: 12,
              render: v => {
                return this.$t('mapConfig.record.syncStatus')[v]
              }
            },
            {
              title: 'payAd',
              render: v => {
                return moment(v).format('YYYY/MM/DD HH:mm:ss')
              }
            }
          ]
        },
        customer: {
          txt: 'common.customer',
          trans: 'tableList.recordTable',
          rule: [
            {
              title: 'mchCustId',
              span: 12
            },
            {
              title: 'mchOrderNo',
              span: 12
            },
            {
              title: 'mchParam',
              span: 12
            },
            {
              title: 'mchCallbackUrl',
              span: 12
            },
            {
              title: 'custAccount',
              span: 12
            },
            {
              title: 'datestr',
              span: 12
            },
            {
              title: 'custIfcs',
              span: 12
            },
            {
              title: 'custVpa',
              span: 12
            },
            {
              title: 'custPhone',
              span: 12
            },
            {
              title: 'custMail',
              span: 12
            }
          ]
        }
      },
      drawColumns: {
        settle: {
          txt: 'common.income',
          rule: [
            {
              title: 'orderNo'
            },
            {
              title: 'currency',
              span: 12
            },
            {
              title: 'amount',
              span: 12
            },
            {
              title: 'setAmount',
              span: 12
            },
            {
              title: 'headFee',
              span: 12
            },
            // {
            //   title: 'headFeeRate',
            //   span: 12
            // },
            // {
            //   title: 'exchangeRate',
            //   span: 12
            // },
            {
              title: 'ad',
              render: v => {
                return moment(v).format('YYYY/MM/DD HH:mm:ss')
              }
            }
          ]
        },
        income: {
          txt: 'common.originOrder',
          trans: 'tableList.recordTable',
          rule: [
            {
              title: 'orderNo'
            },
            {
              title: 'amount',
              span: 12
            },
            {
              title: 'currency',
              span: 12
            },
            {
              title: 'payStatus',
              span: 12,
              render: v => {
                return this.$t('mapConfig.record.payStatus')[v]
              }
            },
            {
              title: 'syncStatus',
              span: 12,
              render: v => {
                return this.$t('mapConfig.record.syncStatus')[v]
              }
            },
            {
              title: 'payAd',
              render: v => {
                return moment(v).format('YYYY/MM/DD HH:mm:ss')
              }
            }
          ]
        },
        customer: {
          txt: 'common.customer',
          trans: 'tableList.recordTable',
          rule: [
            {
              title: 'custId',
              span: 12
            },
            {
              title: 'mchOrderNo',
              span: 12
            },
            {
              title: 'mchParam',
              span: 12
            },
            {
              title: 'mchBackUrl',
              span: 12
            },
            {
              title: 'custMail',
              span: 12
            },
            {
              title: 'custPhone',
              span: 12
            }
          ]
        }
      },
      showColumns: [],
      outColumns: [
        {
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          width: 230,
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
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
        {
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        },
        {
          width: 60,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  this.showDraw(v, 'out')
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
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          width: 210,
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
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
          title: _ => this.mWords('setAmount'),
          dataIndex: 'setAmount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        {
          title: _ => this.mWords('headFee'),
          dataIndex: 'headFee',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        // {
        //   title: _ => this.mWords('headFeeRate'),
        //   dataIndex: 'headFeeRate'
        // },
        // {
        //   width: 120,
        //   title: _ => this.mWords('exchangeRate'),
        //   dataIndex: 'exchangeRate'
        // },
        {
          width: 150,
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        },
        {
          width: 60,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  this.showDraw(v)
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
    showDraw(v, k) {
      v = this.$util.deepClone(v)
      this.formData = v
      this.queryDetl(v)
      this.visible = true
    },
    onClose() {
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
    },
    // 查询详情
    queryDetl(v) {
      var url = {
        0: 'in',
        1: 'out'
      }
      url = url[this.searchType]
      if (this.searchType === '0') {
        this.showDrawColumns = this.drawColumns
      } else {
        this.showDrawColumns = this.drawOutColumns
      }
      this.$axios
        .postData('account.settlement.detl.' + url, { srcId: v.srcId })
        .then(res => {
          var data = res.data
          this.loading = false
          console.log(res)
          if (res.code === 200) {
            // f.ad = // ad 结算时间 payAd 下单时间
            data.payAd = data.ad
            delete data.ad
            var f = { ...this.formData, ...data }
            f.amount && (f.amount = this.$util.exchMoney(f.amount))
            f.setAmount && (f.setAmount = this.$util.exchMoney(f.setAmount))
            f.headFee && (f.headFee = this.$util.exchMoney(f.headFee))
            f.handFee && (f.handFee = this.$util.exchMoney(f.handFee))
            this.formData = f
          }
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
    mOWords(key, text) {
      return this.$t('tableList.recordTable.' + key)
    },
    mWords(key, text) {
      return this.$t('tableList.settleTable.' + key)
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
    submit(param) {
      var v = {}
      var origin = this.orderForm.condition
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
            if (!param) {
              pagination.current = 1
            }
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
