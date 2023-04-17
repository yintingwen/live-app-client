<template>
  <view class="mime-user-info">
    <view class="user-base-info">
      <view class="user-avatar">
        <image
          class="user-avatar-image"
          :src="userInfo.avatar || '/static/images/mime/avatar_default.png'"
          mode="scaleToFill"
        />
      </view>
      <view class="user-info">
        <view class="user-nickname">{{ userInfo.nickname }}</view>
        <view class="user-other-info">
          <view class="user-sex">
            <co-icon name="sex_man" :size="14" />
          </view>
          <co-vip-level :level="userInfo.vipLevel"></co-vip-level>
        </view>
        <view class="user-vip-id">
          <view class="id">会员ID：{{ userInfo.vipId }}</view>
          <u-button
            class="btn"
            text="复制"
            plain
            shape="circle"
            size="mini"
            type="primary"
            @tap="onTapCopy"
          ></u-button>
        </view>
        <view>{{ userInfo.description || '他好像忘记签名了' }}</view>
      </view>
      <co-icon name="right_arrow" :size="26"></co-icon>
    </view>
    <view class="user-data-info">
      <view class="user-data-item">
        <view class="user-data-num">{{ numLitmit(userInfo.follow_num) }}</view>
        <view class="user-data-desc">关注</view>
      </view>
      <view class="user-data-item">
        <view class="user-data-num">{{ numLitmit(userInfo.fans_num) }}</view>
        <view class="user-data-desc">粉丝</view>
      </view>
    </view>
  </view>
</template>

<script setup name="MimeUserInfo">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@stores/user'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

function numLitmit(num) {
  return num > 9999 ? `${(num / 10000).toFixed(1)}万` : num
}
function onTapCopy() {
  uni.setClipboardData({
    data: userInfo.value.vipId,
    success() {
      uni.showToast({
        title: '复制成功',
        icon: 'none',
      })
    },
  })
}
</script>

<style lang="scss">
.mime-user-info {
  .user-base-info {
    display: flex;
    align-items: center;
    padding: 0 42rpx 24rpx 60rpx;

    .user-avatar {
      .user-avatar-image {
        height: 152rpx;
        width: 152rpx;
        border-radius: 50%;
        margin-right: 54rpx;
      }
    }

    .user-info {
      flex: 1;
      color: #999999;
      font-size: 24rpx;

      .user-nickname {
        color: #000000;
        font-size: 32rpx;
      }

      .user-other-info {
        display: flex;
        flex-direction: row;
        align-items: center;

        .user-sex {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(66, 109, 247, 1);
          height: 24rpx;
          width: 24rpx;
          border-radius: 50%;
          margin-right: 6rpx;
        }
      }

      .user-vip-id {
        display: flex;
        align-items: center;
        margin-top: 8rpx;
        margin-bottom: 10rpx;

        .id {
          margin-right: 16rpx;
        }

        .btn {
          width: 80rpx;
          height: 42rpx;
          border-color: #e3e3e3;
          margin: 0;
        }
      }
    }
  }

  .user-data-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #999999;
    text-align: center;

    .user-data-num {
      font-size: 32rpx;
    }
    .user-data-desc {
      font-size: 24rpx;
    }
  }
}
</style>
