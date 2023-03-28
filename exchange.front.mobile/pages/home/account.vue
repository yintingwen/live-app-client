<template>
  <view class="account-page">
    <page-layout>
      <!-- 总资产 -->
      <view class="balance" :style="{'background': assetTypeData.bgc}">
        <view class="fs-sm py-45">{{ $t(typeOptions[this.accountType].priceTitle) }}</view>
        <view class="mb-45">
          {{ toFixed(assetTotal, 4) }}
          <text class="fs-sm ml-10">(USDT)</text>
        </view>
        <view class="fs-md">≈ &yen; {{ toFixed(priceTotal, 4) }}</view>
      </view>
      <!-- 功能按钮 -->
      <view class="buttons">
        <!-- 币兑交易 -->
        <navigator
          v-if="['legal', 'coin'].includes(this.accountType)"
          url="/pages/mine/exchange/index"
          class="f-1 flex-center"
        >
          <c-icon name="coin" size="38" color="#57b159" class="mr-25"></c-icon>
          {{ $t('home.account.coin_deal') }}
        </navigator>
        <!-- 合约账单 -->
        <navigator v-else url="/pages/lever/check" class="f-1 flex-center">
          <c-icon name="bill" size="38" color="#57b159" class="mr-25"></c-icon>
          {{ $t('home.account.contract_bills') }}
        </navigator>
        <view class="line"></view>
        <!-- 划转 -->
        <navigator :url="`/pages/mine/fundsTransfer/index?type=${assetTypeData.tage}`" class="f-1 flex-center">
          <c-icon name="transfer" size="38" color="#FF6127" class="mr-25"></c-icon>
          {{ $t('home.account.transferred') }}
        </navigator>
      </view>
      <!-- 边距标题 -->
      <balance-title :accountType="accountType"></balance-title>
      <!-- 余额详情 -->
      <coin-balance v-if="accountType === 'coin'" :balance="assetBalance"></coin-balance>
      <account-right v-if="accountType === 'lever'" :balance="rightData"></account-right>
      <legal-balance v-if="accountType === 'legal'" :balance="assetBalance"></legal-balance>
    </page-layout>
  </view>
</template>

<script>
import BalanceTitle from '../../components/home/account/BalanceTitle'
import CoinBalance from '../../components/home/account/CoinBalance'
import LegalBalance from '../../components/home/account/LegalBalance'
import AccountRight from '../../components/home/account/AccountRight'

import { mapGetters } from 'vuex'


export default {
  data () {
    return {
      accountType: '',
      assetData: {},
      rightData: [],
      typeOptions: {
        'legal': {
          bgc: '#04b0ee',
          wallet: 'legal_wallet',
          pageTitle: 'home.asset.legal',
          priceTitle: 'home.account.legal_valuation',
          tage: 'mine.fundsTransfer.fund'
        },
        'lever': {
          bgc: '#4f5cd1',
          wallet: 'lever_wallet',
          pageTitle: 'home.asset.lever',
          priceTitle: 'home.account.lever_valuation',
          tage: 'mine.fundsTransfer.contract'
        },
        'coin': {
          bgc: '#8d5df4',
          wallet: 'change_wallet',
          pageTitle: 'home.asset.coin',
          priceTitle: 'home.account.coin_valuation',
          tage: 'mine.fundsTransfer.coins'
        }
      }
    }
  },
  computed: {
    ...mapGetters('currency', ['cnyPrice']),
    // 页面标题
    pageTitle () {
      return this.typeOptions[this.accountType].pageTitle
    },
    // 当前账户类型的数据
    assetTypeData () {
      return this.typeOptions[this.accountType]
    },
    // 是否有资产数据
    hasData () {
      return !!Object.keys(this.assetData).length
    },
    // 当前资产数据
    assetInfo () {
      return this.assetData[this.assetTypeData.wallet] || {}
    },
    // 资产各余额明细
    assetBalance () {
      return this.assetInfo.balance || []
    },
    // 资产总USDT价值
    assetTotal () {
      return this.assetInfo.totle || 0
    },
    // 资产总CNY价值
    priceTotal () {
      return this.assetTotal * this.cnyPrice
    }
  },
  methods: {
    /**
     * 获取用户资产
    */
    async getUserAsset () {
      this.assetData = await this.api.wallet.info()
    },
    async getAccountRight () {
      const res = await this.api.lever.tradeHistory()
      this.rightData = res.data
    }
  },
  components: {
    BalanceTitle,
    CoinBalance,
    LegalBalance,
    AccountRight
  },
  onLoad (e) {
    this.accountType = e.type
  },
  onShow () {
    this.getUserAsset()
    if (this.accountType === 'lever') {
      this.getAccountRight()
    }
  }
}
</script>

<style lang="scss" scoped>
.account-page {
  .balance {
    text-align: center;
    margin: 0 28rpx;
    height: 258rpx;
    border-radius: 10rpx;
    font-size: 40rpx;
    color: #fff;
    box-shadow: 0 3rpx 7rpx rgba(0, 0, 0, 0.3);
    margin-top: 28rpx;
    margin-bottom: 47rpx;
  }
  .buttons {
    @extend .flex-between;
    height: 44rpx;
    margin-bottom: 40rpx;
    .line {
      height: 100%;
      width: 1rpx;
      background-color: #d5d5d5;
    }
  }
}
</style>
