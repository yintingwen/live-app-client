<template>
  <view class="securityCenter-page px-28">
    <page-layout>
      <navigator url="/pages/mine/securityCenter/changeLogin" class="flex-between py-30">
        <text>{{$t('mine.securityCenter.changeLogin')}}</text>
        <c-icon class="reverse" name="left"></c-icon>
      </navigator>
      <navigator url="/pages/mine/securityCenter/changeFund" class="flex-between py-30">
        <text>{{$t('mine.securityCenter.changeFund')}}</text>
        <c-icon class="reverse" name="left"></c-icon>
      </navigator>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'mine.securityCenter.title'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>