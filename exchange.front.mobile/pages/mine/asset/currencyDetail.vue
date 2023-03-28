<template>
  <view class="currencyDetail-page">
    <page-layout>
      <view class="info">
        <view class="wrap" :style="{'background-color': bgc}">
          <view class="fw fs-xxxxl">{{detail.currency_name}}</view>
          <view class="content">
            <view>
              <view>{{$t('mine.myAsset.usable')}}</view>
              <view>{{Number(detail[`${accountType}_balance`]).toFixed(2)}}</view>
            </view>
            <view>
              <view>{{$t('mine.myAsset.freeze')}}</view>
              <view>{{Number(detail[`lock_${accountType}_balance`]).toFixed(2)}}</view>
            </view>
            <view>
              <view class="ta-right">{{$t('mine.myAsset.equivalent')}} (USDT)</view>
              <view>{{USDT}}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="option flex-around py-40 fs-xl">
        <navigator class="flex-center br-g1" :url="`/pages/mine/management/chargeCoin?currencyId=${currencyId}&type=${typeText}`">
          <c-icon class="mr-28 fw" name="charge" color="#3BB53C" size="38"></c-icon>
          <text>{{$t('mine.myAsset.currencyDetail.chargeCoin')}}</text>
        </navigator>
        <navigator class="flex-center" :url="`/pages/mine/fundsTransfer/index?currencyId=${currencyId}&type=${typeText}`">
          <c-icon class="mr-28" name="transfer" color="#FF6127" size="38"></c-icon>
          <text>{{$t('mine.myAsset.currencyDetail.transfer')}}</text>
        </navigator>
      </view>
      <view class="gap">
        <view>{{$t('mine.myAsset.currencyDetail.assetDetails')}}</view>
      </view>

      <view class="record">
        <view v-if="isData" class="content">
          <view class="pt-40 flex-between fs-sm">
            <text>{{$t('mine.myAsset.currencyDetail.quantity')}}</text>
            <text>{{$t('mine.myAsset.currencyDetail.record')}}</text>
            <text>{{$t('mine.myAsset.currencyDetail.time')}}</text>
          </view>
          <scroll-view scroll-y="true" @scrolltolower="loadMore">
            <view class="item" v-for="(item, index) in records" :key="index">
              <view class="f-1">{{toFixed(item.change, 2)}}</view>
              <view class="f-2 lh-1-5">{{item.memo}}</view>
              <view class="f-1 ta-right lh-1-5">
                <view>{{item.create_time.split(' ')[0]}}</view>
                <view>{{item.create_time.split(' ')[1]}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view v-else class="nodata">
          <c-icon name="nodata" size="180" color="#787878"></c-icon>
          <view class="mt-50 fs-md">{{$t('mine.myAsset.noData')}}</view>
        </view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import graceReload from '../../../utils/graceUI/components/graceReload'

export default {
  data() {
    return {
      accountType: '', //账户类型
      currencyId: '', //币种ID
      isData: true,
      //币种详情
      detail: {
        currency_name: 'USDT',
        lever_balance: 0.0,
        lock_lever_balance: 0.0,
        legal_balance: 0.0,
        lock_legal_balance: 0.0,
        change_balance: 0.0,
        lock_change_balance: 0.0,
        usdt_price: 0.0
      },
      records: [], //财务记录
      scrollTop: 0,
      scrollHeight: 600,
      limit: 10,
      count: 0
    }
  },
  computed: {
    // 标题
    title() {
      let text = 'coinsDeal'
      if(this.accountType === 'change'){
        text = 'coinsDeal'
      }else if(this.accountType === 'legal'){
        text = 'fundDeal'
      }else{
        text = 'contractDeal'
      }
      return text
    },
    // 背景色
    bgc() {
      let color = '#8D5DF4'
      if(this.accountType === 'change'){
        color = '#8D5DF4'
      }else if(this.accountType === 'legal'){
        color = '#4F5CD1'
      }else{
        color = '#04b0ee'
      }
      return color
    },
    // 类型
    type() {
      let type = 2
      if(this.accountType === 'change'){
        type = 2
      }else if(this.accountType === 'legal'){
        type = 1
      }else{
        type = 3
      }
      return type
    },
    // 类型文本
    typeText() {
      let text = 'mine.fundsTransfer.coins'
      if(this.accountType === 'change'){
        text = 'mine.fundsTransfer.coins'
      }else if(this.accountType === 'legal'){
        text = 'mine.fundsTransfer.fund'
      }else{
        text = 'mine.fundsTransfer.contract'
      }
      return text
    },
    USDT() {
      return (
        Number(this.detail[`${this.accountType}_balance`]) *
        Number(this.detail.usdt_price)
      ).toFixed(2)
    }
  },
  methods: {
    //获取账户详情
    async getAccountDetail(params) {
      try {
        const message = await this.api.wallet.currencyDetail(params)
        this.detail = message
      } catch {}
    },
    // 获取财务记录
    async getFinanceRecord() {
      this.showFullLoading()
      const params = {
        limit: this.limit,
        currency: this.currencyId,
        type: this.type
      }
      try {
        const { list, count } = await this.api.wallet.financeRecord(params)
        if (list.length > 0) {
          this.records = list
          this.count = count
        } else {
          this.isData = false
        }
      } catch {
        this.isData = false
      }
      this.hideFullLoading()
    },
    //加载更多
    loadMore() {
      if (this.limit < this.count) {
        this.limit += 10
        this.getFinanceRecord()
      }
    }
  },
  onLoad(e) {
    console.log()

    this.accountType = e.accountType
    this.currencyId = e.currencyId

    const params = {
      type: e.accountType,
      currency: e.currencyId
    }
    this.getAccountDetail(params)
    this.getFinanceRecord()

    uni.setNavigationBarTitle({
      title: this.$t(`mine.myAsset.currencyDetail.${this.title}`)
    })
  },
  components: { graceReload }
}
</script>

<style lang="scss">
.currencyDetail-page {
  .info {
    padding: 0 28rpx;
    margin-bottom: 7rpx;

    .wrap {
      height: 258rpx;
      padding: 38rpx 40rpx 0;
      border-radius: 10rpx;
      color: #fff;
      .content {
        display: flex;
        justify-content: space-between;
        > view :first-child {
          @extend .fs-md;
          margin: 34rpx 0 23rpx 0;
        }
        > view :last-child {
          @extend .fs-xxxl;
          text-align: right;
        }
      }
    }
  }
  .option {
    navigator {
      width: 50%;
    }
  }
  .gap {
    padding: 23rpx 28rpx;
    height: 74rpx;
    background-color: #f4f4f4;
    font-size: 32rpx;
    view {
      padding-left: 39rpx;
      border-left: 5rpx solid #4f5cd1;
      color: #666;
    }
  }
  .record {
    padding: 0 28rpx;
    .content {
      scroll-view {
        height: 512rpx;
        .item {
          @extend .flex-between, .pt-40, .pb-20, .bb-g0, .fs-xxs;
        }
      }
    }
  }
}
</style>