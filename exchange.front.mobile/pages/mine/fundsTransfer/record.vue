<template>
  <view class="transferRecord-page">
    <page-layout>
      <view  class="content fs-xs">
        <view class="item flex-between pt-40 pb-15 bb-g0" v-for="(item, index) in records" :key="index">
          <view class="left">
            <view class="type mb-15">
							<text>{{$t(transferType[item.type][0])}}</text>
              <text class="mx-15">{{$t('mine.fundsTransfer.transferRecord.goTo')}}</text>
							<text class="c-primary>">{{$t(transferType[item.type][1])}}</text>
            </view>
            <view class="c-tip2">{{$t('mine.fundsTransfer.transferRecord.quantity')}}：{{Number(item.number).toFixed(2)}}</view>
          </view>

          <view class="right c-tip2">
            <view class="mb-15">{{$t('mine.fundsTransfer.transferRecord.currency')}}：{{item.currency_name}}</view>
            <view class="fs-xxxs">{{$t('mine.fundsTransfer.transferRecord.date')}}：{{item.add_time}}</view>
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
      pageTitle: 'mine.fundsTransfer.transferRecord.title',
      transferType: {
        1: ['mine.fundsTransfer.contract', 'mine.fundsTransfer.fund'],
        2: ['mine.fundsTransfer.fund', 'mine.fundsTransfer.contract'],
        3: ['mine.fundsTransfer.coins', 'mine.fundsTransfer.contract'],
        4: ['mine.fundsTransfer.contract', 'mine.fundsTransfer.coins'],
        5: ['mine.fundsTransfer.coins', 'mine.fundsTransfer.fund'],
        6: ['mine.fundsTransfer.fund', 'mine.fundsTransfer.coins']
      },
      records: [],
      noData: false
    }
  },
  methods: {
		//获取划转记录
    async getTransferRecord() {
      this.showFullLoading()
      try {
        const {data} = await this.api.wallet.transferRecord()
        if (data.length > 0) {
          this.records = data
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
    this.getTransferRecord()
  }
}
</script>

<style lang="scss" scoped>
.transferRecord-page {
  .content {
    @extend .px-28;
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