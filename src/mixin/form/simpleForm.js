export default {
  data() {
    return {
      // 表单提交状态
      postState: '',
      // 表单显示状态
      formVisible: false,
      // 按钮loading状态
      loading: false,
      // 表单校验规则
      rules: {},
      // 表单显示规则
      formRule: [],
      // 表单数据
      formData: {}
    }
  },
  methods: {
    // 表单配置规则
    createFormRule(getOpt, setOpt) {
      if (getOpt && setOpt) {
        // hide 不校验的规则 key 字段名
        var result = this.$util.createNewRule({
          tableRule: this[getOpt.tableRule],
          formHide: this[getOpt.formHide]
        })
        this.$set(this, setOpt.rules, result.rules)
        this.$set(this, setOpt.formRule, result.formRule)
      }
    },
    // 提交之前校验表单
    async beforeValid(opt) {
      var component = opt.component
      var apiKey = opt.apiKey
      var cb = opt.cb
      var verify = await this.$util.valid(this, ...component)
      if (!verify) {
        return
      }
      if (!apiKey) {
        return
      }
      console.log(opt)
      this.$message('正在提交中...')
      cb({ apiKey })
    },
    mixToPost(opt) {
      var statusCode = [5071]
      var postLoad = opt.postLoad
      var url = opt.url
      var cb = typeof opt.cb === 'function' && opt.cb
      var hide = opt.hide || []
      // var beforeSend = typeof opt.beforeSend === 'function' && opt.beforeSend
      var filterData = typeof opt.filterData === 'function' && opt.filterData
      var data = Object.assign({}, opt.data)
      // 提交前过滤数据
      if (filterData && filterData(data)) {
        data = filterData(data)
      }
      // 发送数据前做的步骤
      // if (beforeSend) {
      //   if (beforeSend(data)) {

      //   }
      // }
      if (opt.test) {
        return
      }
      data = this.$util.splitData(data, hide)
      postLoad && (this[postLoad] = true)
      this.$api
        .postRoleData(url, data)
        .then(res => {
          this.$message.closeAll()
          // 消息提示
          if (statusCode.indexOf(res.code) !== -1) {
            this.$message.error(res.msg)
          } else if (res.code === 5000 && opt.successMsg) {
            this.$message.success('提交成功,即将刷新')
          } else { }

          if (cb) {
            cb(res)
          } else if (res.code === 5000) {
            // 默认刷新页面
            setTimeout(_ => {
              this.$router.go(0)
            }, 300)
          } else { }
          postLoad && (this[postLoad] = false)
        })
        .catch(err => {
          console.log(err)
          this.$message.closeAll()
          this.$message.error('提交失败')
          postLoad && (this[postLoad] = false)
        })
    },
    mixPost(url, formData) {
      var statusCode = [5071]
      this.loading = true
      this.$api
        .postRoleData(url, formData)
        .then(res => {
          if (res.code === 5000) {
            this.$router.go(0)
          } else if (statusCode.indexOf(res.code !== -1)) {
            this.$message.closeAll()
            this.$message.error(res.msg)
          } else { }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.$message.closeAll()
          this.$message.error('提交失败')
          this.loading = false
        })
    }
  }
}
