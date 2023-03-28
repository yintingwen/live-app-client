<template>
  <view class="shop-list-page">
    <page-layout>
      <view class="shop-list">
        <view class="shop-item" v-for="item in shopList" :key="item.id" @tap="onTapInto(item.id)">
          <view class="d-flex jc-between ai-center mb-20">
            <view class="d-flex ai-center fs-sm">
              <text class="logo">{{item.name.slice(0,1)}}</text>
              <text>{{item.name}}</text>
            </view>
          </view>
          <view class="d-flex jc-between ai-center fs-xxs c-tip1 mb-15">
            <text>{{ $t('mine.myShop.regTime') }}：{{item.create_time}}</text>
            <text>{{ $t('mine.myShop.balance') }}</text>
          </view>
          <view class="d-flex jc-between ai-center mb-15">
            <view class="fs-xxs c-tip1">{{ $t('mine.myShop.legal') }}：{{item.currency_name}}</view>
            <view class="c-primary fs-xxl fw">￥ {{item.seller_balance}}</view>
          </view>
          <view class="d-flex jc-between ai-center">
            <view>
              <c-icon name="alipay" size="30" class="mr-20" color="#6bca36" />
              <c-icon name="wechat" size="30" class="mr-20" color="#00abf2" />
              <c-icon name="card" size="30" color="#fa624e" />
            </view>
            <view>
              <button type="primary" class="button">{{ $t('mine.myShop.enter') }}</button>
            </view>
          </view>
        </view>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data () {
    return {
      pageTitle: 'mine.myShop.title',
      shopList: []
    }
  },
  methods: {
    onTapInto (id) {
      this.router.navigateTo('/pages/mine/shop/detail/seller', { id })
    },
    async getShopList () {
      this.showFullLoading()
      try {
        const message = await this.api.user.shopList()
        this.shopList = message.data
      } catch { }
      this.hideFullLoading()
    }
  },
  onLoad () {
    this.getShopList()
  }
}
</script>

<style lang="scss" scoped>
.shop-list-page {
  .shop-list {
    .shop-item {
      border-bottom: 1rpx solid #cccccc;
      padding: 30rpx;
      .logo {
        @extend .bgc-primary;
        color: white;
        border-radius: 50%;
        width: 37rpx;
        height: 37rpx;
        line-height: 37rpx;
        text-align: center;
        margin-right: 15rpx;
      }
      .button {
        @extend .c-button;
        width: 219rpx;
        height: 51rpx;
        line-height: 51rpx;
        font-size: 22rpx;
      }
    }
  }
}
</style>
