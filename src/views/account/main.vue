<template>
  <div class="apply">
    <a-row class="mb-2">
      <a-col :md="24">
        <div class="sec_box">
          <div class="welcome_text">
            {{$t('account.wel_text')}},
            <span>{{getUname}}</span>
          </div>
          <div class="sec_box mb-2">
            <a-row class="mb-2" :gutter="[16,16]">
              <a-col :md="12">
                <div class="mb-1 re_card link">
                  <a-card
                    class="card_body"
                    :title="$t('account.card.apply.head')"
                    @click="applyApp"
                  >
                    <a slot="extra" href="#">
                      <a-icon type="right" />
                    </a>
                    {{this.$t('account.card.apply.content')}}
                  </a-card>
                </div>
              </a-col>
              <a-col :md="12">
                <div class="re_card">
                  <router-link :to="{name:'accBalanceWithdrawal'}">
                    <a-card class="card_body" :title="$t('account.card.withdrawal.head')">
                      <a slot="extra" href="#">
                        <a-icon type="right" />
                      </a>
                      {{this.$t('account.card.withdrawal.content')}}
                    </a-card>
                  </router-link>
                </div>
              </a-col>
              <!-- <a-col :md="12">
                <div class="re_card">
                  <router-link :to="{name:'accRecord'}">
                    <a-card class="card_body" :title="$t('account.card.record.head')">
                      <a slot="extra" href="#">
                        <a-icon type="right" />
                      </a>
                      {{this.$t('account.card.record.content')}}
                    </a-card>
                  </router-link>
                </div>
              </a-col>-->
            </a-row>
          </div>
          <h2 class="mb-2">{{$t('account.headList.product')}}</h2>
          <appTable />
          <h2 class="mt-2 mb-2">{{$t('account.headList.approval')}}</h2>
          <simpleTable
            class="listView"
            :columns="showColumns"
            :size="'small'"
            :scroll="{y: 450 }"
            :tableData="tableData"
            :pagination="false"
          />
        </div>
      </a-col>
    </a-row>
    <!-- 修改审核失败的应用 -->
    <a-modal
      :footer="''"
      :width="'1024px'"
      :visible="visible"
      :title="'Modify App'"
      @cancel="handleCancel"
    >
      <!-- postType为修改表单  -->
      <applyApp :postType="true" :ruleForm="ruleForm" />
    </a-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appTable from './table/appTable'
import applyApp from '@components/form/applyApp'

export default {
  computed: {
    ...mapGetters(['getUname'])
  },
  components: {
    appTable,
    applyApp
  },
  mounted() {
    this.applyList()
  },
  data() {
    return {
      ruleForm: {},
      visible: false,
      showColumns: [
        {
          title: _ => this.mWords('appName'),
          dataIndex: 'appName'
        },
        {
          title: _ => this.mWords('result'),
          dataIndex: 'result',
          customRender: v => {
            return this.$t('mapConfig.account.result')[v]
          }
        },
        {
          title: _ => this.mWords('appTyp'),
          dataIndex: 'appType',
          customRender: v => {
            return this.$t('mapConfig.account.appTyp')[v]
          }
        },
        {
          title: _ => this.mWords('appContent'),
          dataIndex: 'appContent'
        },
        {
          title: _ => this.mWords('appCate'),
          dataIndex: 'appCate'
        },
        {
          title: _ => this.mWords('createTime'),
          dataIndex: 'createTime',
          customRender: v => {
            return moment(v).format('YYYY/MM/DD h:mm:ss')
          }
        },
        {
          title: _ => this.$t('tableList.header.operation'),
          dataIndex: '',
          customRender: v => {
            return (
              <a
                href="javascript:;"
                onClick={e => {
                  this.showModal(v)
                }}
              >
                {this.$t('btnGroup.upd')}
              </a>
            )
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    ...mapActions(['setStep']),
    handleCancel() {
      this.visible = false
    },
    mWords(key, text) {
      return this.$t('tableList.appTable.' + key)
    },
    showModal(v) {
      this.visible = true
      this.ruleForm = Object.assign({}, v) // 防止表单数据修改影响表格
    },
    applyList() {
      this.$axios.postData('account.app.approval', {}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tableData = res.data
          console.log(this.tableData)
        }
      })
    },
    // 申请应用
    applyApp() {
      this.setStep(0) // 会先查询公司信息是否完善
      this.$router.push({ name: 'accFormStep' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.apply
  .list_box
    background #fff
    border 1px solid #ece7e7
    a
      color #666
      &:hover
        color #1890ff
  .welcome_text
    font-size 28px
    margin 15px 0 20px
    font-weight bold
  .sec_box
    .cus_list
      background #fff
      border 1px solid #ece7e7
      padding 5px 25px 10px
      border-radius 6px
  & .re_card
    & >>> .ant-card-head-wrapper
      color #0070ba
      font-weight bold
    & >>> .ant-card-head
      border-bottom 0 none
    .card_body >>> .ant-card-body
      height 100px
      font-size 18px
</style>
