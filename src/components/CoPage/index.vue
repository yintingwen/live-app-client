<template>
  <view class="custom-page">
    <view class="custom-page-header" customHeader></view>
    <view class="custom-page-body"></view>
    <view class="custom-page-footer">
      <slot name="footer"></slot>
      <view v-if="!isSwitchPage"></view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
defineProps({
  isSwitchPage: { type: Boolean, default: false },
  customHeader: { type: Boolean, default: false }
})


</script>
<style lang='scss' scoped>

</style>