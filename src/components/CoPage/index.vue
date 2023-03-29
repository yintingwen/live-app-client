<template>
  <view :class="['custom-page', pageFill ? 'custom-page-fill' : '']" :style="pageStyle">
    <view class="custom-page-header" v-if="customHeader">
      <view class="custom-page-header-container">
        <u-status-bar></u-status-bar>
        <view class="costom-page-header-nav" :style="{ height: navHeight + 'px' }">
          <slot name="navigation"></slot>
        </view>
      </view>
      <view class="custom-page-header-placeholder">
        <u-status-bar></u-status-bar>
        <view :style="{ height: navHeight + 'px' }"></view>
      </view>
    </view>
    <view :class="['custom-page-body', className]" :style="style">
      <slot></slot>
    </view>
    <u-safe-bottom v-if="!isSwitchPage"></u-safe-bottom>
  </view>
</template>

<script setup>
import { defineProps, computed } from 'vue'
defineProps({
  isSwitchPage: { type: Boolean, default: false },
  customHeader: { type: Boolean, default: false },
  navHeight: { type: Number, default: 44 },
  navTitle: { type: String, default: '' },
  style: { type: [String, Object], default: '' },
  pageStyle: { type: [String, Object], default: '' },
  pageFill: { tpe: Boolean, default: false },
})
const pageStyle = computed(() => {})
</script>

<style lang="scss" scoped>
.custom-page-fill {
  height: 100%;
  .custom-page-body {
    flex: 1;
  }
}

.custom-page {
  display: flex;
  flex-direction: column;
  width: 100%;

  .custom-page-header {
    .custom-page-header-container {
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
  }
}
</style>
