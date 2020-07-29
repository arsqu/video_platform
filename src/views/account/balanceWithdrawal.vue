<template>
  <div id="withdrawal">
    <!-- <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-input size="large" v-model="orderForm.str" :placeholder="mWords('searchForm.str')" />
      </a-form-model-item>
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
      <a-form-model-item>
        <a-button
          type="primary"
          :loading="loading"
          icon="search"
          size="large"
          @click="()=>{this.submit()}"
    ></a-button>-->
    <!-- <a-button
            class="ml-1"
            icon="export"
            type="primary"
            size="large"
            @click="()=>{this.exportExcel()}"
    ></a-button>-->
    <!-- </a-form-model-item>
    </a-form-model>-->
    <!--  x: 1300, -->
    <!-- <a-button class="mt-2" @click="approval" size="large" type="primary">{{$t('btnGroup.withdrawal')}}</a-button> -->
    <simpleTable
      class="listView mt-2"
      :columns="showColumns"
      :size="'small'"
      :scroll="{y: 450 }"
      :tableData="tableData"
      :pagination="pagination"
      :change="handleTableChange"
    />
    <!-- 提交提现申请 -->
    <a-modal :footer="''" :width="'30%'" :visible="visible" :title="''" @cancel="handleCancel">
      <balanceWithdrawal :ruleForm="formData" :asyncSel="asyncSel" ref="withdrawal">
        <template slot="footer" scope="v">
          <a-button
            size="large"
            type="primary"
            :loading="loading"
            @click="_=>{submitForm(v.ruleForm)}"
            style="width:150px"
          >{{$t('btnGroup.submit')}}</a-button>
        </template>
        <!-- @click="submitForm" -->
        <!-- <template slot="footer" scope="v">
          <a-button
            size="large"
            type="primary"
            :loading="loading"
            @click="_=>{submitForm(v.ruleForm)}"
            style="width:150px"
          >{{$t('btnGroup.submit')}}</a-button>
        </template>-->
      </balanceWithdrawal>
    </a-modal>
  </div>
</template>
<script>
const balanceWithdrawal = () => import('@components/form/balanceWithdrawal')

export default {
  components: {
    balanceWithdrawal
  },
  created() {},
  mounted() {
    // this.orderForm.condition.startTime = moment()
    this.queryCurrency()
    this.submit() // 查询余额
  },
  data() {
    return {
      formData: {},
      loading: false,
      visible: false,
      currencyList: [], // 货币
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
          // startTime: null,
          // endTime: null,
          str: '',
          condition: {
            currency: undefined
            // carryStatus: undefined
          }
        }
      },
      asyncSel: {
        currency: [],
        appId: []
      },
      showColumns: [
        {
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          title: _ => this.mWords('currency'),
          className: 'font-break',
          dataIndex: 'currency'
        },
        {
          title: _ => this.mWords('amount'),
          dataIndex: 'amount',
          customRender: v => {
            return this.$util.exchMoney(v)
          }
        },
        // {
        //   title: _ => this.mWords('ad'),
        //   dataIndex: 'ad',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD HH:mm:ss')
        //   }
        // },
        {
          width: 120,
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
                {this.$t('btnGroup.withdrawal')}
              </a>
            )
          }
        }
      ]
    }
  },
  methods: {
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.withdrawal.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(1)
          } else {
            resolve(false)
          }
        })
      })
    },
    async submitForm(v) {
      var valid = await this.validForm() // 表单
      if (valid) {
        console.log('可以提交')
        this.applyWithdrawal(v)
      }
    },
    // 提交申请
    applyWithdrawal(v) {
      this.loading = true
      console.log(v)
      this.$axios
        .postData('account.balanceWithdrawal.approval', v)
        .then(res => {
          console.log(res)
          this.loading = false
          if (res.code === 200) {
            this.$util.Message('success', this.$t('formList.common.submit'))
            this.submit()
            this.visible = false
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // 申请提现
    showModal(v) {
      v = this.$util.deepClone(v)
      // v.ad = moment(v.ad).format('YYYY/MM/DD')
      // v.amount = null
      // v.amount = this.$util.exchMoney(v.amount)
      this.formData = v
      delete v.id // 表格key
      v.str = v.appNo // app应用
      v.max = this.$util.exchMoney(v.amount)
      v.amount = ''
      this.visible = true
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current // 当前页
      this.pagination = pager
      this.submit({ page: pagination.current, pageSize: pagination.pageSize })
    },
    handleCancel() {
      this.visible = false
    },
    mWords(key, text) {
      return this.$t('tableList.balanceWithdrawal.' + key)
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
          // this.asyncSel.currency = arr
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
    // 余额查询
    submit(param) {
      var v = {}
      v = JSON.parse(JSON.stringify(this.orderForm))
      v = this.loopMap({}, v) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      console.log(v)
      this.$axios
        .postData('account.balanceWithdrawal.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            var pagination = { ...this.pagination }
            pagination.total = data.total
            var idx = 0
            data.map(res => {
              idx++
              res.id = idx
            })
            this.tableData = data
            if (param) {
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
    }
  }
}
</script>
