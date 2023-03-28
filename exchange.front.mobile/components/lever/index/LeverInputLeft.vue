<template>
  <view class="lever-input-left">
    <input
      type="text"
      :placeholder="placeholder"
      placeholder-class="placeholder"
      :value="value"
      @input="inputChange($event)"
      step="0.01"
    />
    <view>{{ currencyName }}</view>
  </view>
</template>

<script>
export default {
  props: {
    // 传进来值
    value: {
      default() {}
    },
    // 默认值
    placeholder: {
      default() {}
    },
    // 币种
    currencyName: {
      default() {}
    }
  },
  methods: {
    inputChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-input-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
  padding-left: 10rpx;
  padding-right: 12rpx;
  border: 1px solid #dedede;
  input {
    @extend .fs-xs;
    @include size(290, 58);
    line-height: 58rpx;
  }
  .placeholder {
    @extend .fs-xs, .c-tip2;
  }
  view {
    @extend .fs-xs, .c-tip2;
  }
}
</style>