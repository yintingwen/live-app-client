<template>
  <view class="legal-record-page">
    <page-layout>
      <!-- 主体 -->
      <view class="record-body">
        <!-- 订单列表 -->
        <view class="order-list">
          <!-- 单个订单 -->
          <navigator
            :url="`/pages/legal/detail?id=${record.id}&auth=${auth}`"
            class="order-item"
            v-for="record in dealRecord"
            :key="record.id"
          >
            <!-- 头部信息 -->
            <view class="flex-between">
              <!-- 购买/出售币种 -->
              <view class="d-flex ai-center">
                <text
                  class="type"
                  :class="[record.type === 'buy' ? 'bgc-up' : 'bgc-down']"
                >{{ $t(`common.${record.type === 'buy' ? 'buy' : 'sell'}`) }}</text>
                <text class="fw c-primary">{{record.currency_name}}</text>
              </view>
              <!-- 订单状态 -->
              <view class="d-flex ai-center">
                <text class="fs-xxs mr-5" :class="[`status-${record.is_sure}`]">{{getStatusStr(record.is_sure)}}</text>
                <c-icon name="left" class="reverse icon" size="20"></c-icon>
              </view>
            </view>
            <!-- 详细信息 -->
            <view class="item-body my-25">
              <view class="mb-10 fs-xxs d-flex">
                <text class="f-1">{{ $t('common.time') }}</text>
                <text class="ta-center f-1">{{ $t('common.number') }}({{record.currency_name}})</text>
                <text class="ta-right f-1">{{ $t('legal.all_price') }}(CNY)</text>
              </view>
              <view class="d-flex">
                <text class="f-1">{{record.create_time}}</text>
                <text class="ta-center f-1">{{ toFixed(record.number,3) }}</text>
                <text class="ta-right f-1">{{ toFixed(record.deal_mone,3) }}</text>
              </view>
            </view>
            <view>
              {{ $t('legal.record.shop_info') }}
              <text class="ml-25">{{record.phone}}</text>
            </view>
          </navigator>
        </view>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data () {
    return {
      pageTitle: 'legal.record.title',
      id: '', // 发布订单id
      limit: 999999999,
      auth: 'seller', // 用户类型
      dealRecord: []
    }
  },
  computed: {
    form () {
      return {
        id: this.id, // 订单的id,商家用
        limit: this.limit
      }
    }
  },
  methods: {
    /**
     * 获取订单列表
     */
    async getDealRecord () {
      this.showFullLoading()
      try {
        const message = await this.api.legal.sellerRecord(this.form)
        this.dealRecord = message.data
      } catch { }
      this.hideFullLoading()
    },
    /**
     * 获取状态对应字符串
     */
    getStatusStr (index) {
      const list = ['unpaid', 'completed', 'canceled', 'paid']
      return this.$t(`legal.status.${list[index]}`)
    }
  },
  onLoad (e) {
    const { id } = e
    this.id = id
  },
  onShow () {
    this.getDealRecord()
  },
  async onPullDownRefresh () {
    try {
      await this.getDealRecord()
    } catch (error) {
    } finally {
      uni.stopPullDownRefresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.legal-record-page {
  .order-list {
    .order-item {
      padding: 28rpx;
      border-bottom: 1rpx solid #d1d1d1;

      .type {
        @extend .c-white, .mr-30, .fs-xxs, .ta-center;
        border-radius: 4rpx;
        width: 95rpx;
        height: 44rpx;
        line-height: 44rpx;
      }

      .icon {
        margin-top: -4rpx;
      }
    }
  }

  .status-1 {
    color: #11b997;
  }
  .status-0,
  .status-2 {
    color: #879baa;
  }
  .status-3 {
    color: #ffa73f;
  }
}
</style>
