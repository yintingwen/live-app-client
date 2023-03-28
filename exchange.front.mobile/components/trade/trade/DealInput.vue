<template>
  <!-- 交易--合约--合约下单页面--输入框 -->
  <view class="deal-input">
    <input :value="value" @input="$emit('input', $event.target.value)" type="confirmtype" :placeholder="placeName" />
  </view>
</template>

<script>
export default {
  props: {
    placeName: {
      // 输入框的默认显示值
      type: String,
      default: '请输入购买手数'
    },
    decideIsNum: {
      // 需不需要判断是否为数字(暂时没用到)
      type: Boolean,
      default: true
    },
    value: {
      // 作为 v-model 语法糖预留
    }
  },
  data() {
    return {
      timeOut: null
    }
  },
  methods: {
    // 判断是否为数字类型
  }
}
</script>

<style lang="scss" scoped>
.deal-input {
  @include size(394rpx, 68rpx);
  @include border('0');
  @extend .pl-10;
  border-radius: 10rpx;
  input {
    @extend .c-white;
    @include size(394rpx, 68rpx);
    line-height: 68rpx;
  }
}
</style>