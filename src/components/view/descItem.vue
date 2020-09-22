<template>
  <div>
    <div
      :key="idx"
      v-for="(item, idx) in detlRule"
      class="site-description-item"
    >
      <!-- <el-divider /> -->
      <p class="detlTxt">{{ item.txt }}</p>
      <a-row>
        <template v-for="(d, idx) in item.rule">
          <!-- :span="d.span" -->
          <a-col
            :key="idx"
            :lg="d.lg || item.layout.lg"
            :md="d.md || item.layout.md"
            :sm="d.sm || item.layout.sm"
          >
            <itemContent
              :colon="colon"
              :title="d.label"
              :rule="d.rule"
              :content="
                d.render
                  ? d.render(detlData[d.prop])
                  : detlData[d.prop || d.label]
              "
            ></itemContent>
          </a-col>
        </template>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  name: 'descItem',
  components: {
    itemContent: {
      name: 'itemContent',
      functional: true,
      render: (h, ctx) => {
        var props = ctx.props
        if (props.rule) {
          props.content = props.content && JSON.parse(props.content)
          var els = []
          for (var i = 0; i < props.rule.length; i++) {
            var d = props.rule[i]
            els.push(
              <a-col key={i} lg={d.lg} md={d.md || 8} sm={d.sm}>
                <itemContent
                  colon={d.colon}
                  title={d.label}
                  content={props.content && props.content[d.prop]}
                ></itemContent>
              </a-col>
            )
          }
          return els
        } else {
          return (
            <div class="site-description-item-profile-wrapper">
              <p class="site-description-item-profile-p-label">
                <span>
                  {typeof props.title === 'function'
                    ? props.title()
                    : props.title}
                  <span v-if={props.colon}>:</span>
                </span>
              </p>
              <span v-else>{props.content}</span>
            </div>
          )
        }
      }
    }
  },
  props: {
    detlRule: {
      type: Object,
      default() {
        return {}
      }
    },
    detlData: {
      type: Object,
      default() {
        return []
      }
    },
    colon: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.site-description-item
  border-bottom 1px solid #ddd
  padding-bottom 10px
  padding-top 10px

.site-description-item:last-child
  border-color transparent

.site-description-item-profile-wrapper
  margin-bottom 7px
  color rgba(0, 0, 0, .65)
  font-size 14px
  display flex
  align-items baseline
  line-height 1.5715

.site-description-item-profile-p-label
  display inline-block
  margin-right 8px
  color rgba(0, 0, 0, .85)
</style>
