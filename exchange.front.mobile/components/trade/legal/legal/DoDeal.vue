<template>
  <uni-popup ref="trade" type="bottom" @change="onChangeTrade" v-if="Object.keys(dealInfo).length">
    <view class="do-deal-container">
      <!-- 头部描述 -->
      <view class="bgc-view p-10 flex-between">
        <view>
          <view class="fs-xxl mb-10">{{isBuy ? '购买' : '出售'}} {{currencyName}}</view>
          <view>
            单价
            <text class="c-active">{{dealInfo.price}}</text>
          </view>
        </view>
        <c-icon name="ONT" type="img" size="30"></c-icon>
      </view>
      <!-- 交易主体 -->
      <view class="bgc-page p-10">
        <c-tab :items="tradeTypes" v-model="tradeIndex"></c-tab>
        <view class="mt-10 p-10 b-0 flex-between">
          <block>
            <input v-if="isMoney" v-model="money" type="number" :placeholder="`请输入欲${isBuy ? '购买' : '出售'}的法币总额`" />
            <input v-else v-model="number" type="number" :placeholder="`请输入欲${isBuy ? '购买' : '出售'}的数量`" />
          </block>
          <view class="d-flex">
            <view>{{isMoney ? 'CNY' : currencyName }}</view>
            <view class="mx-10">|</view>
            <view class="c-active" @tap="onTapAll">全部{{isBuy ? '买入' : '卖出'}}</view>
          </view>
        </view>
        <view class="mt-10">{{`限额 ￥ ${dealInfo.limitation.min.slice(0,-2)} - ￥ ${dealInfo.limitation.max.slice(0,-2)}`}}</view>
        <view class="flex-between mt-10">
          <view>总交易额</view>
          <view class="c-active fs-lg">￥ {{totalPrice}}</view>
        </view>
        <view class="flex-between mt-10">
          <button class="bgc-tip" @tap="onTapCancel">{{timeout}} s自动取消</button>
          <button class="bgc-active" @tap="onTapDo">下单</button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import CTab from '../../../common/CTab'

export default {
  data() {
    return {
      tradeTypes: ['CNY交易', '购买数量'],
      tradeIndex: 0,
      money: '', // 价格
      number: '', // 数量
      timeout: 0, // 计时
      timer: 0 // 计时器id
    }
  },
  computed: {
    // 是否购买
    isBuy() {
      return this.dealInfo.type === 'sell'
    },
    // 是否使用法币下单
    isMoney() {
      return !this.tradeIndex
    },
    // 货币名称
    currencyName() {
      return this.dealInfo.currency_name
    },
    // 下单的表单
    form() {
      return {
        id: this.dealInfo.id,
        means: this.tradeIndex ? 'number' : 'money',
        value: this.tradeIndex ? this.number : this.money
      }
    },
    // 总交易额
    totalPrice() {
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
      default() {
        return {}
      }
    }
  },
  methods: {
    // 弹框状态发生改变
    onChangeTrade(e) {
      if (e.show) {
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
      }
    },
    // 全部
    onTapAll() {
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
    onTapCancel() {
      this.$emit('cancel')
    },
    // 点击下单
    onTapDo() {
      if (!this.form.value) {
        return uni.showToast({
          title: `请输入欲${this.isBuy ? '购买' : '出售'}${this.isMoney ? '法币总额' : '数量'}`,
          duration: 2000,
          icon: 'none'
        })
      }
      this.$emit('confirm', this.form)
    },
    // 打开
    open() {
      this.$refs.trade.open()
    },
    // 关闭
    close() {
      this.$refs.trade.close()
    }
  },
  components: {
    CTab
  }
}
</script>
<style lang='scss' scoped>
.do-deal-container {
  button {
    width: 345rpx;
    height: 90rpx;
    line-height: 90rpx;
    margin: 0;
    color: white;
    font-size: 28rpx;
  }
}
</style>