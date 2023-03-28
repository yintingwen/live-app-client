<template>
  <view class="detail-info">
    <view class="base top">
      <view>交易总额</view>
      <view class="mt-10 fs-xl">￥{{Number(meta.deal_money).toFixed(3)}}</view>
    </view>
    <view class="base bottom">
      <!-- 买家/卖家名 -->
      <view class="bottom-item">
        <view>{{ isBuy ? '卖家' : '买家'}}</view>
        <view class="flex-center">
          <text class="mr-5">{{meta.account_number}}</text>
        </view>
      </view>
      <!-- 单价 -->
      <view class="bottom-item">
        <view>单价</view>
        <view>￥{{Number(meta.price).toFixed(3)}}</view>
      </view>
      <!-- 数量 -->
      <view class="bottom-item">
        <view>数量</view>
        <view>{{`${Number(meta.number).toFixed(3)} ${meta.currency_name}`}}</view>
      </view>
      <!-- 下单时间 -->
      <view class="bottom-item">
        <view>下单时间</view>
        <view>{{meta.format_create_time}}</view>
      </view>
      <!-- 参考号 -->
      <view class="bottom-item">
        <view class="flex-center">
          <text class="mr-5">参考号</text>
          <text class="iconfont icon-question"></text>
        </view>
        <view>{{meta.id}}</view>
      </view>
    </view>
    <!-- 底部按钮 -->
    <block>
      <!-- 求购的按钮 -->
      <view v-if="isBuy && status === 0" class="d-flex p-10 pt-0">
        <view @tap="onTapCancel" class="f-1 mr-10 bgc-gray2 px-15 py-10 flex-center c-white">取消订单</view>
        <view @tap="onTapPay" class="f-2 bgc-active px-15 py-10 flex-center c-white">我已付款,请点击确认</view>
      </view>
      <!-- 出售的按钮 -->
      <view v-if="!isBuy" class="d-flex ai-center jc-end p-10 pt-0">
        <button v-if="status === 3" type="primary" class="grace-button" @tap="onTapSure">确认已收款</button>
      </view>
    </block>

    <!-- 确认框 -->
    <c-confirm ref="sure" @confirm="onConfirmSure">请确认卖家已向您付款</c-confirm>
    <c-confirm ref="cancel" @confirm="onConfirmCancel">如果您已向卖家付款,请千万不要取消交易</c-confirm>
    <c-confirm ref="pay" @confirm="onConfirmPay">请确认您已向卖家付款</c-confirm>
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
  computed: {
    isSeller() {
      return this.user === 'seller'
    },
    isUser() {
      return !this.isSeller
    },
    status() {
      return this.meta.is_sure
    },
    isBuy() {
      return this.meta.type === 'buy'
    }
  },
  methods: {
    /**
     * 点击确认收款
     */
    onTapSure() {
      this.$refs.sure.open()
    },
    /**
     * 点击取消订单
     */
    onTapCancel() {
      this.$refs.cancel.open()
    },
    /**
     * 点击已付款确认
     */
    onTapPay() {
      this.$refs.pay.open()

      // this.confirmPay()
    },

    /**
     * 确定已收款
     */
    async onConfirmSure() {
      uni.showLoading()
      try {
        const params = {
          id: this.meta.id
        }
        const message = await this.api.trade.legal.seller.sure(params)
        uni.showToast({
          title: message,
          duration: 2000
        })
        this.$emit('change')
      } catch {}
      uni.hideLoading()
    },
    /**
     * 点击确定取消订单
     */
    onConfirmCancel() {
      this.cancelDeal()
    },
    /**
     * 点击确定已支付
     */
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
     * 确定支付
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
.detail-info {
  @extend .mx-15, .mt-20, .bgc-white;
  border-radius: 10rpx;

  .base {
    @extend .p-15, .c-black;
  }

  .top {
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
    .bottom-item {
      @extend .d-flex, .jc-between, .ai-center, .py-10;
    }
  }

  .grace-button {
    margin: 0;
  }
}
</style>