<template>
  <view class="legal-record-page">
    <page-layout>
      <!-- 主体 -->
      <view class="record-body">
        <!-- 订单列表 -->
        <view class="order-list">
          <!-- 单个订单 -->
          <navigator
            :url="`/pages/legal/detail?id=${item.id}&auth=${auth}`"
            class="order-item"
            v-for="item in orderData"
            :key="item.id"
          >
            <!-- 头部信息 -->
            <view class="flex-between">
              <!-- 购买/出售币种 -->
              <view class="d-flex ai-center">
                <text
                  class="type"
                  :class="[item.type === 'buy' ? 'bgc-down' : 'bgc-up']"
                >{{ $t(`common.${item.type === 'buy' ? 'sell' : 'buy'}`) }}</text>
                <text class="fw c-primary">{{item.currency_name}}</text>
              </view>
              <!-- 订单状态 -->
              <view class="d-flex ai-center">
                <text class="fs-xxs mr-5" :class="[`status-${item.is_sure}`]">{{getStatusStr(item.is_sure)}}</text>
                <c-icon name="left" class="reverse icon" size="20"></c-icon>
              </view>
            </view>
            <!-- 详细信息 -->
            <view class="item-body my-25">
              <view class="mb-10 fs-xxs d-flex">
                <text class="f-1">{{ $t('common.time') }}</text>
                <text class="ta-center f-1">{{ $t('common.number') }}({{item.currency_name}})</text>
                <text class="ta-right f-1">{{ $t('legal.all_price') }}(CNY)</text>
              </view>
              <view class="d-flex">
                <text class="f-1">{{item.create_time}}</text>
                <text class="ta-center f-1">{{parseInt(item.number).toFixed(3)}}</text>
                <text class="ta-right f-1">{{parseInt(item.deal_money).toFixed(3)}}</text>
              </view>
            </view>
            <view>
              {{ $t('legal.record.shop_info') }}
              <text class="ml-25">{{item.phone}}</text>
            </view>
          </navigator>
        </view>
      </view>
    </page-layout>
    <!-- 筛选 -->
    <uni-popup type="top" ref="filter">
      <record-filter
        :currencyData="currencyData"
        :currency_id="currency_id"
        :defaultStatus="is_sure"
        :defaultType="type"
        @confirm="onConfirmFilter"
      />
    </uni-popup>
  </view>
</template>

<script>
import UniPopup from '../../../components/common/uni-popup'
import RecordFilter from '../../../components/legal/record/RecordFilter'

export default {
  data () {
    return {
      pageTitle: 'legal.record.title',
      auth: 'user', // 用户类型

      currency_id: '', // 货币id, 用户
      type: '', // 订单类型, 用户
      is_sure: -1, // 订单状态, 用户

      page: '',
      limit: 999999999,
      total: 0,
      orderData: [],
      currencyData: []
    }
  },
  computed: {
    form () {
      return {
        currency_id: this.currency_id, // 币种id, 用户用
        is_sure: this.is_sure === -1 ? '' : this.is_sure, // 订单状态,用户
        type: this.type, // 订单类型,用户
        page: this.page, // 分页
        limit: this.limit
      }
    }
  },
  methods: {
    /**
     * 筛选确认
     */
    onConfirmFilter (data) {
      const { type, status, currency_id } = data
      this.type = type
      this.is_sure = status
      this.currency_id = currency_id
      this.$refs.filter.close()

      // this.page = 1
      this.getOrderList()
    },
    /**
     * 获取订单列表
     */
    async getOrderList () {
      this.showFullLoading()
      try {
        const message = await this.api.legal.userRecord(this.form)
        this.orderData = message.data
        this.total = message.total
      } catch { }
      this.hideFullLoading()
    },
    /**
     * 获取货币列表
     */
    async getCurrencyData () {
      const message = await this.api.currency.list()
      this.currencyData = message.legal
    },
    /**
     * 获取状态对应字符串
     */
    getStatusStr (index) {
      const list = ['unpaid', 'completed', 'canceled', 'paid']
      return this.$t(`legal.status.${list[index]}`)
    }
  },
  onNavigationBarButtonTap () {
    this.$refs.filter.open()
  },
  onLoad (e) {
    const { id, currency_id } = e
    this.id = id
    this.currency_id = +currency_id

    this.getCurrencyData()
  },
  onShow () {
    this.getOrderList()
  },
  async onPullDownRefresh () {
    try {
      await this.getOrderList()
    } catch (error) {
    } finally {
      uni.stopPullDownRefresh()
    }
  },
  components: {
    UniPopup,
    RecordFilter
  }
}
</script>

<style lang="scss" scoped>
.legal-record-page {
  .order-list {
    .order-item {
      padding: 30rpx 28rpx 40rpx;
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
