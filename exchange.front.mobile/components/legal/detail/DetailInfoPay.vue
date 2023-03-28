<template>
  <view class="detail-info-pay">
    <view class="header">
      <view class="d-flex jc-between ai-center">
        <view class="price">
          <text class="mr-15">￥</text>
          <text>{{Number(meta.deal_money).toFixed(3)}}</text>
        </view>
        <view class="d-flex ai-center">
          <view class="mr-45">
            <view class="fs-xxxs mb-10">{{ $t('legal.detail.price') }}</view>
            <view class="fs-xxxs">{{ $t('legal.detail.quantity') }}</view>
          </view>
          <view>
            <view class="fs-xxxs mb-10">￥{{toFixed(meta.price,3)}}</view>
            <view class="fs-xxxs">{{toFixed(meta.number,3)}} {{meta.currency_name}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="body">
      <view class="info pb-20">
        <view class="mb-30">
          <view class="mb-15 fs-xxxxxs">{{ $t('legal.detail.pay_info') }}</view>
          <view class="pay-info">
            <text>{{meta.way_name}}</text>
            <text>{{meta.hes_account}}</text>
          </view>
        </view>
        <view class="flex-between fs-xxxxxs mb-30">
          <text class="base-color">{{ $t('legal.detail.payee') }}</text>
          <text>{{meta.hes_realname}}</text>
        </view>
        <view class="flex-between fs-xxxxxs">
          <text class="base-color">{{ $t('legal.detail.ref_no') }}</text>
          <view class="fs-xxxxxs" @tap="onTapId">
            {{meta.order_id}}
            <c-icon name="copy" class="ml-10" size="9"></c-icon>
          </view>
        </view>
      </view>
      <view class="mt-25 mb-45 c-primary fs-xxxxxs lh-1-5">{{ $t('legal.detail.tip.pay') }}</view>
      <view class="flex-between">
        <view class="cancel-button" @tap="onTapCancel">{{ $t('legal.detail.cancel_order') }}</view>
        <view class="confirm-button" @tap="onTapPay">{{ $t('legal.detail.pay_confirm') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    meta: {
      type: Object
    },
    auth: {
      type: String
    }
  },
  methods: {
    /**
     * 点击参考号
     */
    onTapId () {
      uni.setClipboardData({
        data: this.meta.id
      })
    },
    /**
     * 点击按钮
     */
    onTapCancel () {
      this.$emit('orderCancel')
    },
    onTapPay () {
      this.$emit('orderConfirm')
    }
  }
}
</script>
<style lang='scss' scoped>
.detail-info-pay {
  @extend .mx-30;
  border-radius: 10rpx;
  box-shadow: 0 3rpx 7rpx rgba(0, 0, 0, 0.35);

  .header {
    @extend .p-30;
    background-color: #f3f4ff;

    .price {
      font-size: 40rpx;
    }

    view {
      color: #76889e;
    }
  }

  .body {
    @extend .p-30;

    .info {
      border-bottom: 1rpx solid #333333;
    }

    .pay-info {
      @extend .flex-between;
      background: #f3f4ff;
      padding: 19rpx 34rpx;
      font-size: 18rpx;
    }

    .confirm-button,
    .cancel-button {
      font-size: 22rpx;
      text-align: center;
      height: 70rpx;
      line-height: 70rpx;
    }

    .cancel-button {
      background-color: #eeeeee;
      width: 241rpx;
    }

    .confirm-button {
      @extend .bgc-primary, .c-white;
      width: 368rpx;
    }
  }
  .base-color {
    color: #76889e;
  }
}
</style>