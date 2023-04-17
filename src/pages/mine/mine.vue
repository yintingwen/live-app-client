<template>
  <co-page class="mime-page" :pageFill="true">
    <u-status-bar />
    <MimeUserInfo class="mime-user-info" />
    <view class="base-panel mime-button-panel" >
      <view>
        <co-icon name="wallet" size="78"/>
        <view>钱包</view>
      </view>
      <view>
        <co-icon name="aristocrat" size="78"/>
        <view>贵族</view>
      </view>
      <view>
        <co-icon name="chat" size="78"/>
        <view>聊天</view>
      </view>
    </view>
  </co-page>
</template>

<script setup>
import MimeUserInfo from './components/MimeUserInfo'
import { useTabbarTheme } from '@hooks/tabbar'

useTabbarTheme('bright')
</script>
<style lang="scss" scoped>
.base-panel {
  background-color: #fff;
  margin: 0 18rpx;
  border-radius: 20rpx;
}
.mime-page {
  background-color: rgba(246, 246, 246, 1);

  .mime-user-info {
    margin-top: 101rpx;
    margin-bottom: 12rpx;
  }

  .mime-button-panel {
    padding-top: 14rpx;
    padding-bottom: 8rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
