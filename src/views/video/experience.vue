<template>
  <div id="anchor">
    <div>只能查询最近一小时的记录</div>
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <!-- :default-value="['a1', 'b2']" -->
        <a-select
          mode="multiple"
          :placeholder="mWords('metric', 's')"
          style="width: 200px"
          v-model="orderForm.metric"
          @change="handleChange"
        >
          <!-- mapConfig.video.scale.metric -->
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.video.experience.metric')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.startTime"
          :placeholder="mWords('startTime','s')"
        />
      </a-form-model-item>-->
      <!-- <a-form-model-item>
        <a-date-picker show-time v-model="orderForm.endTime" :placeholder="mWords('endTime','s')" />
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
    <simpleTable
      class="listView"
      :size="'small'"
      :bordered="false"
      :expand="expand"
      :scroll="{ y: sHet }"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :pagination="{}"
      :change="handleTableChange"
    />
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    this.submit()
  },
  data() {
    return {
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
      // orderForm: {
      //   condition: {
      //     timeName: 'registerDate',
      //     orderBy: 'registerDate',
      //     asc: '0',
      //     startTime: null,
      //     endTime: null,
      //     condition: {
      //       utype: undefined
      //     }
      //   }
      // },
      orderForm: {
        startTime: null,
        endTime: null,
        metric: []
      },
      columns: [
        {
          title: _ => this.mWords('joinSuccessRate', 't'),
          dataIndex: 'joinSuccessRate'
        },
        {
          title: _ => this.mWords('joinSuccess5SecsRate', 't'),
          dataIndex: 'joinSuccess5SecsRate'
        },
        {
          title: _ => this.mWords('videoFreezeRate', 't'),
          dataIndex: 'videoFreezeRate'
        },
        {
          title: _ => this.mWords('audioFreezeRate', 't'),
          dataIndex: 'audioFreezeRate'
        },
        {
          title: _ => this.mWords('ts', 't'),
          dataIndex: 'ts',
          render: v => {
            // return v ? moment(moment.unix(v)).format('YYYY/MM/DD HH:mm:ss') : ''
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
          }
        }
        // {
        //   width: 80,
        //   title: _ => this.$t('tableList.header.operation'),
        //   dataIndex: '',
        //   fixed: 'right',
        //   customRender: (v, d, idx) => {}
        // }
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
    mWords(key, type) {
      var map = {
        s: 'searchForm',
        t: 'defTable',
        f: 'defForm'
      }
      return this.$t('video.experience.' + map[type] + '.' + key)
    },
    setDefDate() {
      var d = moment().unix()
      var h = 60 * 60
      var origin = {
        startTime: d - h,
        endTime: d
      }
      var sT = origin.startTime
      var sE = origin.endTime
      return { sT, sE }
    },
    submit(param) {
      var v = {}
      // 默认时间
      var sDate = this.setDefDate()
      var { sT, sE } = sDate
      v = this.$util.deepClone(this.orderForm)
      v.startTime = sT
      v.endTime = sE
      v.metric = v.metric.toString()
      this.loading = true
      this.$axios
        .postData('video.experience.query', v)
        .then(res => {
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            // var pagination = { ...this.pagination }
            // pagination.total = data.total
            // pagination.pageSize = data.size
            this.tableData = data.records
            // if (!param) {
            //   pagination.current = 1
            // }
            // this.pagination = pagination
          } else {
            this.$util.Message('error', res.message)
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
