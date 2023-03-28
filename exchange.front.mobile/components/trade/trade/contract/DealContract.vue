<template>
  <!-- 交易--合约页面 -->
  <view class="deal-contract">
    <!-- 副头部 -->
    <deal-header @onDrawer="getStorLever" :amonntHead="amonntHead" :entrustTape="entrustTape" :headerShow="false">
      <view class="contract-head">
        <view @tap="onHead(1)" :class="{'head-bgc': headBgc}">合约下单</view>
        <view @tap="onHead(2)" :class="{'head-bgc': !headBgc}">合约特仓</view>
      </view>
    </deal-header>

    <!-- 交易--合约--合约下单页面 -->
    <contract-orders v-if="headBgc"></contract-orders>

    <!-- 交易--合约--合约持仓页面 -->
    <contract-storage v-if="!headBgc"></contract-storage>
  </view>
</template>

<script>
import dealHeader from '../DealHeader'
import contractOrders from './orders/ContractOrders'
import contractStorage from './storage/ContractStorage'

export default {
  data() {
    return {
      entrustTape: [],
      headBgc: true,
      amonntHead: ''
    }
  },
  created() {
    this.getCurrencyList()
    this.getStorLever()
  },
  methods: {
    // 获取左侧弹框的币种列表数据
    async getCurrencyList() {
      try {
        this.entrustTape = await this.api.currency.amonntList()
      } catch {
        console.log('getCurrencyList报错')
      }
    },
    // 点击合约下单
    onHead(index) {
      if (index === 1) {
        this.headBgc = true
      } else {
        this.headBgc = false
      }
    },
    // 获取storage中lever
    getStorLever() {
      try {
        let getStorages = uni.getStorageSync('lever')
        if (!getStorages) {
          this.amonntHead = 'BTC/USDT'
        } else {
          this.amonntHead =
            getStorages.currency_name + '/' + getStorages.legal_name
        }
      } catch (error) {
        console.log('amonntHead错误')
      }
    }
  },
  components: {
    dealHeader,
    contractOrders,
    contractStorage
  }
}
</script>

<style scoped lang="scss">
.contract-head {
  @extend .bgc-view;
  @include border('2');
  border-radius: 30rpx;
  display: flex;
  view {
    @include size(148rpx, 62rpx);
    @extend .fs-md, .c-white, .fw;
    border-radius: 30rpx;
    text-align: center;
    line-height: 62rpx;
  }
  .head-bgc {
    @extend .bgc-active;
  }
}
</style>
