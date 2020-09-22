<template>
  <div id="anchor">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          allowClear
          style="width:120px"
          v-model="orderForm.condition.condition.usta"
          :placeholder="mWords('usta', 's')"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.user.user.usta')"
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
          v-model="orderForm.condition.condition.utype"
          :placeholder="mWords('utype', 's')"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.user.user.utype')"
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
    <a-modal
      :footer="''"
      :visible="visible"
      width="50%"
      @cancel="visible = false"
    >
      <descItem :detlRule="detlRule" :detlData="detlData"></descItem>
    </a-modal>
  </div>
</template>
<script>
import descItem from '@components/view/descItem'

export default {
  components: {
    descItem
  },
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    this.submit()
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
      freezeTime: undefined, // 封禁时间
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
          timeName: 'registerDate',
          orderBy: 'registerDate',
          asc: '0',
          startTime: null,
          endTime: null,
          condition: {
            utype: undefined
          }
        }
      },
      columns: [
        {
          title: _ => this.mWords('uimg', 't'),
          dataIndex: 'uimg',
          customRender: v => {
            return <a-avatar shape="square" size={64} src={v} />
          }
        },
        { title: _ => this.mWords('uname', 't'), dataIndex: 'uname' },
        { title: _ => this.mWords('umail', 't'), dataIndex: 'umail' },
        { title: _ => this.mWords('chCode', 't'), dataIndex: 'chCode' },
        {
          title: _ => this.mWords('utype', 't'),
          dataIndex: 'utype',
          customRender: v => {
            return this.$t('mapConfig.user.user.utype')[v]
          }
        },
        { title: _ => this.mWords('uph', 't'), dataIndex: 'uph' },
        {
          title: _ => this.mWords('usta', 't'),
          dataIndex: 'usta',
          customRender: v => {
            return this.$t('mapConfig.user.user.usta')[v]
          }
        },
        {
          width: 150,
          title: _ => this.mWords('freezeTime', 't'),
          dataIndex: 'freezeTime',
          customRender: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        },
        {
          width: 150,
          title: _ => this.mWords('registerDate', 't'),
          dataIndex: 'registerDate',
          sorter: true,
          defaultSortOrder: 'ascend', // 默认升序
          // filters: [
          //   { text: 'Male', value: 'male' },
          //   { text: 'Female', value: 'female' }
          // ],
          customRender: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        },
        {
          width: 80,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: (v, d) => {
            // 成功时不显示
            return (
              <div>
                <a-button
                  size="small"
                  type="primary"
                  onClick={v => {
                    this.detlData = this.$util.deepClone(d)
                    this.visible = true
                  }}
                >
                  详情
                </a-button>
                {d.usta === 2 ? (
                  <a-button
                    size="small"
                    class="mt-1"
                    onClick={_ => {
                      this.audit(d, 1)
                    }}
                  >
                    解封
                  </a-button>
                ) : d.usta === 1 ? (
                  <a-button
                    v-if={d.usta === 1}
                    class="mt-1"
                    size="small"
                    type="danger"
                    onClick={v => {
                      // 拒绝
                      this.modal = this.$Modal.confirm({
                        title: '账号封禁',
                        maskClosable: true,
                        content: h => (
                          <a-date-picker v-model={this.freezeTime} />
                        ),
                        onOk: close => {
                          if (!this.freezeTime) {
                            this.$util.Message('warning', '请选择封号截止时间')
                            return
                          }
                          // var o = Object.assign({}, d)
                          var o = this.$util.deepClone(d)
                          o.freezeTime = this.freezeTime
                          this.audit(o, 2, close)
                        },
                        onCancel() {
                          console.log('Cancel')
                        }
                      })
                      console.log('拒绝')
                      // this.audit(d, 3)
                    }}
                  >
                    封禁
                  </a-button>
                ) : (
                  ''
                )}
              </div>
            )
          }
        }
      ],
      detlRule: {
        origin: {
          txt: '个人详情',
          layout: {
            md: 8,
            sm: 12
          },
          rule: [
            {
              label: _ => this.mWords('uimg', 't'),
              prop: 'uimg',
              render: v => {
                return <a-avatar size={128} src={v}></a-avatar>
              }
            },
            { label: _ => this.mWords('uname', 't'), prop: 'uname' },
            { label: _ => this.mWords('chCode', 't'), prop: 'chCode' },
            {
              label: _ => this.mWords('utype', 't'),
              prop: 'utype',
              render: v => {
                return this.$t('mapConfig.user.user.utype')[v]
              }
            },
            {
              label: _ => this.mWords('usex', 't'),
              prop: 'usex',
              render: v => {
                return this.$t('mapConfig.user.user.usex')[v]
              }
            },
            {
              label: _ => this.mWords('ubirthday', 't'),
              prop: 'ubirthday',
              render: v => {
                return v ? moment(v).format('YYYY/MM/DD') : ''
              }
            },
            { label: _ => this.mWords('profession', 't'), prop: 'profession' },
            {
              label: _ => this.mWords('usta', 't'),
              prop: 'usta',
              render: v => {
                return this.$t('mapConfig.user.user.usta')[v]
              }
            },
            {
              label: _ => this.mWords('realNameAuth', 't'),
              prop: 'realNameAuth',
              render: v => {
                return this.$t('mapConfig.user.user.realNameAuth')[v]
              }
            },
            { label: _ => this.mWords('idCode', 't'), prop: 'idCode' },
            { label: _ => this.mWords('uph', 't'), prop: 'uph' },
            { label: _ => this.mWords('actualName', 't'), prop: 'actualName' },
            // { label: _ => this.mWords('upass', 't'), prop: 'upass' },
            { label: _ => this.mWords('uaddress', 't'), prop: 'uaddress' },
            { label: _ => this.mWords('umail', 't'), prop: 'umail', md: 16 },
            {
              label: _ => this.mWords('outward', 't'),
              prop: 'outward',
              rule: [
                {
                  label: _ => this.mWords('bust', 't'),
                  prop: 'bust'
                },
                {
                  label: _ => this.mWords('Waist', 't'),
                  prop: 'Waist'
                },
                {
                  label: _ => this.mWords('Hips', 't'),
                  prop: 'Hips'
                },
                {
                  label: _ => this.mWords('height', 't'),
                  prop: 'height'
                },
                {
                  label: _ => this.mWords('bodyWeight', 't'),
                  prop: 'bodyWeight'
                }
              ],
              md: 24
            },
            {
              label: _ => this.mWords('bankCard', 't'),
              prop: 'bankCard',
              rule: [
                {
                  label: _ => this.mWords('bankName', 't'),
                  md: 12,
                  prop: 'bankName'
                },
                {
                  label: _ => this.mWords('code', 't'),
                  md: 12,
                  prop: 'code'
                }
              ],
              md: 24
            },
            {
              label: _ => this.mWords('registerDate', 't'),
              prop: 'registerDate',
              render: v => {
                return v ? moment(v).format('YYYY/MM/DD') : ''
              }
            },
            {
              label: _ => this.mWords('freezeTime', 't'),
              prop: 'freezeTime',
              render: v => {
                return v ? moment(v).format('YYYY/MM/DD') : ''
              }
            },
            {
              label: _ => this.mWords('loginTime', 't'),
              prop: 'loginTime',
              render: v => {
                return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
              }
            },
            {
              label: _ => this.mWords('outTime', 't'),
              prop: 'outTime',
              render: v => {
                return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
              }
            },
            { label: _ => this.mWords('ulabel', 't'), prop: 'ulabel', md: 24 }
          ]
        }
      },
      detlData: {}
    }
  },
  methods: {
    // 审批
    audit(d, v, close) {
      var param = {
        id: d.id,
        freezeTime: d.freezeTime && d.freezeTime.valueOf(),
        usta: v
      }
      this.$axios
        .postData('user.user.allot', param)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              console.log('操作成功')
              this.submit()
              this.$util.Message('success', this.$t('tips.success.def'))
              if (typeof close === 'function') {
                close()
              }
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
      this.submit({
        page: pagination.current,
        pageSize: pagination.pageSize
      })
    },
    mWords(key, type) {
      var map = {
        s: 'searchForm',
        t: 'defTable',
        f: 'defForm'
      }
      return this.$t('user.user.' + map[type] + '.' + key)
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
      // v = this.$util.deepClone(this.orderForm)
      v = this.$util.loopMap({}, this.orderForm) // 剔除值为空的参数
      v.condition.startTime = sT.valueOf()
      v.condition.endTime = sE.valueOf()
      v = Object.assign({}, param || this.pageParam, v)
      this.loading = true
      this.$axios
        .postData('user.user.query', v)
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
