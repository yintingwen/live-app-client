<template>
  <view class="lever-input-center">
    <view @tap="onInputBtn('minus')">-</view>
    <input
      type="number"
      :placeholder="placeholder"
      placeholder-class="placeholder"
      :value="value"
      @input="inputChange($event)"
      step="0.01"
    />
    <view @tap="onInputBtn('add')">+</view>
  </view>
</template>

<script>
export default {
  props: {
    // 要传进来的默认值
    value: {
      default() {}
    },
    // 默认值
    placeholder: {
      default() {}
    }
  },
  methods: {
    onInputBtn(value) {
      this.$emit('onInputBtn', value)
    },
    inputChange(e) {
      this.$emit('input', e.target.value)
    },
    inputBlur(e) {
      const value = Number(e.detail.value)
      if (!isNaN(value) && /(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(value)) {
        console.log('正确输入')
      } else {
        console.log('错误输入')
        this.$emit('inputWrang')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-input-center {
  display: flex;
  border: 1px solid #dedede;
  input {
    @extend .fs-xs;
    @include size(229, 58);
    border-right: 1px solid #dedede;
    border-left: 1px solid #dedede;
    text-align: center;
    line-height: 58rpx;
  }
  view {
    @include size(72, 58);
    color: #4f5cd1;
    font-size: 42rpx;
    text-align: center;
    line-height: 58rpx;
  }
  .placeholder {
    @extend .fs-xs, .c-tip2;
  }
}
</style>