<template>
  <div id="anchor">
    <!-- <div>只能查询最近一小时的记录</div> -->
    <a-form-model :model="orderForm" :layout="'inline'">
      <a-form-model-item>
        <a-select
          :placeholder="mWords('type', 's')"
          style="width: 200px"
          v-model="orderForm.type"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.video.abnormal.type')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.startTime"
          :placeholder="mWords('startTime', 's')"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-date-picker
          show-time
          v-model="orderForm.endTime"
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
    <!-- :scroll="{ y: sHet }" -->
    <simpleTable
      class="listView"
      :size="'small'"
      :bordered="false"
      :expand="expand"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      :pagination="{}"
      :change="handleTableChange"
    ></simpleTable>
  </div>
</template>
<script>
export default {
  created() {},
  mounted() {
    this.sHet = document.documentElement.clientHeight - 440 + 48
    // this.submit()
  },
  data() {
    return {
      expand: {
        table: {
          childKey: 'cause_tags',
          columns: [
            {
              title: _ => this.mWords('factor_id', 't'),
              dataIndex: 'factor_id'
            },
            {
              title: _ => this.mWords('factor_desc', 't'),
              dataIndex: 'factor_desc'
            },
            {
              title: _ => this.mWords('host_user', 't'),
              dataIndex: 'host_user'
            }
          ]
        }
      },
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
        startTime: null,
        endTime: null,
        type: '1'
      },
      columns: [
        {
          title: _ => this.mWords('cname', 't'),
          dataIndex: 'cname'
        },
        {
          title: _ => this.mWords('user', 't'),
          dataIndex: 'user'
        },
        {
          title: _ => this.mWords('exp_id', 't'),
          dataIndex: 'exp_id'
        },
        {
          title: _ => this.mWords('exp_desc', 't'),
          dataIndex: 'exp_desc'
        },
        {
          title: _ => this.mWords('ts', 't'),
          dataIndex: 'ts',
          render: v => {
            return v ? moment(v).format('YYYY/MM/DD HH:mm:ss') : ''
            // return v ? moment(moment.unix(v)).format('YYYY/MM/DD HH:mm:ss') : ''
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
      return this.$t('video.abnormal.' + map[type] + '.' + key)
    },
    setDefDate() {
      var origin = this.orderForm
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
      v = this.$util.deepClone(this.orderForm)
      v.startTime = sT.valueOf()
      v.endTime = sE.valueOf()
      this.loading = true
      this.$axios
        .postData('video.abnormal.query', v)
        .then(res => {
          console.log(res)
          var data = res.data
          this.loading = false
          if (res.code === 200) {
            // var pagination = { ...this.pagination }
            // pagination.total = data.total
            // pagination.pageSize = data.size
            this.tableData = data
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
