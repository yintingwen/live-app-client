<template>
  <view class="mentionAddress-page">
    <page-layout>
      <view class="content">
        <view
          v-for="(item, index) in addressList"
          :key="index"
          class="item"
          :class="{active: item.address === selected}"
          hover-class="active"
          @tap="onTapSelect(item)"
        >
          <text class="notes">{{$t('mine.currencyManagement.mentionCoin.mentionAddress.note')}}： {{item.notes}}</text>
          <text class="address">{{item.address}}</text>
        </view>
      </view>

      <view v-if="noData" class="nodata">
        <c-icon name="nodata" size="180"></c-icon>
        <view class="mt-50 fs-xs">{{$t('mine.currencyManagement.mentionCoin.mentionAddress.noData')}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.mentionCoin.mentionAddress.title',
      currencyId: '', //币种ID
      currencyName: '', //币种名称
      addressList: [], //地址列表
      selected: '', //选中地址
      noData: false
    }
  },
  
  methods: {
    //获取提币地址列表
    async getMentionAddress() {
      this.showFullLoading()
      try {
        const message = await this.api.wallet.mentionAddress({ currency: this.currencyId })
        if (message.length > 0) {
          this.addressList = message
        }else{
          this.noData = true
        }
      } catch (error) {
        this.noData = true
      }
      this.hideFullLoading()
    },
    //选择地址
    onTapSelect(item) {
      this.router.navigateTo('/pages/mine/management/mentionCoin/index', {
        address: item.address
      })
    }
  },

  onLoad(e) {
    this.currencyId = e.currencyId
    this.currencyName = e.currencyName
    this.selected = e.selected
  },

  onShow() {
    this.getMentionAddress()
  },

  onNavigationBarButtonTap() {
    const params = {
      currencyId: this.currencyId,
      currencyName: this.currencyName
    }
    this.router.navigateTo(
      '/pages/mine/management/mentionCoin/addAddress',
      params
    )
  }
}
</script>

<style lang="scss" scoped>
.mentionAddress-page {
  padding: 0 28rpx;
  .content {
    margin-top: 30rpx;
    .item {
      @extend .flex-between;
      padding: 24rpx;
      margin-bottom: 18rpx;
      border-radius: 10rpx;
      background-color: #eee;
      .notes {
        margin-right: 78rpx;
        white-space: nowrap;
      }
      .address {
        font-size: 22rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &.active {
        color: #fff;
        background-color: #4f5cd1;
      }
    }
  }
}
</style>