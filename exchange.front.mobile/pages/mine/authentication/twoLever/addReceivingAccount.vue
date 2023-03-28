<template>
  <view class="addReceivingAccount-page">
    <page-layout>
      <view class="account">
        <navigator v-for="(item, index) in accounts" :key="index" :url="item.link">
          <c-icon :name="item.iconName" :color="item.iconColor" :size="index === 0 ? '30' : '35'"></c-icon>
          <text class="ml-45">{{item.name}}</text>
        </navigator>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'mine.authentication.twoLever.addReceivingAccount',
      accounts: [
        {
          iconColor: '#F39826',
          iconName: 'card',
          name: this.$t(
            'mine.authentication.twoLever.bankCard.bankCard'
          ),
          link: '/pages/mine/authentication/twoLever/addBankCard'
        },
        {
          iconColor: '#00abf1',
          iconName: 'alipay',
          name: this.$t(
            'mine.authentication.twoLever.alipay.alipay'
          ),
          link: '/pages/mine/authentication/twoLever/addAlipay'
        },
        {
          iconColor: '#6bc936',
          iconName: 'wechat',
          name: this.$t(
            'mine.authentication.twoLever.wechat.wechat'
          ),
          link: '/pages/mine/authentication/twoLever/addWeChat'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.addReceivingAccount-page {
  .account {
    @extend .px-28;
    navigator {
      @extend .d-flex, .ai-center;
      height: 90rpx;
    }
  }
}
</style>