<template>
  <view class="verified-page">
    <page-layout>
        <view class="content">
            <c-icon name="verified" size="260" color="#11B997"></c-icon>
            <view class="mt-35">{{$t('mine.authentication.verified')}}</view>
        </view>
    </page-layout>
  </view>
</template>

<script>
export default {
 data() {
    return {
      pageTitle: 'mine.authentication.oneLever.title',
    }
  },
}
</script>

<style lang="scss" scoped>
    .content{
        margin-top: 120rpx;
        text-align: center;
    }
</style>