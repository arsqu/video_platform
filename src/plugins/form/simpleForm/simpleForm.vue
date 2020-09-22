<template>
  <div class="simpleForm">
    <a-form-model
      ref="simpleForm"
      layout="horizontal"
      :select="select"
      :syncOpt="syncOpt"
      :rules="rules"
      :formRule="formRule"
      :formState="formState"
      :model="formData"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <a-row>
        <template v-for="(item, idx) in formRule">
          <a-col
            :key="idx"
            :xs="item.xs"
            :lg="item.lg"
            :md="item.md || 24"
            :sm="item.sm"
            v-if="
              item.formCondition ? exchange(formData, item.formCondition) : !0
            "
          >
            <a-form-model-item
              :label="(item.form && item.form.title) || item.title"
              :prop="item.dataIndex"
              v-show="
                !(formState[item.dataIndex] && formState[item.dataIndex].hide)
              "
            >
              <!-- 自定义标题 -->
              <!-- <label slot="label">
                {{ (item.form && item.form.label) || item.label }}
                <a-tooltip
                  v-if="item.tips"
                  class="item"
                  :placement="item.placement || 'topLeft'"
                >
                  <span slot="title" v-html="item.tips"></span>
                  <a-icon type="info-circle" />
                </a-tooltip>
              </label> -->
              <!-- custom template -->
              <template v-if="'slot' == item.type">
                <slot :name="'form-' + item.dataIndex" />
              </template>
              <template v-else-if="'select' == item.type">
                <a-select
                  style="width:120px"
                  :placeholder="item.title"
                  v-model="formData[item.dataIndex]"
                  @change="item.onChange && item.onChange"
                  :disabled="
                    formState[item.dataIndex] &&
                      formState[item.dataIndex].disabled
                  "
                >
                  <template v-if="item.async">
                    <a-select-option
                      v-for="(o, i) in syncOpt[item.dataIndex]"
                      :value="o.val"
                      :key="i"
                    >
                      {{ o.txt }}</a-select-option
                    >
                  </template>
                  <template v-else>
                    <a-select-option
                      v-for="(k, v) in select[item.dataIndex]"
                      :key="k"
                      :value="
                        typeof formData[item.dataIndex] === 'number' ? +v : v
                      "
                      >{{ k }}</a-select-option
                    >
                  </template>
                </a-select>
              </template>
              <!-- input -->
              <a-input
                v-else-if="'textarea' == item.type"
                type="textarea"
                :rows="item.cusOpt ? getValue(item.cusOpt, 'textarea.rows') : 2"
                autosize
                v-model="formData[item.dataIndex]"
              ></a-input>
              <a-input
                v-else-if="'password' == item.type"
                v-model="formData[item.dataIndex]"
                show-password
              ></a-input>
              <a-input
                v-else-if="'number' == item.type"
                v-model.number="formData[item.dataIndex]"
              ></a-input>
              <!-- default -->
              <a-input
                v-else
                v-model="formData[item.dataIndex]"
                :placeholder="item.title"
                :disabled="
                  formState[item.dataIndex] &&
                    formState[item.dataIndex].disabled
                "
              ></a-input>
            </a-form-model-item>
          </a-col>
        </template>
      </a-row>
      <!-- footer -->
      <div>
        <slot name="footer"></slot>
      </div>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  props: {
    labelCol: {
      type: Object,
      default() {
        return { span: 6 }
      }
    },
    wrapperCol: {
      type: Object,
      default() {
        return { span: 16 }
      }
    },
    formState: {
      type: Object,
      default() {
        return {}
      }
    },
    // 禁用
    formDisabled: {
      type: Object,
      default() {
        return {}
      }
    },
    // 下拉
    select: {
      type: Object,
      default() {
        return {}
      }
    },
    // 异步加载下拉
    syncOpt: {
      type: Object,
      default() {
        return {}
      }
    },
    // 校验规则
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    // 显示规则
    formRule: {
      type: Object,
      default() {
        return {}
      }
    },
    // 数据
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    console.log(123)
  },
  methods: {
    exchange(d, con) {
      var isShow = !0
      if (con) {
        isShow = this.$util.getDeep(d, con)
        isShow = isShow ? !1 : !0
      }
      return isShow
    },
    getValue(obj, key, val) {
      return this.$util.getDeep(obj, key)
    }
  }
}
</script>

<style scoped></style>
