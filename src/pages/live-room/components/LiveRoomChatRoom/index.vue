<template>
  <scroll-view
    class="live-room-chat-room"
    :scroll-into-view="`chat-${list.length - 1}`"
    :scroll-y="true"
    :show-scrollbar="false"
  >
    <view class="chat-item">
      <view class="chat-item-content chat-sys-item">
        <text class="chat-item-text chat-sys-text">
          提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播。
        </text>
      </view>
    </view>
    <view v-for="(item, index) in list" :id="`chat-${index}`">
      <view class="chat-item chat-user-item">
        <view class="chat-level">
          <view class="level-num">
            <text class="level-text">{{ item.level }}</text>
          </view>
          <image class="level-icon" src="/static/images/live-room/chat_room_level.png" />
        </view>
        <view class="chat-item-content chat-user-item-text">
          <text class="chat-item-text chat-sys-text">{{ item.name }}：</text>
          <text class="chat-item-text chat-user-item-content">{{ item.text }}</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  list: { type: Array, default: [] },
})
</script>
<style lang="scss">
.live-room-chat-room {
  position: fixed;
  width: 536rpx;
  max-height: 520rpx;
  bottom: 168rpx;
  left: 24rpx;
  align-items: flex-start;

  .chat-item {
    background-color: rgba(0, 0, 0, 0.3);
    margin-top: 8rpx;
    border-radius: 20rpx;
    padding-left: 12rpx;
    padding-right: 24rpx;
    padding-top: 8rpx;
    padding-bottom: 8rpx;

    .chat-item-text {
      line-height: 42rpx;
      font-size: 26rpx;
    }
  }

  .chat-item-content {
  }

  .chat-sys-text {
    color: #75dfff;
    font-size: 26rpx;
  }

  .chat-user-item {
    display: flex;
    flex-direction: row;

    .chat-user-item-text {
      @extend .chat-user-item;

      .chat-user-item-content {
        color: #fff;
      }
    }
  }

  .chat-level {
    position: relative;
    height: 42rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 2rpx;
    margin-right: 12rpx;

    .level-icon {
      height: 42rpx;
      width: 42rpx;
      position: absolute;
      left: -5rpx;
      z-index: 1;
    }

    .level-num {
      border-radius: 13rpx;
      height: 26rpx;
      width: 74rpx;
      background-color: #1e6ff5;
      border-top-left-radius: 13rpx;
      border-top-right-radius: 13rpx;
      border-bottom-left-radius: 13rpx;
      border-bottom-right-radius: 13rpx;
      padding-left: 26rpx;

      .level-text {
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
