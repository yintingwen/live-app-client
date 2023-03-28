<template>
  <view class="detail-info-pay">
    <view class="base top">
      <view>请向以下账户付款</view>
      <view class="d-flex jc-between ai-center">
        <view class="fs-xxl">￥{{Number(meta.deal_money).toFixed(3)}}</view>
        <view class="d-flex ai-center">
          <view class="mr-5">
            <view class="fs-sm mb-5">交易单价</view>
            <view class="fs-sm">交易数量</view>
          </view>
          <view>
            <view class="ta-right fs-sm mb-5">￥{{Number(meta.price).toFixed(3)}}</view>
            <view class="ta-right fs-sm">{{Number(meta.number).toFixed(3)}} {{meta.currency_name}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="base bottom">
      <view class="item-grop">
        <view class="bottom-item">
          <view>付款信息</view>
          <view>{{meta.way_name}}</view>
        </view>
        <view class="bottom-item bgc-gray1 fs-sm c-black pl-10">{{meta.hes_account}}</view>
        <view class="bottom-item">
          <view>收款人</view>
          <view>{{meta.hes_realname}}</view>
        </view>
        <view class="bottom-item">
          <view>参考号</view>
          <view>{{meta.id}}</view>
        </view>
      </view>
      <view class="py-10 c-active fs-sm lh-1-5">如您已向卖家转账付款，请务必点击右下角“我已付款”按钮，否则有可能造成资金损失。</view>
      <view class="d-flex">
        <view @tap="onTapCancel" class="f-1 mr-10 bgc-gray2 px-15 py-10 flex-center c-white">取消订单</view>
        <view @tap="onTapPay" class="f-2 bgc-active px-15 py-10 flex-center c-white">我已付款,请点击确认</view>
      </view>
    </view>

    <!-- 确认框 -->
    <c-confirm ref="cancel" @confirm="onConfirmCancel">如果您已向卖家付款，请千万不要取消交易</c-confirm>
    <c-confirm ref="pay" @confirm="onConfirmPay">
      <view>请确认您已向卖家付款</view>
      <view>恶意点击将直接冻结账户</view>
    </c-confirm>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    meta: {
      type: Object
    },
    user: {
      type: String
    }
  },
  methods: {
    /**
     * 点击取消订单按钮
     */
    onTapCancel() {
      this.$refs.cancel.open()
    },
    onTapPay() {
      this.$refs.pay.open()
    },
    /**
     * 取消订单确认框点击确定
     */
    onConfirmCancel() {
      this.cancelDeal()
    },
    onConfirmPay() {
      this.confirmPay()
    },
    /**
     * 取消订单
     */
    async cancelDeal() {
      uni.showLoading()
      try {
        const params = {
          id: this.meta.id
        }
        const message = await this.api.trade.legal.cancelDeal(params)
        uni.showToast({
          title: message,
          duration: 2000
        })
        this.$emit('change')
      } catch {}
      uni.hideLoading()
    },
    /**
     * 确认付款
     */
    async confirmPay() {
      uni.showLoading()
      try {
        const params = {
          id: this.meta.id
        }
        const message = await this.api.trade.legal.confirmPay(params)
        uni.showToast({
          title: message,
          duration: 2000
        })
        this.$emit('change')
      } catch {}
      uni.hideLoading()
    }
  }
}
</script>
<style lang='scss' scoped>
.detail-info-pay {
  @extend .mx-15, .mt-20, .bgc-white;
  border-radius: 10rpx;

  .base {
    @extend .p-15, , .c-black;
  }

  .top {
    @extend .bgc-gray1;
    position: relative;

    &::before,
    &::after {
      @extend .bgc-page;
      @include size(20rpx, 20rpx);
      content: '';
      border-radius: 50%;
      position: absolute;
      bottom: -10rpx;
    }

    &::before {
      right: -10rpx;
    }

    &::after {
      left: -10rpx;
    }
  }

  .bottom {
    .item-grop {
      border-bottom: 1rpx solid #000;
    }

    .bottom-item {
      @extend .d-flex, .jc-between, .ai-center, .py-10;
    }
  }
}
</style>