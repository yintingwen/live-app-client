<template>
  <view class="legal-item-list">
    <block v-for="item in items" :key="item.id">
      <view class="py-40 bb-g1">
        <!-- 交易概述信息 -->
        <view class="flex-between mb-35">
          <!-- 商户信息 -->
          <view class="d-flex ai-center">
            <view class="logo">{{item.seller_name.slice(0,1)}}</view>
            <view class="fs-sm mr-35">{{item.seller_name}}</view>
            <view class="d-flex">
              <c-icon v-if="item.way === 'ali_pay'" class="mr-10" name="alipay" size="32" color="#00abf2" />
              <c-icon v-if="item.way === 'we_chat'" class="mr-10" name="wechat" size="32" color="#6bca36" />
              <c-icon v-if="item.way === 'bank'" class="mr-10" name="card" size="32" color="#f39921" />
            </view>
          </view>
          <!-- 单价 -->
          <view :class="[isSell ? 'c-up' : 'c-down']" class="fs-xxl fw">￥ {{toFixed(item.price, 3)}}</view>
        </view>
        <!-- 详细信息及交互 -->
        <view class="mt-15 d-flex ai-center jc-between">
          <!-- 信息 -->
          <view>
            <view class="fs-sm">{{$t('common.number')}} {{item.surplus_number.slice(0,-2)}} {{item.currency_name}}</view>
            <view
              class="mt-10 fs-sm"
            >{{`${$t('legal.deal.limit')} ￥ ${toFixed(item.limitation.min, 3)} - ￥ ${toFixed(item.limitation.max,3)}`}}</view>
          </view>
          <!-- 按钮 -->
          <view>
            <button
              @tap="onTapButton(item.id)"
              type="primary"
              :class="buttonStyle"
              class="item-button"
            >{{ $t(type === 'sell'? 'common.buy': 'common.sell')}}</button>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    buttonStyle () {
      return this.isSell ? 'bgc-up' : 'bgc-down'
    },
    isSell () {
      return this.type === 'sell'
    },
    aaa () {
      return JSON.stringify(this.items)
    }
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    type: { type: String }
  },
  methods: {
    onTapButton (id) {
      this.$emit('tapButton', id)
    }
  }
}
</script>
<style lang='scss' scoped>
.legal-item-list {
  margin: 0 28rpx;

  .logo {
    @extend .bgc-primary, .c-white, .ta-center, .fs-sm, .mr-15;
    @include size(37, 37);
    line-height: 37rpx;
    border-radius: 50%;
  }

  .item-button {
    @extend .lh-1, .flex-center, .fs-xxs;
    @include size(160, 51);
    transform: translateY(10rpx);
    border-radius: 4px;
  }
}
</style>