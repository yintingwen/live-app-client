<template>
  <scroll-view
    class="live-room-chat-room"
    :scroll-into-view="`chat-${list.length - 1}`"
    :scroll-y="true"
    :show-scrollbar="false"
  >
    <view class="chat-item">
      <text class="chat-item-text chat-sys-text">
        提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播，提倡绿色文明直播。
      </text>
    </view>
    <block v-for="(item, index) in list">
      <view class="chat-item chat-user-item" :id="`chat-${index}`">
        <view class="chat-level">
          <view class="level-num">
            <text class="level-text">{{ item.level }}</text>
          </view>
          <image class="level-icon" src="/static/images/common/vip_level.png" />
        </view>
        <view class="chat-user-text">
          <rich-text :nodes="getRichNode(item)"></rich-text>
        </view>
      </view>
    </block>
  </scroll-view>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  list: { type: Array, default: [] },wwwwwww
})

function getRichNode(params) {
  return [
    {
      attrs: {
        style: 'font-size: 26rpx;'
      },
      children: [
        {
          type: 'text',
          text: params.name + '：',
          attrs: {
            style: 'color:#75dfff;'
          }
        },
        {
          type: 'text',
          text: params.text,
          attrs: {
            style: 'color:#ffffff;'
          }
        },
      ],
    },
  ]
}
</script>
<style lang="scss">
.live-room-chat-room {
  position: absolute;
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

  .chat-sys-text {
    color: #75dfff;
    font-size: 26rpx;
  }

  .chat-user-item {
    position: relative;

    .chat-level {
      position: absolute;
      left: 12rpx;
      height: 42rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 12rpx;

      .level-icon {
        position: absolute;
        height: 42rpx;
        width: 42rpx;
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
          line-height: 26rpx;
          font-size: 20rpx;
          text-align: center;
          color: #fff;
        }
      }
    }

    .chat-user-text {
      padding-left: 98rpx;
      font-size: 26rpx;
    }
  }
}
</style>
