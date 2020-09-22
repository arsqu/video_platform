<template>
  <div id="anchor">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          style="width:120px"
          v-model="orderForm.condition.condition.type"
          :placeholder="mWords('type', 's')"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.audit.feedback.type')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          allowClear
          style="width:120px"
          v-model="orderForm.condition.condition.result"
          :placeholder="mWords('result', 's')"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.audit.feedback.result')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
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
      :expand="expand"
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
      expand: {
        table: { columns: [] }
      },
      content: '',
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      type: '1',
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
          condition: {
            type: '1',
            result: undefined
          }
        }
      },
      columns: [
        {
          title: _ => {
            var k = this.type === '1' ? 'userName' : 'userName1'
            return this.mWords(k, 't')
          },
          dataIndex: 'userName'
        },
        {
          // title: _ => this.mWords('targetName', 't'),
          title: _ => {
            if (this.type === '1') {
              return this.mWords('targetName', 't')
            }
            return ''
          },
          dataIndex: 'targetName'
        },
        {
          // title: _ => this.mWords('informValue', 't'),
          title: _ => {
            var k = this.type === '1' ? 'informValue' : 'informValue1'
            return this.mWords(k, 't')
          },
          dataIndex: 'informValue',
          customRender: v => {
            return (
              <a-tooltip>
                <template slot="title">{v}</template>
                <div class="maxInner">{v}</div>
              </a-tooltip>
            )
          }
        },
        {
          // title: _ => this.mWords('report', 't'),
          title: _ => {
            var k = this.type === '1' ? 'report' : 'report1'
            return this.mWords(k, 't')
          },
          dataIndex: 'report',
          customRender: v => {
            return (
              <a-tooltip>
                <template slot="title">{v}</template>
                <div class="maxInner">{v}</div>
              </a-tooltip>
            )
          }
        },
        {
          title: _ => this.mWords('infoDesc', 't'),
          dataIndex: 'infoDesc',
          customRender: v => {
            return (
              <a-tooltip>
                <template slot="title">{v}</template>
                <div class="maxInner">{v}</div>
              </a-tooltip>
            )
          }
        },
        {
          title: _ => this.mWords('phone', 't'),
          dataIndex: 'phone'
        },
        {
          title: _ => this.mWords('result', 't'),
          dataIndex: 'result',
          customRender: v => {
            var tree = {
              1: 'default',
              2: 'success'
            }
            return (
              <div>
                <a-badge
                  status={tree[v]}
                  text={this.$t('mapConfig.audit.feedback.result')[v]}
                />
              </div>
            )
          }
        },
        {
          width: 150,
          title: _ => this.mWords('createTime', 't'),
          dataIndex: 'createTime',
          sorter: true,
          defaultSortOrder: 'ascend', // 默认升序
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        },
        {
          width: 150,
          title: _ => this.mWords('updateTime', 't'),
          dataIndex: 'updateTime',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD HH:mm:ss')
          }
        },
        {
          width: 80,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: (v, d) => {
            if (d.result === 1) {
              return (
                <div>
                  <a-button
                    size="small"
                    type="primary"
                    onClick={v => {
                      this.audit(d, 2)
                    }}
                  >
                    处理
                  </a-button>
                </div>
              )
            } else {
              return ''
            }
          }
        }
      ]
    }
  },
  methods: {
    // 审批
    audit(d, v) {
      console.log(d, v)
      var param = {
        id: d.id,
        type: d.type,
        result: v // 2
      }
      this.$axios
        .postData('audit.feedback.allot', param)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              console.log('操作成功')
              this.submit()
              this.$util.Message('success', this.$t('tips.success.def'))
            } else {
              console.log('操作失败')
              this.$util.Message('error', this.$t('tips.error.def'))
            }
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    createEl(v) {
      return (
        <div class="over_ellipsis" title={v}>
          {v}
        </div>
      )
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
      return this.$t('audit.feedback.' + map[type] + '.' + key)
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
      var sDate = this.setDefDate()
      var { sT, sE } = sDate
      v = this.$util.loopMap({}, this.orderForm)
      v.condition.startTime = sT.valueOf()
      v.condition.endTime = sE.valueOf()
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.type = v.condition.condition.type
      this.$axios
        .postData('audit.feedback.query', v)
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

<style lang="stylus" scoped>
.maxInner
  overflow hidden
  display -webkit-box
  -webkit-line-clamp 3
  /* autoprefixer: ignore next */
  -webkit-box-orient vertical
</style>
