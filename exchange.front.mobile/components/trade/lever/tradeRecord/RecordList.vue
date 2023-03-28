<template>
  <view class="deal-list">
    <view class="deal-item" v-for="item in list" :key="item.id">
      <view class="item-info">
        <view class="mb-10 d-flex jc-between ai-center lh-3">
          <view>{{item.type_name}} {{item.symbol}} x{{item.share}} No.{{item.id}}</view>
          <view>
            <text
              class="mr-10"
              :class="[Number(item.profits) <= 0 ? 'c-down': 'c-up']"
            >{{Number(item.profits).toFixed(4)}}</text>
            <text class="c-active">{{getStatusStr(item.status)}}</text>
          </view>
        </view>
        <view class="info-content">
          <view v-if="[1,4].includes(item.status)">
            <view>委托价</view>
            <view class="mt-10 c-active">{{item.origin_price.slice(0,6)}}</view>
          </view>
          <view v-if="[1,2,3].includes(item.status)">
            <view>开仓价</view>
            <view class="mt-10 c-active">{{item.price.slice(0,6)}}</view>
          </view>
          <view>
            <view>当前价</view>
            <view class="mt-10 c-active">{{item.update_price.slice(0,6)}}</view>
          </view>
          <view>
            <view>保证金</view>
            <view class="mt-10 c-active">{{item.origin_caution_money.slice(0,6)}}</view>
          </view>
          <view>
            <view>止盈价</view>
            <view class="mt-10 c-active">{{item.target_profit_price.slice(0,6)}}</view>
          </view>
          <view>
            <view>止损价</view>
            <view class="mt-10 c-active">{{item.stop_loss_price.slice(0,6)}}</view>
          </view>
          <view>
            <view>可用保证金</view>
            <view class="mt-10 c-active">{{item.caution_money.slice(0,6)}}</view>
          </view>
          <view>
            <view>开仓时间</view>
            <view class="mt-10 c-active">{{item.time}}</view>
          </view>
          <view v-if="item.status === 3">
            <view>平仓时间</view>
            <view class="mt-10 c-active">{{item.complete_time}}</view>
          </view>
          <view>
            <view>折合数量</view>
            <view class="mt-10 c-active">{{item.number.slice(0, 7)}}</view>
          </view>
          <view>
            <view>手续费</view>
            <view class="mt-10 c-active">{{item.trade_fee.slice(0,6)}}</view>
          </view>
          <view>
            <view>隔夜费</view>
            <view class="mt-10 c-active">{{item.overnight_money.slice(0,6)}}</view>
          </view>
        </view>
      </view>
      <view class="item-options">
        <button v-if="item.status === 1" @tap="onTapClose(item.id)" type="primary" class="grace-button">平仓</button>
        <button v-if="item.status === 0" @tap="onTapCancel(item.id)" type="primary" class="grace-button">撤单</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    /**
     * 获取状态对应名称
     */
    getStatusStr(index) {
      return ['挂单中', '交易中', '平仓中', '已平仓', '已撤单'][index]
    },
    onTapClose(id) {
      this.$emit('leverClose', id)
    },
    onTapCancel(id) {
      this.$emit('leverCancel', id)
    }
  }
}
</script>
<style lang='scss' scoped>
.deal-list {
  @extend .mx-10;

  .deal-item {
    @extend .mt-10, .pb-10;
  }

  .item-info {
    @extend .mb-10;
    @include border('0', 't');
    @include border('0', 'b');
  }

  .info-content {
    @extend .ta-center, .d-flex, .fw-wrap;
    > view {
      // float: left;
      // height: 100rpx;
      width: 33.33%;
      margin-bottom: 20rpx;
    }
  }

  .item-options {
    @extend .d-flex, .jc-end, .ai-center;

    button {
      width: 160rpx;
      margin: 0;
      margin-left: 20rpx;
    }
  }
}
</style>