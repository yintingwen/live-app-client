<template>
  <view class="home-market" v-if="marketData.length">
    <block v-for="item in marketData" :key="item.id">
      <block v-for="currency in item.value" :key="currency.id">
        <view class="market-item" @tap="onTapMarket(currency, item.id, getDigit(currency))">
          <view class="left">
            <c-icon class="mr-20" :name="currency.currencyName" type="img" size="55" imgHeight="55"></c-icon>
            <view>
              <view class="mb-10">
                <text class="fs-md fw">{{currency.currencyName}}</text>
                <text class="fs-xs">/{{currency.baseCurrencyName}}</text>
              </view>
              <view class="fs-xs">{{ $t(`currency.${currency.currencyName}`) }}</view>
            </view>
          </view>
          <view class="f-1">
            <view
              class="fs-xl fw mb-10"
              :class="[currency.range >=0 ? 'c-up' : 'c-down']"
            >{{ currency.close.toFixed(getDigit(currency).price_digit || 2) }}</view>
            <view class="fs-xs">≈ {{ (currency.close * cnyPrice).toFixed(getDigit(currency).price_digit || 2) }} CNY</view>
          </view>
          <view class="range" :class="[currency.range >=0 ? 'bgc-up' : 'bgc-down']">{{currency.range.toFixed(2)}}%</view>
        </view>
      </block>
    </block>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters('currency', ['symbolDigitData', 'cnyPrice'])
  },
  props: {
    marketData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    onTapMarket (item, legalId, digit) {
      const params = {
        close: item.close,
        low: item.low,
        high: item.high,
        amount: item.amount,

        currency_name: item.currencyName,
        currency_id: item.id,
        legal_name: item.baseCurrencyName,
        legal_id: legalId,
        price_digit: digit.price_digit,
        number_digit: digit.number_digit
      }
      this.$emit('tapItem', params)
    },
    getDigit (currency) {
      return this.symbolDigitData[`${currency.currencyName}/${currency.baseCurrencyName}`]
    }
  }
}
</script>
<style lang='scss' scoped>
.home-market {
  padding: 0 28rpx;
  border-radius: 10rpx 15rpx 0 0;

  .market-item {
    height: 121rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ececec;

    .left {
      display: flex;
      align-items: center;
      width: 296rpx;
    }

    .range {
      width: 129rpx;
      height: 57rpx;
      line-height: 57rpx;
      text-align: center;
      color: white;
      border-radius: 6px;
    }
  }
}
</style>