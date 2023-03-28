<template>
  <view class="exchangeRecord-page" @tap="closeSelect">
    <page-layout>
      <view class="content">
        <view class="item" v-for="(item, index) in records" :key="index">
          <view class="top d-flex">
            <view class="fs-xxxs">
              <view class="mb-15">{{$t('mine.exchange.exchangeRecord.currency')}}：</view>
              <view>{{$t('mine.exchange.exchangeRecord.quantity')}}：</view>
            </view>
            <view class="transfer fs-xs">
              <view class="flex-between ta-center mb-20 pl-30">
                <view>
                  <view class="mb-15">{{item.from_currency_name}}</view>
                  <view>{{item.money_from}} {{$t('mine.exchange.exchangeRecord.one')}}</view>
                </view>
                <c-icon name="transform" size="48"></c-icon>
                <view>
                  <view class="mb-15">{{item.to_currency_name}}</view>
                  <view>{{item.money_to}} {{$t('mine.exchange.exchangeRecord.one')}}</view>
                </view>
              </view>
            </view>
          </view>
          <view class="bottom fs-xxxs ml-70">
            <text class="mr-30">{{$t('mine.exchange.exchangeRecord.time')}}：{{item.create_time.slice(5)}}</text>
            <text>{{$t('mine.exchange.exchangeRecord.serviceCharge')}}：{{item.fee}} USDT</text>
          </view>
        </view>
      </view>
     <view v-if="noData" class="nodata">
        <c-icon name="nodata" size="180" color="#787878"></c-icon>
        <view class="mt-50 fs-xs">{{$t('mine.currencyManagement.record.noData')}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'mine.exchange.exchangeRecord.title',
      records: [],
      noData: false
    }
  },
  methods: {
		//获取币兑交易记录
    async getExchangeRecode() {
      this.showFullLoading()
      try {
        const message = await this.api.wallet.exchangeRecord()
        if (message.length > 0) {
          this.records = message
        } else {
          this.noData = true
        }
      } catch {
        this.noData = true
      }
      this.hideFullLoading()
    }
  },
  onLoad() {
    this.getExchangeRecode()
  }
}
</script>

<style lang="scss" scoped>
.exchangeRecord-page {
  .content {
    padding: 32rpx 28rpx 0;
    .item{
      @extend .bgc-primary, .c-white, .mb-10;
      padding: 22rpx 38rpx 13rpx;
      border-radius: 10rpx;
      .top .transfer{
        width: 460rpx;
      }
    }
  }
  .noData {
    @extend .mt-50;
    text-align: center;
    image {
      width: 160rpx;
    }
  }
}
</style>