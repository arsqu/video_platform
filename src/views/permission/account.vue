<template>
  <div id="account">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-button
          type="primary"
          :loading="loadTable"
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
    <div class="mt-2">
      <a-button type="primary" @click="addAccount()">新增</a-button>
    </div>
    <simpleTable
      class="listView"
      :size="'small'"
      :bordered="false"
      :scroll="{ y: sHet }"
      :columns="columns"
      :loading="loadTable"
      :tableData="tableData"
      :pagination="pagination"
      :change="handleTableChange"
    />
    <a-modal
      width="30%"
      :footer="''"
      v-model="formVisible"
      :title="'用户管理'"
      @cancel="formVisible = false"
    >
      <!-- :destroyOnClose="true" -->
      <simpleForm
        ref="simpleForm"
        :rules="rules"
        :select="itemType.select"
        :syncOpt="itemType.syncOpt"
        :formRule="formRule"
        :formState="formState"
        :formData="formData"
      >
        <div class="text-center" :slot="'footer'">
          <a-button type="primary" @click="submitForm" :loading="loading"
            >提交</a-button
          >
          <a-button
            style="margin-left:10px"
            type="danger"
            @click="formVisible = false"
            >返回</a-button
          >
        </div>
      </simpleForm>
      <!-- postState为修改表单  -->
      <!-- <giftsForm
        :ruleForm="ruleForm"
        :postState="postState"
        @refreshTable="refreshTable"
      /> -->
    </a-modal>
  </div>
</template>
<script>
// const giftsForm = () => import('@components/form/gifts.vue')
import mixSimpleForm from '@mixin/form/simpleForm'

export default {
  mixins: [mixSimpleForm],
  components: {
    // giftsForm
  },
  data() {
    return {
      content: '',
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      sHet: null,
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
      orderForm: {},
      columns: [
        { title: _ => this.mWords('account', 't'), dataIndex: 'account' },
        {
          title: _ => this.mWords('createTime', 't'),
          dataIndex: 'createTime',
          customRender: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        }
      ],
      // form 组件
      loadTable: false,
      formHide: ['createTime'],
      rules: {
        account: [
          {
            required: true,
            message: this.fWords('account', 'f'),
            trigger: 'blur'
          }
        ]
      },
      formState: {},
      itemType: {
        select: {},
        syncOpt: {}
      }
    }
  },
  created() {},
  mounted() {
    this.sHet = this.$util.autoHet()
    this.createFormRule(
      {
        tableRule: 'columns',
        formHide: 'formHide'
      },
      {
        rules: 'rules',
        formRule: 'formRule'
      }
    )
    console.log(this.formRule)
    this.submit()
  },
  computed: {},
  methods: {
    // 表单验证
    validForm() {
      return new Promise((resolve, reject) => {
        console.log('表单校验')
        this.$refs.simpleForm.$refs.simpleForm.validate(valid => {
          console.log(valid)
          if (valid) {
            resolve(1)
          } else {
            resolve()
          }
        })
      })
    },
    // async submitForm(e) {
    //   console.log('post')
    //   var valid = await this.validForm() // 表单
    //   console.log(valid)
    //   if (valid) {
    //     console.log('可以提交')
    //     this.postInfo()
    //   }
    // },
    // 提交到服务器
    submitForm() {
      var state = this.postState
      // 提交前校验数据
      this.beforeValid({
        state, // 表单状态(新增或编辑)
        apiKey: 'permission.account.query', // 请求地址
        component: ['simpleForm', 'simpleForm'], // 校验的组件(外部组件和内部封装组件)
        cb: ({ apiKey }) => {
          switch (state) {
            // 新增
            case 'add':
              this.mixToPost({
                url: apiKey,
                postLoad: 'loading',
                successMsg: true,
                data: this.formData,
                filterData: param => {
                  param.pid = param.pid || 0 // 新建根能力
                  return param
                },
                cb: res => {
                  if (res.code === 5000) {
                    this.formVisible = false
                    setTimeout(_ => {
                      this.onSubmit() // 表格数据
                    }, 300)
                  }
                }
              })
              break
            case 'update':
              this.mixToPost({
                url: apiKey,
                postLoad: 'loading',
                hide: ['ad', 'pcode'],
                successMsg: true,
                data: this.formData,
                cb: res => {
                  if (res.code === 5000) {
                    this.formVisible = false
                    setTimeout(_ => {
                      this.onSubmit() // 表格数据
                    }, 300)
                  }
                }
              })
              break
          }
        }
      })
    },
    refreshTable() {
      this.formVisible = false
      this.submit()
    },
    addAccount() {
      this.ruleForm = {}
      this.postState = 1
      this.formVisible = true
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current // 当前页
      this.pagination = pager
      this.submit({
        page: pagination.current,
        pageSize: pagination.pageSize
      })
    },
    fWords(key, text) {
      // var map = {
      //   s: 'searchForm',
      //   t: 'defTable',
      //   f: 'defForm'
      // }
      return this.$util.mWords('control.gifts.defForm', key, text)
    },
    mWords(key, type) {
      var map = {
        s: 'searchForm',
        t: 'defTable',
        f: 'defForm'
      }
      return this.$t('permission.account.' + map[type] + '.' + key)
    },
    submit(param) {
      var v = {}
      v = this.$util.loopMap({}, this.orderForm) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      console.log(v)
      // this.loadTable = true
      // this.$axios
      //   .postData('permission.account.query', v)
      //   .then(res => {
      //     var data = res.data
      //     this.loadTable = false
      //     if (res.code === 200) {
      //       var pagination = { ...this.pagination }
      //       pagination.total = data.total
      //       pagination.pageSize = data.size
      //       this.tableData = data
      //       if (!param) {
      //         pagination.current = 1
      //       }
      //       this.pagination = pagination
      //     }
      //     // console.log(res)
      //   })
      //   .catch(err => {
      //     this.loadTable = false
      //     console.log(err)
      //   })
    }
  }
}
</script>
