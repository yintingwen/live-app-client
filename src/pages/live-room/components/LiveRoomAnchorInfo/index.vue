<template>
  <view class="live-room-anchor-info">
    <view class="anchor-info-panel">
      <!-- 举报按钮 -->
      <view class="report-btn">
        <text class="report-btn-text">举报</text>
      </view>
      <!-- 主播信息 -->
      <view class="anchor-info">
        <!-- 主播名+性别 -->
        <view class="anchor-info-name">
          <text class="anchor-info-name-text">{{ anchorInfo.nickname }}</text>
          <view
            :class="[
              'anchor-info-sex',
              anchorInfo.sex ? 'anchor-info-sex-boy' : 'anchor-info-sex-famale',
            ]"
          >
            <co-icon name="sex_female" :size="12" />
          </view>
        </view>
        <!-- 主播ID加地址 -->
        <view class="anthor-info-id">
          <text class="anthor-info-text vip-id">会员ID：{{ anchorInfo.anchorVipId }}</text>
          <view class="anthor-info-address">
            <co-icon name="address" />
            <text class="anthor-info-text">
              {{ anchorInfo.locationProvince + anchorInfo.locationCity || '未知' }}
            </text>
          </view>
        </view>
        <!-- 主播签名 -->
        <view class="anthor-info-sign">
          <text class="anthor-info-text">
            {{ anchorInfo.signature || '这个人很懒，什么都没留下' }}
          </text>
        </view>
      </view>
      <!-- 关注数和粉丝数 -->
      <view class="anthor-num">
        <view class="anthor-num-item">
          <text class="anthor-num-text">{{ anchorInfo.follow_num }}</text>
          <text class="anthor-info-text">关注</text>
        </view>
        <view class="anthor-num-item">
          <text class="anthor-num-text">
            {{ anchorInfo.fans_num > 9999 ? '9999+' : anchorInfo.fans_num }}
          </text>
          <text class="anthor-info-text">粉丝</text>
        </view>
      </view>
      <!-- 底部操作按钮 -->
      <view class="anthor-button">
        <view class="anthor-button-item">
          <text class="anthor-button-text">主页</text>
        </view>
        <view class="line"></view>
        <view class="anthor-button-item">
          <text class="anthor-button-text">@TA</text>
        </view>
        <view class="line"></view>
        <view class="anthor-button-item">
          <text class="anthor-button-text focus-text">+关注</text>
        </view>
      </view>
    </view>
    <view class="anchor-avatar">
      <u-avatar :src="anchorInfo.avatar" :size="130" />
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  anchorInfo: { type: Object, default: () => ({}) },
})
</script>
<style lang="scss">
.live-room-anchor-info {
  position: relative;
  padding-top: 65rpx;

  .anthor-info-text {
    color: rgba(136, 136, 136, 1);
    font-size: 26rpx;
    line-height: 38rpx;
  }

  .anchor-avatar {
    width: 750rpx;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
  }

  .anchor-info-panel {
    background-color: #fff;
    border-radius: 40rpx 40rpx 0 0;

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
        align-items: center;
        margin-bottom: 10rpx;

        .anchor-info-sex {
          padding: 6rpx;
          margin-left: 6rpx;
          border-radius: 50%;
          height: 24rpx;
          width: 24rpx;
          margin-left: 6rpx;
        }

        .anchor-info-sex-boy {
          background-color: rgba(66, 109, 247, 1);
        }

        .anchor-info-sex-famale {
          background: linear-gradient(180deg, rgba(248, 87, 129, 1) 0%, rgba(252, 66, 113, 1) 100%);
          box-shadow: 0px 0px 4px 2px rgba(250, 77, 121, 0.2);
        }
      }

      .anthor-info-id {
        flex-direction: row;
        margin-bottom: 44rpx;

        .vip-id {
          margin-right: 18rpx;
        }

        .anthor-info-address {
          margin-right: 18rpx;
        }
      }

      .anthor-info-sign {
        margin-bottom: 50rpx;
      }
    }

    .anthor-num {
      padding: 0 156rpx;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 42rpx;

      .anthor-num-text {
        color: rgba(51, 51, 51, 1);
        font-size: 36rpx;
        margin-bottom: 5prx;
        text-align: center;
      }
    }

    .anthor-button {
      border-top: 2rpx solid rgba(225, 225, 225, 1);
      height: 130rpx;
      flex-direction: row;
      align-items: center;

      .anthor-button-item {
        flex: 1;
        justify-content: center;
        align-items: center;
      }

      .line {
        height : 32rpx;
        width: 2rpx;
        background-color: rgba(225, 225, 225, 1);
      }

      .anthor-button-text {
        font-size: 32rpx;
        color: rgba(51, 51, 51, 1);
      }

      .focus-text {
        color: rgba(255, 142, 186, 1);
      }
    }
  }
}
</style>
