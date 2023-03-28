<template>
  <view class="management-page px-28 fs-xl">
    <page-layout>
      <navigator url="/pages/mine/management/chargeCoin" class="flex-between py-25 bb-g0">
        <text>{{$t('mine.currencyManagement.chargeCoin.title')}}</text>
        <c-icon class="reverse" name="left"></c-icon>
      </navigator>
      <navigator url="/pages/mine/management/mentionCoin/index" class="flex-between py-25 bb-g0">
        <text>{{$t('mine.currencyManagement.mentionCoin.title')}}</text>
        <c-icon class="reverse" name="left"></c-icon>
      </navigator>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.title'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>