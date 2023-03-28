<template>
  <view class="shop-deal">
    <view class="title">{{title}}</view>
    <view class="deal-list">
      <view class="deal-item" v-for="item in deals" :key="item.id" @tap="onTapDeal(item.id)">
        <view class="mb-25">
          <c-icon class="mr-20" :name="item.currency_name" type="img" size="40"></c-icon>
          <text>{{item.currency_name}}</text>
        </view>
        <view class="mb-25 flex-between fs-xxxs c-tip1">
          <text>{{ $t('common.number') }} {{item.total_number}} {{item.currency_name}}</text>
          <text>{{ $t('common.unit_price') }}</text>
        </view>
        <view class="mb-20 flex-between fs-xxxs c-tip1">
          <text>{{ $t('common.quota') }} ￥{{item.limitation.min}} - ￥{{item.limitation.max}}</text>
          <text class="fs-lg fw c-primary">￥{{item.price}}</text>
        </view>
        <view class="flex-between">
          <view>
            <c-icon v-if="item.way === 'ali_pay'" name="alipay" size="36" color="#00abf2"></c-icon>
            <c-icon v-if="item.way === 'we_chat'" name="wechat" size="36" color="#6bca36"></c-icon>
            <c-icon v-if="item.way === 'bank'" name="card" size="36" color="#f39921"></c-icon>
          </view>
          <view>
            <button type="primary" class="button grace-button">{{button}}</button>
          </view>
        </view>
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
    title: { type: String },
    deals: { type: Array },
    button: { type: String }
  },
  methods: {
    onTapDeal (id) {
      this.$emit('tapDeal', id)
    }
  }
}
</script>
<style lang='scss' scoped>
.shop-deal {
  border-top: 20rpx solid #eeeeee;

  .title {
    padding: 30rpx;
    border-bottom: 1px solid #eeeeee;
    color: #333;
  }

  .deal-list {
    .deal-item {
      padding: 30rpx;
      border-bottom: 1rpx solid #eeeeee;

      button {
        @extend .bgc-primary;
        color: white;
        font-size: 24rpx;
        width: 153rpx;
        height: 54rpx;
        line-height: 54rpx;
      }
    }
  }
}
</style>