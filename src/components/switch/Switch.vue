<template>
  <div @click="!disabled && onChange()" :class="switchClasses">
    <span class="vi-switch_text_close" :class="textCloseClasses" v-if="inactiveText">
      <span>{{inactiveText}}</span>
    </span>
    <div class="vi-switch_success" :class="classes" :style="styles">
      <span class="vi-switch_loading" v-if="isbeforenFinish">
        <vi-icon name="btn-loading" size="15" color="#fff"></vi-icon>
      </span>
    </div>
    <span class="vi-switch_text_open " :class="textOpenClasses" v-if="activeText">
      <span>{{activeText}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'vi-switch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    },
    // 关闭时的颜色
    inactiveColor: {
      type: String,
      default: ''
    },
    //  打开时的颜色
    activeColor: {
      type: String,
      default: ''
    },
    // switch宽度
    width: {
      type: Number,
      default: 40
    },
    // 打开时文字描述
    activeText: {
      type: String,
      default: ''
    },
    // 关闭时文字描述
    inactiveText: {
      type: String,
      default: ''
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 改变前的钩子函数
    beforeChange: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      // 钩子是否执行完
      isbeforenFinish: false,
    }
  },
  computed: {
    switchClasses () {
      return [
        'vi-switch',
        {
          'vi-switch_disabled': this.disabled
        }
      ]
    },
    isChecked: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', typeof this.value === 'number' ? Number(val) : Boolean(val))
      }
    },
    classes () {
      return [
        'vi-switch_input',
        this.isChecked ? 'vi-switch_checked' : 'vi-switch_close'
      ]
    },
    styles () {
      return {
        backgroundColor: this.isChecked ? this.activeColor : this.inactiveColor,
        width: `${this.width}px`
      }
    },
    // 文字样式
    textCloseClasses () {
      return [
        'vi-switch_text',
        {
          'vi-switch_active': !this.isChecked
        }
      ]
    },
    textOpenClasses () {
      return [
        'vi-switch_text',
        {
          'vi-switch_active': this.isChecked
        }
      ]
    }
  },
  methods: {
    onChange () {
      if (!this.beforeChange) {
        this.isChecked = !this.isChecked
      } else {
        if (this.isbeforenFinish) return
        this.isbeforenFinish = true
        this.beforeChange(() => {
          this.isChecked = !this.isChecked
          this.isbeforenFinish = false
        })
      }
    }
  }
}
</script>
