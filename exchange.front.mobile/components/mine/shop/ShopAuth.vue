<template>
  <view class="shop-auth">
    <view class="flex-center">
      <text class="mr-15">{{ $t('mine.myShop.detail.email') }}</text>
      <c-icon v-if="info.prove_email" name="finish" size="24" class="c-primary"></c-icon>
      <c-icon v-else name="unfinish" color="#D72143"></c-icon>
    </view>
    <view class="flex-center">
      <text class="mr-15">{{ $t('mine.myShop.detail.mobile') }}</text>
      <c-icon v-if="info.prove_mobile" name="finish" size="24" class="c-primary"></c-icon>
      <c-icon v-else name="unfinish" color="#D72143"></c-icon>
    </view>
    <view class="flex-center">
      <text class="mr-15">{{ $t('mine.myShop.detail.real_name') }}</text>
      <c-icon v-if="info.prove_real" name="finish" size="24" class="c-primary"></c-icon>
      <c-icon v-else name="unfinish" color="#D72143"></c-icon>
    </view>
    <view class="flex-center">
      <text class="mr-15">{{ $t('mine.myShop.detail.advanced') }}</text>
      <c-icon v-if="info.prove_level" name="finish" size="24" class="c-primary"></c-icon>
      <c-icon v-else name="unfinish" color="#D72143"></c-icon>
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
    }
  }
}
</script>
<style lang='scss' scoped>
.shop-auth {
  @extend .flex-between, .px-30;
  height: 90rpx;

  > view {
    > text {
      margin-right: 15rpx;
      font-size: 24rpx;
    }
  }
}
</style>