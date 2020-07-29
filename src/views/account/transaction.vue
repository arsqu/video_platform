<template>
  <div id="record">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-row>
        <a-form-model-item class="lf">
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
        <!-- has-feedback -->
        <a-form-model-item :validate-status="isCurrency?'error':''" class="lf">
          <a-select
            :placeholder="mWords('searchForm.currency')"
            style="min-width:80px"
            size="large"
            v-model="orderForm.condition.condition.currency"
          >
            <a-select-option v-for="(item,idx) in currencyList" :key="idx" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-col :md="3" :xs="12">
          <a-form-model-item>
            <a-input size="large" v-model="orderForm.str" :placeholder="mWords('searchForm.str')" />
          </a-form-model-item>
        </a-col>
        <a-col :md="4" :xs="12">
          <a-form-model-item>
            <a-input
              size="large"
              v-model="orderForm.condition.condition.orderNo"
              :placeholder="mWords('searchForm.orderNo')"
            />
          </a-form-model-item>
        </a-col>
        <a-col :md="3" :xs="12" v-show="orderForm.searchType === '0'">
          <a-form-model-item>
            <a-select
              :placeholder="mWords('searchForm.payStatus')"
              size="large"
              allowClear
              style="min-width:130px"
              v-model="orderForm.condition.condition.payStatus"
            >
              <a-select-option
                v-for="(item,idx) in $t('mapConfig.record.payStatus')"
                :key="idx"
                :value="idx"
              >{{item}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :md="3" :xs="12" v-show="orderForm.searchType === '1'">
          <a-form-model-item>
            <a-select
              :placeholder="mWords('searchForm.payoutsStatus')"
              size="large"
              allowClear
              style="min-width:130px"
              v-model="orderForm.condition.condition.payoutsStatus"
            >
              <a-select-option
                v-for="(item,idx) in $t('mapConfig.record.payoutsStatus')"
                :key="idx"
                :value="idx"
              >{{item}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :md="4" :xs="12">
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
        </a-col>
        <a-col :md="4" :xs="12">
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
        </a-col>
        <a-form-model-item>
          <a-button
            type="primary"
            :loading="loading"
            icon="search"
            size="large"
            @click="()=>{this.submit()}"
          ></a-button>
          <a-button
            class="ml-1"
            icon="export"
            type="primary"
            size="large"
            @click="()=>{this.exportExcel()}"
          ></a-button>
        </a-form-model-item>
      </a-row>
    </a-form-model>
    <div class="text-right">
      <!-- {{$t('btnGroup.export')}} -->
    </div>
    <h2 class="mt-2">{{$t('mapConfig.record.searchType')[searchType]}}</h2>
    <!--  x: 1300, -->
    <simpleTable
      class="listView"
      :columns="showColumns"
      :size="'small'"
      :scroll="{y: 450 }"
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
                  :title="mWords(detl.title,'l')"
                  :content="formData[detl.dataIndex||detl.title]"
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
  components: {
    descriptionItem
  },
  created() {},
  mounted() {
    this.showColumns = this.columns // 默认为收入
    // this.orderForm.condition.startTime = moment()
    this.queryCurrency()
  },
  data() {
    return {
      formData: {},
      loading: false,
      visible: false,
      currencyList: [],
      isCurrency: false,
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      pagination: {
        current: 1,
        total: null
      },
      mapConfig: {},
      searchType: {},
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
            currency: undefined,
            orderNo: '',
            payoutsStatus: undefined,
            payStatus: undefined
          }
        }
      },
      showColumns: [],
      showDrawColumns: {},
      specRule: {
        // 收入
        INR: {
          async: {
            txt: '',
            rule: [
              // {
              //   title: 'ptmGatewayname'
              // },
              // {
              //   title: 'ptmBankName'
              // },
              {
                title: 'ptmPaymentmode'
              }
            ]
          }
        },
        // 支出
        ali: {}
      },
      // drawer
      drawColumns: {
        common: {
          income: {
            txt: 'common.income',
            rule: [
              {
                title: 'orderNo'
              },
              {
                title: 'amount'
              },
              {
                title: 'currency'
              },
              {
                title: 'payStatus',
                render: v => {
                  return this.$t('mapConfig.record.payStatus')[v]
                }
              },
              {
                title: 'syncStatus',
                render: v => {
                  return this.$t('mapConfig.record.syncStatus')[v]
                }
              },
              {
                title: 'ad'
              }
            ]
          },
          customer: {
            txt: 'common.customer',
            rule: [
              {
                title: 'custId'
              },
              {
                title: 'mchOrderNo'
              },
              {
                title: 'mchBackUrl'
              },
              {
                title: 'custMail'
              },
              {
                title: 'custPhone'
              }
            ]
          }
        }
      },
      // 支出详情
      drawOutColumns: {
        income: {
          txt: 'common.revenue',
          rule: [
            {
              title: 'orderNo'
            },
            {
              title: 'amount'
            },
            {
              title: 'handFee'
            },
            {
              title: 'payoutsStatus',
              render: v => {
                return this.$t('mapConfig.record.payoutsStatus')[v]
              }
            },
            {
              title: 'syncStatus',
              render: v => {
                return this.$t('mapConfig.record.syncStatus')[v]
              }
            },
            {
              title: 'ad',
              render: v => {
                return moment(v).format('YYYY/MM/DD HH:mm:ss')
              }
            }
          ]
        },
        customer: {
          txt: 'common.customer',
          rule: [
            {
              title: 'mchCustId'
            },
            {
              title: 'mchOrderNo'
            },
            // {
            //   title: 'mchParam'
            // },
            {
              title: 'mchCallbackUrl'
            },
            {
              title: 'custAccount'
            },
            // {
            //   title: 'datestr'
            // },
            {
              title: 'custIfcs'
            },
            {
              title: 'custVpa'
            },
            {
              title: 'custPhone'
            },
            {
              title: 'custMail'
            }
          ]
        }
      },
      outcolumn: [
        {
          width: 230,
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
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
          title: _ => this.mWords('payoutsStatus'),
          dataIndex: 'payoutsStatus',
          customRender: v => {
            return this.$t('mapConfig.record.payoutsStatus')[v]
          }
        },
        {
          title: _ => this.mWords('syncStatus'),
          dataIndex: 'syncStatus',
          customRender: v => {
            return this.$t('mapConfig.record.syncStatus')[v]
          }
        },
        {
          title: _ => this.mWords('outAd'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        },
        {
          width: 80,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => {
                    this.showDraw(v, 'out')
                  }}
                >
                  {this.$t('btnGroup.detl')}
                </a>
              </span>
            )
          }
        }
      ],
      // table
      columns: [
        {
          width: 230,
          title: _ => this.mWords('orderNo'),
          dataIndex: 'orderNo'
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
          title: _ => this.mWords('payStatus'),
          dataIndex: 'payStatus',
          customRender: v => {
            return this.$t('mapConfig.record.payStatus')[v]
          }
        },
        {
          title: _ => this.mWords('syncStatus'),
          dataIndex: 'syncStatus',
          customRender: v => {
            return this.$t('mapConfig.record.syncStatus')[v]
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
          width: 80,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => {
                    this.showDraw(v)
                  }}
                >
                  {this.$t('btnGroup.detl')}
                </a>
              </span>
            )
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
    onClose() {
      this.visible = false
    },
    mWords(key, text) {
      return this.$t('tableList.recordTable.' + key)
    },
    // 详情
    showDraw(v, k) {
      v = this.$util.deepClone(v)
      v.ad = v.ad && moment(v.ad).format('YYYY/MM/DD HH:mm:ss')
      v.amount = v.amount && this.$util.exchMoney(v.amount)
      v.handFee = v.handFee && this.$util.exchMoney(v.handFee)
      this.formData = v
      var opt = this.drawColumns.common
      this.visible = true
      // 代付
      if (k) {
        this.showDrawColumns = this.drawOutColumns
      } else {
        // 收入
        this.showDrawColumns = this.drawColumns
        // 收入根据货币区分不同数据
        // if (v.condition.condition.currency === 'INR') {}
        // INR
        var currency = this.orderForm.condition.condition.currency
        if (this.specRule[currency]) {
          this.showDrawColumns = Object.assign({}, opt, this.specRule[currency])
          this.getDetl(v.id)
          return
        }
        this.showDrawColumns = opt
        console.log(this.showDrawColumns)
      }
    },
    // 订单详情(收入-INR 时显示的处理)
    getDetl(id) {
      // 目前只有收入需要查询
      this.$axios
        .specPost('account.record.query.detl', { orderId: id }, {})
        .then(res => {
          if (res.code === 200) {
            var arr = []
            if (res.data && res.data.length > 0) {
              arr = res.data.map(res => {
                // res.ptmPaymentmode = 1
                // return res.ptmPaymentmode
                if (res && res.ptmPaymentmode) {
                  return res.ptmPaymentmode
                }
              })
            }
            // 异步更新数据
            this.$set(this.formData, 'ptmPaymentmode', arr.join(','))
          }
        })
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
    // 创建下载链接
    createLink(data) {
      var url = window.URL.createObjectURL(new Blob([data]))
      console.log(url)
      var link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'statistics.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
    // 导出excel
    exportExcel() {
      var v = {}
      v = JSON.parse(JSON.stringify(this.orderForm))
      if (!v.condition.condition.currency) {
        this.isCurrency = true
        return
      }
      var origin = this.orderForm.condition
      this.isCurrency = false
      v = this.loopMap({}, v) // 剔除值为空的参数
      var url = {
        0: 'in',
        1: 'out'
      }
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
      url = url[v.searchType]
      this.$axios
        .downFile('account.record.exportExcel.' + url, v, {
          responseType: 'blob'
        })
        .then(res => {
          console.log(res)
          this.createDown(res)
          // this.createLink(res) // 没有提示,成功失败都会下载
        })
        .catch(err => {
          console.log(err)
        })
    },
    createDown(data) {
      // let fileName = res.headers['content-disposition']
      var fileName = '交易记录.xlsx'
      // 从header中取文件名
      // if (fileName && fileName.length >= 2) {
      //   fileName = fileName.split('=')[1]
      // }
      // fileName = decodeURIComponent(fileName)
      // 兼容ie11
      if (window.navigator.msSaveOrOpenBlob) {
        try {
          const blobObject = new Blob([data])
          window.navigator.msSaveOrOpenBlob(blobObject, fileName)
        } catch (e) {
          console.log(e)
        }
      } else {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        setTimeout(function() {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 100)
      }
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
      // v = JSON.parse(JSON.stringify(this.orderForm))
      if (!origin.condition.currency) {
        this.isCurrency = true
        return
      }
      this.isCurrency = false // 货币必选
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
        this.showColumns = this.outcolumn
      }
      this.searchType = v.searchType
      console.log(v)
      this.$axios
        .postData('account.record.query.' + url, v)
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
