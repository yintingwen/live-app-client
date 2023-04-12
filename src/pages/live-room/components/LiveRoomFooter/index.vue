<template>
  <view class="live-room-footer">
    <view class="footer-operation">
      <view class="footer-input" @tap.stop="emit('tapInput')">
        <image
          class="footer-input-icon"
          src="/static/images/live-room/chat_icon.png"
          mode="scaleToFill"
        />
        <text class="footer-input-text">说点什么...</text>
      </view>
      <view class="footer-button">
        <view class="footer-button-icon" @tap="emit('tapShare')">
          <image
            class="footer-button-icon-share"
            src="/static/images/live-room/share.png"
            mode="scaleToFill"
          />
        </view>
        <view class="footer-button-icon" @tap="emit('tapGift')">
          <image
            class="footer-button-icon-gift"
            src="/static/images/live-room/gift.png"
            mode="scaleToFill"
          />
        </view>
        <view class="footer-button-icon" @tap="onTapClose">
          <image
            class="footer-button-icon-close"
            src="/static/images/live-room/close.png"
            mode="scaleToFill"
          />
        </view>
      </view>
    </view>
    <u-safe-bottom></u-safe-bottom>
  </view>
</template>
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['tapGift', 'tapClose', 'tapShare', 'tapInput'])

// 点击关闭按钮
function onTapClose () {
  uni.navigateBack()
  emit('tapClose')
}
</script>
<style lang="scss">
.live-room-footer {
  padding: 54rpx 20rpx 40rpx;

  .footer-operation {
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .footer-input {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 20rpx 50rpx 20rpx 20rpx;
      border-radius: 37rpx;
      display: flex;
      flex-direction: row;
      align-items: center;

      .footer-input-icon {
        height: 36rpx;
        width: 36rpx;
        margin-right: 18rpx;
      }

      .footer-input-text {
        color: #fff;
        font-size: 24rpx;
        line-height: 34rpx;
      }
    }

    .footer-button {
      display: flex;
      flex-direction: row;

      .footer-button-icon {
        height: 70rpx;
        width: 70rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        margin-left: 18rpx;
      }

      .footer-button-icon-share {
        width: 46rpx;
        height: 48rpx;
      }
      .footer-button-icon-gift {
        width: 44rpx;
        height: 42rpx;
      }
      .footer-button-icon-close {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }
}
</style>
