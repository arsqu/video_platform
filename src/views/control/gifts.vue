<template>
  <div id="anchor">
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          style="width:120px"
          :placeholder="mWords('type', 's')"
          v-model="orderForm.condition.condition.type"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.control.gifts.type')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.condition.startTime"
          :placeholder="mWords('startTime','s')"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.condition.endTime"
          :placeholder="mWords('endTime','s')"
        />
      </a-form-model-item>-->
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
    <div class="mt-2">
      <a-button type="primary" @click="addGifts()">新增</a-button>
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
      width="50%"
      :footer="''"
      :visible="isEdit"
      :title="'礼物'"
      @cancel="isEdit = false"
      :destroyOnClose="true"
    >
      <!-- postType为修改表单  -->
      <giftsForm
        :ruleForm="ruleForm"
        :postState="postState"
        @refreshTable="refreshTable"
      />
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const giftsForm = () => import('@components/form/gifts.vue')

export default {
  components: {
    giftsForm
  },
  data() {
    return {
      isEdit: false,
      postState: null,
      ruleForm: {
        id: '',
        sysKey: '',
        sysValue: '',
        result: 1,
        sysFirstValue: '',
        rate: ''
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
          condition: {
            type: '1'
          }
        }
      },
      columns: [
        {
          title: _ => this.mWords('sysFirstValue', 't'),
          dataIndex: 'sysFirstValue',
          customRender: v => {
            return <a-avatar shape="square" size={64} src={v} />
          }
        },
        {
          title: _ => this.mWords('sysValue', 't'),
          dataIndex: 'sysValue',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                class="pointer"
                onClick={res => {
                  this.$Modal.info({
                    title: 'SVGA预览',
                    icon: '',
                    maskClosable: true,
                    content: h => (
                      <div>
                        <span>Tips:如无法播放动画可能因为跨域被浏览器拒绝</span>
                        <a-spin class="mt-1" spinning={this.getSvgLoad}>
                          <div
                            v-svga={v}
                            style={{
                              height: window.innerHeight * 0.6 + 'px'
                            }}
                          ></div>
                        </a-spin>
                      </div>
                    )
                  })
                }}
              >
                预览SVGA图
              </a>
            )
          }
        },
        {
          title: _ => this.mWords('type', 't'),
          dataIndex: 'type',
          customRender: v => {
            return this.$t('mapConfig.control.gifts.type')[v]
          }
        },
        {
          title: _ => this.mWords('sysKey', 't'),
          dataIndex: 'sysKey'
        },
        {
          title: _ => this.mWords('rate', 't'),
          dataIndex: 'rate'
        },
        {
          width: 150,
          title: _ => this.mWords('createTime', 't'),
          dataIndex: 'createTime',
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
          width: 150,
          title: _ => this.mWords('result', 't'),
          dataIndex: 'result',
          customRender: (v, params) => {
            // params = this.$util.deepClone(params)
            return (
              <div>
                <a-switch
                  default-checked={v}
                  checked-children="开"
                  loading={this.switchLoad}
                  un-checked-children="关"
                  key={Math.random() * 100}
                  onChange={v => {
                    this.switchLoad = true
                    params.result = +v
                    var formdata = new FormData()
                    for (var k in params) {
                      formdata.append(k, params[k])
                    }
                    this.$axios
                      .postFile('control.gifts.upd', formdata)
                      .then(res => {
                        if (res.code === 200) {
                          if (res.data) {
                            this.switchLoad = false
                            this.$util.Message('success', '操作成功')
                            console.log('成功')
                          } else {
                            this.$util.Message('error', '操作失败')
                          }
                        }
                      })
                      .catch(err => {
                        this.switchLoad = false
                        console.log(err)
                      })
                  }}
                />
              </div>
            )
          }
        },
        {
          width: 80,
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          fixed: 'right',
          customRender: (v, d) => {
            if (d.result !== 2) {
              return (
                <div>
                  <a-button
                    size="small"
                    type="primary"
                    onClick={v => {
                      this.isEdit = true
                      this.postState = 0
                      this.ruleForm = this.$util.deepClone(d)
                    }}
                  >
                    修改
                  </a-button>
                </div>
              )
            } else {
              return ''
            }
          }
        }
      ],
      svgaLoad: false,
      switchLoad: false
    }
  },
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    this.submit()
  },
  computed: {
    ...mapGetters(['getSvgLoad'])
  },
  methods: {
    refreshTable() {
      console.log('refreshTable')
      this.isEdit = false
      this.submit()
    },
    addGifts() {
      this.ruleForm = {
        sysKey: '',
        sysValue: '',
        result: 1,
        sysFirstValue: '',
        rate: ''
      }
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
      return this.$t('control.gifts.' + map[type] + '.' + key)
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
        .postData('control.gifts.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            var pagination = { ...this.pagination }
            pagination.total = data.total
            pagination.pageSize = data.size
            // this.tableData = []
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
