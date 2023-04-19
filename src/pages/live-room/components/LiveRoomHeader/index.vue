<template>
  <view class="live-room-header">
    <u-status-bar />
    <view class="room-info">
      <view class="anchor-float-btn">
        <view class="anchor-info" @tap="emits('tapAnchor')">
          <view class="anchor-avatar">
            <u-avatar :src="anchorInfo.avatar" :size="64" />
          </view>
          <view class="anchor-info-content">
            <view class="anchor-name">
              <text class="anchor-info-text c-white">{{ anchorInfo.nickname }}</text>
            </view>
            <view class="anchor-id">
              <text class="anchor-info-text c-white">ID: {{ anchorInfo.anchorVipId }}</text>
            </view>
          </view>
        </view>
        <u-avatar
          src="/static/icons/room_follow.png"
          :size="52"
          @tap="emits('tapFollow', $event)"
        />
      </view>
      <view class="room-count">
        <text class="c-white">
          {{ userCount > 9999 ? '9999+' : userCount }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  anchorInfo: { type: Object, default: () => ({}) },
  userCount: { type: Number, default: 0 },
})
const emits = defineEmits(['tapAnchor', 'tapFollow'])
</script>

<style lang="scss">
.text-while {
  color: #fff;
}

.live-room-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 750rpx;
}

.room-info {
  padding: 0 11rpx 12rpx 22rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.anchor-float-btn {
  width: 280rpx;
  height: 70rpx;
  flex-direction: row;
  align-items: center;
  padding-right: 6rpx;
  border-radius: 35rpx;
  background-color: rgba(0, 0, 0, 0.3);

  .anchor-info {
    flex-direction: row;
    align-items: center;
    flex: 1;

    .anchor-avatar {
      margin-right: 14rpx;
    }

    .anchor-info-content {
      flex: 1;

      .anchor-info-text {
        font-size: 20rpx;
        line-height: 28rpx;
      }
    }
  }
}

.room-count {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rpx 22rpx;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 29rpx;
}
</style>
