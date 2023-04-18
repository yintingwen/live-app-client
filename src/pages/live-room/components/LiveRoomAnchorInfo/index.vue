<template>
  <view class="live-room-anchor-info">
    <view class="anchor-info-panel">
      <view class="report-btn">
        <text class="report-btn-text">举报</text>
      </view>
      <view class="anchor-info">
        <view class="anchor-info-name">
          <text class="anchor-info-name-text">{{ anchorInfo.nickname }}</text>
          <view class="anchor-info-sex">
            <co-icon name="sex_female" :size="12"/>
          </view>
        </view>
      </view>
    </view>
    <view class="anchor-avatar">
      <u-avatar :src="anchorInfo.avatar" :size="130"/>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  anchorInfo: { type: Object, default: () => ({})},
})
console.log(props.anchorInfo);
</script>
<style lang="scss">
.live-room-anchor-info {
  position: relative;
  padding-top: 65rpx;

  .anchor-avatar {
    position: absolute;
    top: 0;
    left: 310rpx;
  }

  .anchor-info-panel {
    background-color: #fff;
    height: 500rpx;
    border-radius: 40rpx 40rpx 0 0;
  }

  .report-btn {
    padding-left: 32rpx;
    padding-top: 28rpx;
    padding-bottom: 20rpx;

    .report-btn-text {
      color: rgba(102, 102, 102, 1);
      font-size: 28rpx;
      line-height: 40rpx;
    }
  }

  .anchor-info {
    align-items: center;

    .anchor-info-name {
      display: flex;
      flex-direction: row;

      .anchor-info-sex {
        padding: 6rpx;
        margin-left: 6rpx;
      }

      .anchor-info-sex-famale {
        background: linear-gradient(180deg, rgba(248, 87, 129, 1) 0%, rgba(252, 66, 113, 1) 100%);
        box-shadow: 0px 0px 4px 2px rgba(250, 77, 121, 0.2);
      }
    }
  }
}
</style>