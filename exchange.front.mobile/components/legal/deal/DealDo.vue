<template>
  <uni-popup ref="trade" type="bottom" @change="onChangeTrade" v-if="Object.keys(dealInfo).length">
    <view class="do-deal-container">
      <!-- 头部描述 -->
      <view class="header">
        <view>
          <view class="fs-xxl mb-20">
            <text class="mr-15">{{$t(typeString)}}</text>
            <text class="fw">{{currencyName}}</text>
          </view>
          <view class="fs-sm">
            <text class="mr-15">{{ $t('legal.deal.price') }}</text>
            <text class="c-primary">{{dealInfo.price.slice(0,-2)}}</text>
          </view>
        </view>
        <c-icon :name="currencyName" type="img" size="60" imgHeight="60"></c-icon>
      </view>
      <!-- 交易主体 -->
      <view class="body">
        <grace-nav-bar
          :items="tradeTypes"
          :currentIndex="tradeIndex"
          lineHeight="1"
          activeLineBg="#4f5cd1"
          activeLineHeight="1rpx"
          activeLineWidth="120rpx"
          activeColor="#4f5cd1"
          textAlign="center"
          fontSize="26rpx"
          :margin="30"
          @change="onChangeNavBar"
        ></grace-nav-bar>
        <view class="input">
          <block>
            <input
              v-if="isMoney"
              v-model="money"
              class="fs-sm"
              type="number"
              :placeholder="$t('legal.deal.placehold.cny')"
            />
            <input v-else v-model="number" class="fs-sm" type="number" :placeholder="$t('legal.deal.placehold.number')" />
          </block>
          <view class="d-flex">
            <view class="c-tip2">{{isMoney ? 'CNY' : currencyName }}</view>
            <view class="mx-30 c-tip2">|</view>
            <view class="c-primary" @tap="onTapAll">{{isBuy ? $t('legal.deal.all_buy') : $t('legal.deal.all_sell') }}</view>
          </view>
        </view>
        <view
          class="mt-25 fs-sm c-tip1"
        >{{`${$t('legal.deal.limit')} ￥ ${dealInfo.limitation.min.slice(0,-2)} - ￥ ${dealInfo.limitation.max.slice(0,-2)}`}}</view>
        <view class="flex-between mt-25 fs-sm c-tip1">
          <text>{{ $t('legal.all_price') }}</text>
          <text>￥ {{totalPrice}}</text>
        </view>
        <view class="flex-between mt-30">
          <button class="cancel" @tap="onTapCancel">{{timeout}}s {{ $t('legal.deal.auth_cancel') }}</button>
          <button class="bgc-primary c-white" @tap="onTapDo">{{$t('legal.deal.orders')}}</button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import GraceNavBar from '../../../utils/graceUI/components/graceNavBar'
import UniPopup from '../../common/uni-popup'

export default {
  data () {
    return {
      tradeTypes: [this.$t('legal.deal.CNY_deal'), this.$t('legal.deal.buy_num')],
      tradeIndex: 0,
      money: '', // 价格
      number: '', // 数量
      timeout: 0, // 计时
      timer: 0 // 计时器id
    }
  },
  computed: {
    // 是否购买
    isBuy () {
      return this.dealInfo.type === 'sell'
    },
    // 购买/出售
    typeString () {
      return this.isBuy ? 'common.buy' : 'common.sell'
    },
    // 是否使用法币下单
    isMoney () {
      return !this.tradeIndex
    },
    // 货币名称
    currencyName () {
      return this.dealInfo.currency_name
    },
    // 下单的表单
    form () {
      return {
        id: this.dealInfo.id,
        means: this.tradeIndex ? 'number' : 'money',
        value: this.tradeIndex ? this.number : this.money
      }
    },
    // 总交易额
    totalPrice () {
      if (!this.form.value) {
        return '0.00'
      }
      if (this.isMoney) {
        return this.money
      } else {
        return (this.number * this.dealInfo.price).toFixed(3)
      }
    }
  },
  props: {
    dealInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 弹框状态发生改变
    onChangeTrade (e) {
      if (e.show) {
        uni.hideTabBar()
        this.timeout = 60
        this.timer = setInterval(() => {
          --this.timeout
          if (this.timeout === 0) {
            clearInterval(this.timer)
            this.$emit('cancel')
          }
        }, 1000)
      } else {
        this.number = ''
        this.money = ''
        this.tradeIndex = 0
        clearInterval(this.timer)
        uni.showTabBar()
      }
    },
    // 交易类型发生改变
    onChangeNavBar (e) {
      this.tradeIndex = e
    },
    // 全部
    onTapAll () {
      const max = this.dealInfo.limitation.max // 最高限额
      const userBalance = this.dealInfo.user_legal_balance // 用户剩余法币
      const tradeType = this.tradeIndex // 交易类型
      const input = this.isMoney ? 'money' : 'number'
      if (this.isBuy) {
        this[input] = this.isMoney ? max : this.dealInfo.surplus_number
      } else {
        this[input] = this.isMoney ? userBalance * this.dealInfo.price : userBalance
      }
    },
    // 点击取消
    onTapCancel () {
      this.$emit('cancel')
    },
    // 点击下单
    onTapDo () {
      if (!this.form.value) {
        return this.toast(this.isMoney ? 'legal.deal.placehold.cny' : 'legal.deal.placehold.number')
      }
      this.$emit('confirm', this.form)
    },
    // 打开
    open () {
      this.$refs.trade.open()
    },
    // 关闭
    close () {
      this.$refs.trade.close()
    }
  },
  components: {
    GraceNavBar,
    UniPopup
  }
}
</script>
<style lang='scss' scoped>
.do-deal-container {
  @extend .bgc-white;

  .header {
    @extend .flex-between;
    background-color: #f3f4ff;
    padding: 28rpx;
  }

  .body {
    padding: 28rpx;

    .input {
      @extend .mt-30, .flex-between;
      border: 1rpx solid #666666;
      padding: 29rpx;
    }
  }
  button {
    width: 333rpx;
    height: 99rpx;
    line-height: 99rpx;
    margin: 0;
    font-size: 26rpx;

    &::after {
      border-radius: 0;
      border: 0;
    }

    &.cancel {
      background-color: #eee;
      color: #333333;
    }
  }
}
</style>