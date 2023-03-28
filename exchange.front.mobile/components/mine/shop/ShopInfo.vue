<template>
  <view class="shop-info">
    <view class="d-flex jc-between ai-center">
      <view class="logo">{{logo}}</view>
      <view class="ta-left f-1">
        <view class="fs-sm mb-10">{{info.name}}</view>
        <view
          class="fs-xxxs"
        >{{$t('mine.myShop.detail.authentication')}} | {{$t('mine.myShop.regTime')}} {{info.create_time}}</view>
      </view>
      <button v-if="send" @tap="onTapSend" class="send-button">{{ $t('mine.myShop.detail.release') }}</button>
    </view>
    <view class="flex-between mx-65 mt-30">
      <view>
        <view class="mb-20 ta-center">{{info.total}}</view>
        <view class="c-tip2 fs-xxs">{{ $t('mine.myShop.detail.all_order') }}</view>
      </view>
      <view class="ta-center">
        <view class="mb-20">{{info.thirtyDays}}</view>
        <view class="c-tip2 fs-xxs">{{ $t('mine.myShop.detail.month_order') }}</view>
      </view>
      <view class="ta-center">
        <view class="mb-20">{{info.done}}</view>
        <view class="c-tip2 fs-xxs">{{ $t('mine.myShop.detail.completion_order') }}</view>
      </view>
      <view class="ta-center">
        <view class="mb-20">{{ toFixed((info.done / info.total * 100), 1) }}%</view>
        <view class="c-tip2 fs-xxs ta-center">{{ $t('mine.myShop.detail.completion_rate') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    send: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logo () {
      return this.info.name ? this.info.name.slice(0, 1) : 's'
    }
  },
  methods: {
    onTapSend () {
      this.$emit('send')
    }
  }
}
</script>
<style lang='scss' scoped>
.shop-info {
  padding: 30rpx 35rpx;
  border-bottom: 1px solid #eeeeee;
  .logo {
    @extend .bgc-primary;
    color: white;
    border-radius: 50%;
    width: 48rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    margin-right: 15rpx;
  }

  .send-button {
    @extend .flex-center;
    width: 127rpx;
    height: 56rpx;
    background-color: #d72143;
    color: white;
    font-size: 26rpx;
  }
}
</style>