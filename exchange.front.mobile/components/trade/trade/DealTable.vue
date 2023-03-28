<template>
  <!-- 交易--币币页面盘口块价格信息表  -->
  <!-- PS: 高度没有设置,宽度为100% -->
  <!-- 效果: 传进来一个数组对象  返回盘口价格信息表 -->
  <view class="deal-price">
    <view class="price-head">
      <view>盘口</view>
      <view>价格</view>
      <view>数量</view>
    </view>
    <view class="price-table" @tap="onTape(item.a2)" v-for="(item, value) in priceTape" :key="value">
      <view class="fs-sm c-tip mb-10">{{ item.a1 }}</view>
      <view class="fs-sm c-down mb-10">{{ item.a2 }}</view>
      <view class="fs-sm c-tip mb-10">{{ item.a3 }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    priceTape: {
      type: [Object, Array],
      default() {}
    }
  },
  methods: {
    onTape(price) {
      this.$emit('cPrice', price)
    }
  }
}
</script>

<style lang="scss" scoped>
.deal-price {
  width: 290rpx;

  .price-head {
    @extend .pb-10;
    display: flex;
    justify-content: space-between;

    & view {
      @extend .fs-sm, .c-tip;
    }
  }

  .price-table {
    @extend .mb-10;
    display: flex;
    justify-content: space-between;
  }
}
</style>

