<template>
  <view
    class="radio"
    :class="{'radio-width-default':widthDefault}"
    :style="checked?activeStyle :itemStyle"
    @click="handleChange"
  >{{name}}</view>
</template>

<script>
/**
 * 防抖
 * @param {*} fun
 * @param {*} delay
 * @param {*} immediate
 */
const debounce = function(fun, delay, immediate) {
  var timer, lasttime, context, arg
  var later = function() {
    var now = new Date().getTime(),
      l = now - lasttime
    if (l < delay && l >= 0) {
      clearTimeout(timer)
      timer = setTimeout(later, delay - l)
    } else {
      clearTimeout(timer)
      timer = null
      if (!immediate) {
        fun.apply(context, arg)
        if (!timer) context = arg = null
      }
    }
  }
  return function() {
    context = this
    arg = arguments
    lasttime = new Date().getTime()
    var callNow = immediate && !timer
    if (!timer) timer = setTimeout(later, delay)
    if (callNow) {
      fun.apply(context, arg)
      context = arg = null
    }
  }
}
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      default: null
    },
    checked: {
      type: [Boolean, Number],
      default: false
    }
  },
  computed: {
    widthDefault() {
      return this.name.length <= 3
    },
    activeStyle() {
      return `color: #4f5cd1; border-color: #4f5cd1;`
    },
    itemStyle() {
      return `color: #cfcfcf;`
    }
  },
  data() {
    return {}
  },
  methods: {
    handleChange: debounce(handleChange, 200, true)
  }
}

function handleChange() {
  this.$emit('change', this.value)
}
</script>

<style>
.radio {
  display: inline-block;
  height: 50upx;
  line-height: 50upx;
  padding: 0 24upx;
  border-radius: 10upx;
  font-size: 24upx;
  box-sizing: border-box;
  border: 1px solid #cfcfcf;
}

.radio:not(:last-child) {
  margin: 0 20upx 0 0;
}

/* .radio-width-default {
  width: 94upx;
  text-align: center;
  padding: 0;
} */
</style>
