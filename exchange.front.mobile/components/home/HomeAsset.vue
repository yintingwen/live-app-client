<template>
  <view class="home-asset">
    <view class="total flex-between" @tap="onTapEye">
      <!-- 总净资产 -->
      <view class="d-flex ai-center">
        <c-icon name="profile-asset" color="#F2B600"></c-icon>
        <text class="mx-10">{{ $t( 'home.asset.all' ) }}</text>
        <c-icon :name="showAsset ? 'eye-open' : 'eye-close'" size="41"></c-icon>
      </view>
      <view class="fs-lg f-1 ta-right fw">
        <text>{{ toFixed(allBalance, 4) }} USDT</text>
      </view>
    </view>
    <view class="account-asset clear-fix">
      <navigator url="/pages/home/account?type=legal">
        <view class="label">
          <c-icon name="legal-account" type="img" size="34" imgHeight="30" class="mr-15" />
          <text>{{ $t( 'home.account.legal' ) }}</text>
        </view>
        <view class="ellipsis balance">{{ toFixed(legalBalance, 4) }}</view>
      </navigator>
      <navigator url="/pages/home/account?type=lever">
        <view class="label">
          <c-icon name="lever-account" type="img" size="34" imgHeight="30" class="mr-15" />
          <text>{{ $t( 'home.account.lever' ) }}</text>
        </view>
        <view class="ellipsis balance">{{ toFixed(leverBalance, 4) }}</view>
      </navigator>
      <navigator url="/pages/home/account?type=coin">
        <view class="label">
          <c-icon name="coin-account" type="img" size="34" imgHeight="30" class="mr-15" />
          <text>{{ $t( 'home.account.coin' ) }}</text>
        </view>
        <view class="ellipsis balance">{{ toFixed(coinBalance, 4) }}</view>
      </navigator>
      <navigator url="/pages/home/reward">
        <view class="label">
          <c-icon name="coin-account" type="img" size="34" imgHeight="30" class="mr-15" />
          <text>{{ $t( 'home.asset.reward' ) }}</text>
        </view>
        <view class="ellipsis balance">{{ toFixed(coinBalance, 4) }}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      showAsset: true
    }
  },
  props: {
    assetData: { type: Object }
  },
  computed: {
    ...mapGetters('currency', ['symbolDigitData', 'cnyPrice']),
    eye () {
      return this.showAsset ? 'eye-open' : 'eye-close'
    },
    // 数据是否已获得
    hasData () {
      return !!Object.keys(this.assetData).length
    },
    // 总净资产
    allBalance () {
      if (!this.showAsset) return '*****'
      const legal = parseFloat(this.legalBalance)
      const lever = parseFloat(this.leverBalance)
      const coin = parseFloat(this.coinBalance)
      return (legal + lever + coin)
    },
    // 法币余额
    legalBalance () {
      return this.hasData ? this.assetData.legal_wallet.totle : 0
    },
    // 合约余额
    leverBalance () {
      return this.hasData ? this.assetData.lever_wallet.totle : 0
    },
    coinBalance () {
      return this.hasData ? this.assetData.change_wallet.totle : 0
    }
  },
  methods: {
    /**
     * 点击眼睛
     */
    onTapEye () {
      this.showAsset = !this.showAsset
    },
    onTapSetting () {
      this.router.navigateTo('/pages/mine/system/index')
    },
    // 跳转到账户
    onTapAccount (type) {
      this.router.navigateTo('/pages/home/account', { type })
    }
  }
}
</script>
<style lang='scss' scoped>
.home-asset {
  padding: 0 28rpx;
  .total {
    height: 72rpx;
  }

  .account-asset {
    > navigator {
      box-sizing: border-box;
      padding: 0 15rpx;
      width: 341rpx;
      height: 72rpx;
      background-color: #fff;
      margin-bottom: 12rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 6rpx;
      overflow: hidden;

      &:nth-child(odd) {
        float: left;
      }

      &:nth-child(even) {
        float: right;
      }
    }
  }

  .label {
    font-size: 24rpx;
    display: flex;
    align-items: center;
    margin-right: 15rpx;
  }

  .balance {
    flex: 1;
    font-size: 24rpx;
    text-align: right;
  }
}
</style>