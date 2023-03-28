<template>
  <view class="detail-info">
    <view class="mb-30 flex-between">
      <view>
        <view class="c-tip2 fs-xxs mb-20">{{ $t('legal.all_price') }}</view>
        <view class="mt-10 fs-xxxxxl">￥{{ toFixed(meta.deal_money, 3 )}}</view>
      </view>
      <view @tap="onTapCall">
        <c-icon name="phone" class="c-primary" size="40"></c-icon>
      </view>
    </view>
    <!-- 买家/卖家 -->
    <view class="flex-between mb-55">
      <text>{{ $t(`legal.detail.${isBuy ? 'seller' : 'buyer'}`) }}</text>
      <text>{{ isSeller ? meta.account_number : meta.seller_name }}</text>
    </view>
    <!-- 单价 -->
    <view class="flex-between mb-55">
      <view>{{ $t('legal.deal.price') }}</view>
      <view>￥{{toFixed(meta.price,3)}}</view>
    </view>
    <!-- 数量 -->
    <view class="flex-between mb-55">
      <view>{{ $t('common.number') }}</view>
      <view>{{`${toFixed(meta.number, 3)} ${meta.currency_name}`}}</view>
    </view>
    <!-- 下单时间 -->
    <view class="flex-between mb-55">
      <view>{{ $t('legal.detail.order_time') }}</view>
      <view>{{meta.format_create_time}}</view>
    </view>
    <!-- 参考号 -->
    <view class="flex-between mb-55">
      <view class="base-color">
        <text class="mr-10">{{ $t('legal.detail.ref_no') }}</text>
        <c-icon name="why"></c-icon>
      </view>
      <view @tap="onTapId">
        {{meta.order_id}}
        <c-icon name="copy" class="ml-10"></c-icon>
      </view>
    </view>
    <!-- 确认收款按钮 -->
    <button v-if="!isBuy && status ===3" class="c-button" @tap="onTapSure">{{ $t('legal.detail.collection') }}</button>
    <!-- 申诉按钮 -->
    <button v-if="isBuy && status ===3" class="c-button" @tap="onTapAppeal">{{ $t('common.appeal') }}</button>
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
  computed: {
    isBuy () {
      const flag = this.isSeller ? 'buy' : 'sell'
      return this.meta.type === flag
    },
    status () {
      return this.meta.is_sure
    },
    isSeller () {
      return this.auth === 'seller'
    }
  },
  methods: {
    /**
     * 点击确认收款
     */
    onTapSure () {
      this.$emit('orderSure')
    },
    /**
     * 点击申诉
     */
    onTapAppeal () {
      this.$emit('orderAppeal')
    },
    /**
     * 联系tap事件
     */
    onTapCall () {
      this.call()
    },
    /**
     * 点击参考号
     */
    onTapId () {
      uni.setClipboardData({
        data: this.meta.id
      })
    },
    /**
     * 打电话
     */
    call () {
      const phoneNumber = this.isSeller ? this.meta.account_number : this.meta.seller_phone
      uni.makePhoneCall({
        phoneNumber
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.detail-info {
  @extend .mx-30, .mt-20;
}
</style>