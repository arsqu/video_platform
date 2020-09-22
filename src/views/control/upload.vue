<template>
  <div id="anchor">
    <!-- x: 1300, -->
    <div class="mt-2">
      <a-button type="primary" @click="addApk()">提交安装包</a-button>
    </div>
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
    <a-modal
      :footer="''"
      width="50%"
      :visible="isEdit"
      :title="'安装包'"
      @cancel="handleCancel"
    >
      <!-- postType为修改表单  -->
      <apkForm :ruleForm="ruleForm" :postState="postState" />
    </a-modal>
  </div>
</template>
<script>
const apkForm = () => import('@components/form/upload.vue')

export default {
  components: {
    apkForm
  },
  data() {
    return {
      isEdit: false,
      postState: null,
      ruleForm: {
        id: '',
        oldVersion: '',
        lowestVersion: '',
        newVersion: '',
        forcibly: undefined,
        apkUrl: '',
        content: ''
      },
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
        condition: {
          timeName: 'createTime',
          orderBy: 'createTime',
          asc: '0',
          startTime: null,
          endTime: null,
          condition: {}
        }
      },
      columns: [
        {
          title: _ => this.mWords('oldVersion', 't'),
          dataIndex: 'oldVersion'
        },
        {
          title: _ => this.mWords('lowestVersion', 't'),
          dataIndex: 'lowestVersion'
        },
        {
          title: _ => this.mWords('newVersion', 't'),
          dataIndex: 'newVersion'
        },
        {
          title: _ => this.mWords('forcibly', 't'),
          dataIndex: 'forcibly',
          customRender: v => {
            return this.$t('mapConfig.control.upload.forcibly')[v]
          }
        },
        {
          title: _ => this.mWords('apkUrl', 't'),
          dataIndex: 'apkUrl',
          customRender: v => {
            return this.createEl(v)
          }
        },
        {
          title: _ => this.mWords('content', 't'),
          dataIndex: 'content',
          customRender: v => {
            return (
              <a-tooltip>
                <template slot="title">
                  <span>{v}</span>
                </template>
                <div class="over_ellipsis">{v}</div>
              </a-tooltip>
            )
          }
        },
        {
          width: 150,
          title: _ => this.mWords('createTime', 't'),
          dataIndex: 'createTime',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        }
        // {
        //   width: 150,
        //   title: _ => this.mWords('updateTime', 't'),
        //   dataIndex: 'updateTime',
        //   customRender: v => {
        //     return moment(v).format('YYYY/MM/DD HH:mm:ss')
        //   }
        // }
        // {
        //   width: 80,
        //   title: _ => this.$t('tableList.header.operation'),
        //   dataIndex: '',
        //   fixed: 'right',
        //   customRender: (v, d) => {
        //     if (d.result !== 2) {
        //       return (
        //         <div>
        //           <a-button
        //             size="small"
        //             type="primary"
        //             onClick={v => {
        //               this.isEdit = true
        //               this.postState = 0
        //               this.ruleForm = d
        //             }}
        //           >
        //             修改
        //           </a-button>
        //         </div>
        //       )
        //     } else {
        //       return ''
        //     }
        //   }
        // }
      ]
    }
  },
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    this.submit()
  },
  methods: {
    handleCancel() {
      this.isEdit = false
    },
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
    addApk() {
      this.postState = 1
      this.isEdit = true
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
      return this.$t('control.upload.' + map[type] + '.' + key)
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
      // var sDate = this.setDefDate()
      // var { sT, sE } = sDate
      v = JSON.parse(JSON.stringify(this.orderForm)) // 克隆数据
      // v.condition.startTime = sT.valueOf()
      // v.condition.endTime = sE.valueOf()
      v = this.loopMap({}, v) // 剔除值为空的参数
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('control.upload.query', v)
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
