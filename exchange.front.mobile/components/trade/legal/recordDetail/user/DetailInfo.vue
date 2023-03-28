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
          <text class="mr-5">{{meta.seller_name}}</text>
          <text class="iconfont icon-vip c-vip"></text>
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

    <view class="d-flex ai-center jc-end p-10 pt-0">
      <button v-if="!isBuy && status ===3" type="primary" class="grace-button" @tap="onTapSure">确认已收款</button>
    </view>

    <c-confirm ref="sure" @confirm="onConfirmSure">请确认卖家已向您付款</c-confirm>
  </view>
</template>

<script>
import { tradeApi } from '../../../../../api'

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
    isBuy() {
      return this.meta.type === 'sell'
    },
    status() {
      return this.meta.is_sure
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
     * 确定收款
     */
    async onConfirmSure() {
      uni.showLoading()
      try {
        const params = {
          id: this.meta.id
        }
        const message = await this.api.trade.legal.user.sure(params)
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