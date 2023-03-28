<template>
  <view class="inp" :class="border ? 'bb-g0' : ''">
    <text v-if="!isTap" :title="title" @tap="onTap">{{title}}</text>
    <text v-else :title="title" @tap="onTap" class="c-primary">{{title}}</text>
    <input
      class="ta-right"
      :type="type"
      :placeholder="placeholder"
      placeholder-class="ph"
      @input="onInputValue"
      :value="value"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    isTap: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onInputValue(e) {
      this.$emit('input', e.detail.value.trim())
    },
    onTap() {
      this.$emit('ontap')
    }
  }
}
</script>

<style lang='scss' scoped>
.inp {
  @extend .d-flex, .jc-between, .ai-center;
  height: 88rpx;
  text{
    white-space: nowrap;
  }
  .ph {
    @extend .fs-md, .ta-right;
    color: #ccc;
  }
}
</style>