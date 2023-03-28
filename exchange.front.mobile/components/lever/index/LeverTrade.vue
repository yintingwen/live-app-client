<template>
  <view class="lever-trade">
    <view class="trade-btn">
      <view :class="btnBuyClass" @tap="onBtn('buy')">{{ $t('lever.trade.buy') }}</view>
      <view :class="btnSellClass" @tap="onBtn('sell')">{{ $t('lever.trade.sell') }}</view>
    </view>
    <slot></slot>
    <view
      class="trade-pull"
      :class="btnClass"
      @tap="onTrade"
    >{{ btnContent === 1 ? $t('lever.trade.buy') : $t('lever.trade.sell') }}</view>

    <template>
      <c-confirm ref="popupOrder" custom :title="$t('lever.trade.pop.title')" @confirm="onPopOrderTrue">
        <view class="popup-order">
          <view>
            <view>{{ amonntHead }}</view>
            <view></view>
          </view>
          <view>
            <view>{{ $t('lever.trade.pop.type') }}</view>
            <view>{{ btnContent === 1 ? $t('lever.trade.pop.typeMore') : $t('lever.trade.pop.typeMinus')}}</view>
          </view>
          <view>
            <view>{{ $t('lever.trade.pop.hands') }}</view>
            <view>{{ leverInfo.hands }}</view>
          </view>
          <view>
            <view>{{ $t('lever.trade.pop.times') }}</view>
            <view>{{ leverInfo.times }}</view>
          </view>
          <view>
            <view>{{ $t('lever.trade.pop.margin') }}</view>
            <view>{{ `≈${moneyInfo.marginPrice} USDT` }}</view>
          </view>
          <view>
            <view>{{ $t('lever.trade.pop.handing') }}</view>
            <view>{{ `≈${moneyInfo.reservePrice} USDT` }}</view>
          </view>
        </view>
      </c-confirm>
    </template>
  </view>
</template>

<script>
export default {
  props: {
    moneyInfo: {
      default() {}
    },
    leverInfo: {
      default() {}
    },
    leverType: {
      default() {}
    },
    // 左侧币种显示值
    amonntHead: {
      type: String,
      default: 'BTC/USDT'
    }
  },
  data() {
    return {
      btnContent: 1,
      btnClass: 'btn-buyactive',
      btnBuyClass: 'btn-buyactive',
      btnSellClass: 'btn-sellactive-no'
    }
  },
  watch: {
    leverType: {
      handler(val) {
        this.onBtn(val)
      },
      immediate: true
    }
  },
  methods: {
    // 点击 买入/卖出 切换样式
    onBtn(value) {
      if (value === 'buy') {
        this.btnBuyClass = 'btn-buyactive'
        this.btnSellClass = 'btn-sellactive-no'
        this.btnClass = this.btnBuyClass
        this.btnContent = 1
      } else {
        this.btnBuyClass = 'btn-buyactive-no'
        this.btnSellClass = 'btn-sellactive'
        this.btnClass = this.btnSellClass
        this.btnContent = 2
      }
    },
    // 确定下单 通知父组件
    onPopOrderTrue() {
      this.$emit('onTrade', this.btnContent)
    },
    // 点击确定下单
    onTrade() {
      let info = this.leverInfo
      if (info.price === 0 || !info.price) {
        this.toast('lever.trade.pop.priceWarning')
      } else if (info.hands === 0 || !info.hands) {
        this.toast('lever.trade.pop.numWarning')
      } else {
        this.$refs.popupOrder.open()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-trade {
  width: 375rpx;
  margin-top: 26rpx;
  margin-bottom: 24rpx;
  .trade-btn {
    display: flex;
    view {
      height: 66rpx;
      width: 50%;
      margin-bottom: 22rpx;
      text-align: center;
      line-height: 66rpx;
    }
  }
  .trade-pull {
    @include size(375, 66);
    text-align: center;
    line-height: 66rpx;
  }
  .btn-buyactive {
    @extend .c-white, .bgc-up;
  }
  .btn-buyactive-no {
    @extend .c-up;
    background-color: #eeeeee;
  }
  .btn-sellactive {
    @extend .c-white;
    background-color: #d72143;
  }
  .btn-sellactive-no {
    @extend .c-text;
    background-color: #eeeeee;
  }
  .popup-order {
    padding: 0 100rpx 30rpx 100rpx;
    & > view {
      @extend .fs-md, .c-text, .mb-20;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>