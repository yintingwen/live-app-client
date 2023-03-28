<template>
  <!-- 弹出中部窗体设置止盈止损内容操作 storage-action -->
  <view class="storage-action">
    <view class="action-title">设置止盈止损</view>
    <view class="action-stop">
      <view class="fs-md mt-5">止盈价:</view>
      <view class="stop-content">
        <view @tap="onPayofMinus">-</view>
        <input type="confirmtype" v-model="payoffPrice" step="0.01" />
        <view @tap="onPayofAdd">+</view>
      </view>
    </view>
    <view class="action-futer">
      <view>预期盈利:</view>
      <view class="c-active ml-5">0.00</view>
    </view>
    <view class="action-stop">
      <view class="fs-md mt-5">止损价:</view>
      <view class="stop-content">
        <view @tap="onLossMinus">-</view>
        <input type="confirmtype" v-model="lossPrice" step="0.01" />
        <view @tap="onLossAdd">+</view>
      </view>
    </view>
    <view class="action-futer">
      <view>预期亏损:</view>
      <view class="c-active ml-5">0.00</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      payoffPrice: '0.00',
      lossPrice: '0.00'
    }
  },
  methods: {
    // 点击止盈-
    onPayofMinus() {
      this.payoffPrice = (Number(this.payoffPrice) - 0.01).toFixed(2)
    },
    // 点击止盈+
    onPayofAdd() {
      this.payoffPrice = (Number(this.payoffPrice) + 0.01).toFixed(2)
    },
    // 点击止损-
    onLossMinus() {
      this.lossPrice = (Number(this.lossPrice) - 0.01).toFixed(2)
    },
    // 点击止损+
    onLossAdd() {
      this.lossPrice = (Number(this.lossPrice) + 0.01).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-action {
  text-align: center;
  & > view {
    @extend .mb-20;
  }
  .action-title {
    @extend .fs-lg, .fw;
  }
  .action-stop {
    display: flex;
    .stop-content {
      display: flex;
      input {
        @include border('1', 't');
        @include border('1', 'b');
        @include size(200rpx, 60rpx);
        text-align: center;
        line-height: 60rpx;
      }
      view {
        @extend .fw, .fs-xxl;
        @include border('1');
        @include size(60rpx, 60rpx);
        text-align: center;
        line-height: 60rpx;
      }
    }
  }
  .action-futer {
    display: flex;
  }
}
</style>