<template>
  <div id="anchor">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          allowClear
          style="width:120px"
          v-model="orderForm.condition.condition.approvalSta"
          :placeholder="mWords('approvalSta', 's')"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.audit.anchor.approvalSta')"
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
      :scroll="{ y: sHet }"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :pagination="pagination"
      :change="handleTableChange"
    />
    <a-modal
      v-model="visible"
      title="主播信息"
      :bodyStyle="{ textAlign: 'center' }"
      @ok="visible = false"
    >
      <a-tabs default-active-key="2">
        <a-tab-pane key="1">
          <span slot="tab"> <a-icon type="video-camera" />视频 </span>
          <template v-for="(item, idx) in source.videoUrl">
            <video
              class="mb-1"
              style="max-width:100%"
              :key="idx"
              controls
              :src="item"
            />
          </template>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab"> <a-icon type="audio" />音频 </span>
          <template v-for="(item, idx) in source.voiceUrl">
            <audio :key="idx" class="mb-1" controls :src="item" />
          </template>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab"> <a-icon type="picture" />照片 </span>
          <template v-for="(item, idx) in source.imgUrl">
            <img :key="idx" class="mb-1" :src="item" style="max-width:100%" />
          </template>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
  },
  data() {
    return {
      visible: false,
      content: '',
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10
      },
      source: {
        videoUrl: [],
        voiceUrl: [],
        imgUrl: []
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
          timeName: 'approvalDate',
          orderBy: 'approvalDate',
          asc: '0',
          startTime: null,
          endTime: null,
          condition: {
            approvalSta: undefined
          }
        }
      },
      columns: [
        {
          title: _ => this.mWords('headImg', 't'),
          dataIndex: 'headImg',
          customRender: (v, d) => {
            return <a-avatar size={64} src={v} />
          }
        },
        {
          title: _ => this.mWords('anchorName', 't'),
          dataIndex: 'anchorName'
        },
        {
          title: _ => this.mWords('anchorPh', 't'),
          dataIndex: 'anchorPh'
        },
        {
          title: _ => this.mWords('source', 't'),
          dataIndex: 'source',
          customRender: (v, d) => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  console.log(v, d)
                  var key = ['videoUrl', 'voiceUrl', 'imgUrl']
                  for (var k in d) {
                    if (key.indexOf(k) !== -1) {
                      d[k] = typeof d[k] === 'string' ? d[k].split(',') : d[k]
                      this.source[k] = d[k]
                    }
                  }
                  this.visible = true
                  console.log('查看详情')
                }}
              >
                <a-icon type="file-sync" />
                审查
              </a>
            )
          }
        },
        {
          title: _ => this.mWords('approvalSta', 't'),
          dataIndex: 'approvalSta',
          customRender: v => {
            var tree = {
              1: 'default',
              2: 'success',
              3: 'error'
            }
            return (
              <div>
                <a-badge
                  status={tree[v]}
                  text={this.$t('mapConfig.audit.anchor.approvalSta')[v]}
                />
              </div>
            )
          }
        },
        {
          title: _ => this.mWords('content', 't'),
          dataIndex: 'content'
        },
        {
          width: 150,
          title: _ => this.mWords('approvalDate', 't'),
          dataIndex: 'approvalDate',
          sorter: true,
          defaultSortOrder: 'ascend', // 默认升序
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
            var btn0 = [
              <a-button
                size="small"
                type="primary"
                onClick={v => {
                  this.audit(d, 2)
                }}
              >
                通过
              </a-button>
            ]
            var btn1 = [
              <a-button
                class="mt-1"
                size="small"
                type="danger"
                onClick={v => {
                  // 拒绝
                  this.$Modal.confirm({
                    title: '请输入拒绝的原因',
                    maskClosable: true,
                    content: h => <a-input v-model={this.content}></a-input>,
                    onOk: close => {
                      if (!this.content) {
                        this.$util.Message('warning', '请输入拒绝的原因')
                        return
                      }
                      var o = Object.assign({}, d)
                      o.content = this.content
                      this.audit(o, 3, close)
                    },
                    onCancel() {
                      console.log('取消')
                    },
                    class: 'model_confirm'
                  })
                  console.log('拒绝')
                  // this.audit(d, 3)
                }}
              >
                拒绝
              </a-button>
            ]
            if (d.approvalSta === 1) {
              return (
                <div>
                  {btn0}
                  {btn1}
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
    audit(d, v, close) {
      console.log(d, v)
      var param = {
        id: d.id,
        uid: d.uid,
        content: d.content,
        approvalSta: v
      }
      this.$axios
        .postData('audit.anchor.allot', param)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              console.log('操作成功')
              this.submit()
              if (typeof close === 'function') {
                close()
              }
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
      return this.$t('audit.anchor.' + map[type] + '.' + key)
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
      // v = JSON.parse(JSON.stringify(this.orderForm)) // 克隆数据
      v = this.$util.loopMap({}, this.orderForm)
      v.condition.startTime = sT.valueOf()
      v.condition.endTime = sE.valueOf()
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('audit.anchor.query', v)
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
.model_confirm .ant-input
  padding-top 24px
</style>
