<template>
  <div>
    <simpleTable
      class="listView"
      :columns="columns"
      :scroll="{ y: 450 }"
      :tableData="tableData"
      :pagination="pagination"
      :change="handleTableChange"
    />
    <!-- 修改 -->
    <a-modal
      :footer="''"
      :width="'1024px'"
      :visible="visible"
      :title="'Modify App'"
      @cancel="handleCancel"
    >
      <appForm ref="appForm" :ruleForm="formData">
        <template slot="footer" scope="v">
          <a-button
            @click="_=>{updateApp(v.ruleForm)}"
            size="large"
            :loading="loading"
            type="primary"
            style="width:150px"
          >{{$t('btnGroup.submit')}}</a-button>
        </template>
      </appForm>
    </a-modal>
    <!-- 预览 -->
    <a-drawer
      width="640"
      placement="right"
      :closable="false"
      :visible="viewVisible"
      @close="onClose"
    >
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
import { mapGetters, mapActions } from 'vuex'
import appForm from '@components/form/updApp'
import descriptionItem from '@components/view/descriptionItem'
// import appView from '@components/view/viewBox'

export default {
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  components: {
    appForm,
    descriptionItem
    // appView
  },
  created() {
    this.pagination.current = this.pageParam.page
    this.pagination = Object.assign({}, this.pageParam, this.pagination)
    this.condition = Object.assign({}, this.pageParam, this.condition)
  },
  mounted() {
    this.loadApp()
  },
  data() {
    return {
      loading: false,
      pageParam: {
        page: 1,
        pageSize: 10
      },
      showDrawColumns: {
        info: {
          txt: 'common.info',
          rule: [
            {
              title: 'appName',
              span: 12
            },
            {
              title: 'appNo'
            },
            {
              title: 'appTyp',
              render: v => {
                return this.$t('mapConfig.account.appTyp')[v]
              }
            },
            {
              title: 'signKey'
            },
            {
              title: 'syncUrl'
            },
            {
              title: 'countryList'
            },
            {
              title: 'ipList'
            },
            {
              title: 'ad',
              render: v => {
                return moment(v).format('YYYY/MM/DD h:mm:ss')
              }
            }
          ]
        }
      },
      pagination: {}, // 分页
      formData: {}, // 表单数据
      viewVisible: false, // 数据预览
      visible: false, // modal显示隐藏
      mapConfig: {}, // 枚举字段
      // 查询参数
      condition: {
        condition: {}
      },
      tableData: [], // 表格数据
      // 表头
      columns: [
        {
          width: 120,
          // scopedSlots: { customRender: 'cusContent' }, // 数据重载
          title: _ => this.mWords('appName'),
          dataIndex: 'appName'
        },
        {
          width: 80,
          title: _ => this.mWords('appNo'),
          dataIndex: 'appNo'
        },
        {
          width: 100,
          title: _ => this.mWords('appTyp'),
          dataIndex: 'appTyp',
          customRender: (v, d, idx) => {
            // return this.mapConfig.appTyp[v]
            return this.$t('mapConfig.account.appTyp')[v]
          }
        },
        {
          title: _ => this.mWords('syncUrl'),
          className: 'font-break',
          dataIndex: 'syncUrl'
        },
        {
          title: _ => this.mWords('ad'),
          dataIndex: 'ad',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD')
          }
        },
        {
          width: 120,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: v => {
            return (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => {
                    this.showModal(v)
                  }}
                >
                  {this.$t('btnGroup.upd')}
                </a>
                <a
                  href="javascript:;"
                  class="pl-2"
                  onClick={e => {
                    this.showModal(v, 'view')
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
    ...mapActions(['setStep']),
    onClose() {
      this.viewVisible = false
    },
    // 移除该事件后点击modal外层不会消失
    handleCancel() {
      this.visible = false
      this.viewVisible = false
    },
    showModal(v, k) {
      v = this.$util.deepClone(v)
      v.ad = moment(v.ad).format('YYYY/MM/DD')
      this.formData = v
      if (k) {
        this.viewVisible = true
      } else {
        this.visible = true
      }
    },
    mDetlWords(key, text) {
      return this.$util.mWords('formList.applyApp', key, text)
    },
    mWords(key, text) {
      return this.$t('tableList.appTable.' + key)
    },
    validForm() {
      return new Promise((resolve, reject) => {
        console.log(this.$refs.appForm)
        this.$refs.appForm.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(1)
          } else {
            resolve(false)
          }
        })
      })
    },
    // 修改应用
    async updateApp(v) {
      v = this.$util.deepClone(v)
      delete v.ad
      var valid = await this.validForm() // 表单
      if (valid) {
        this.loading = true
        console.log(this.loading)
        this.$axios
          .postData('account.app.edit', v)
          .then(res => {
            console.log(res)
            this.loading = false
            if (res.code === 200) {
              this.visible = false
              this.$util.Message('success', this.$t('formList.common.edit'))
              this.loadApp() // 刷新表格
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }
    },
    loadApp(param) {
      var opt = {
        condition: this.condition
      }
      opt = Object.assign({}, param || this.pageParam, opt)
      this.$axios
        .postData('account.app.queryApp', opt)
        .then(res => {
          console.log(res)
          var data = res.data
          if (res.code === 200) {
            if (data.total === 0) {
              return
            }
            var pagination = { ...this.pagination }
            pagination.total = data.total
            this.pagination = pagination
            this.tableData = data.records
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current // 当前页
      this.pagination = pager
      this.loadApp({ page: pagination.current, pageSize: pagination.pageSize })
    }
  }
}
</script>

<style>
</style>
