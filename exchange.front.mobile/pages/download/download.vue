<template>
  <view class="app-download">
    <image src="/static/image/bg/download.png" alt mode="widthFix" />
    <view class="buttons">
      <view>立即下载</view>
      <a class="button">
        <c-icon name="android" class="mr-20"></c-icon>Android
      </a>
      <a href="www.baidu.com" class="button">
        <c-icon name="ios" class="mr-20"></c-icon>ios
      </a>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    };
  }
}
</script>

<style lang="scss">
.app-download {
  image {
    width: 100%;
    height: 2046rpx;
  }

  .buttons {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 106rpx;
    background-color: #fff;
    display: flex;
    align-items: center;

    > view:first-child {
      margin: 0 89rpx 0 58rpx;
      color: #1296db;
      font-weight: 700;
    }
  }

  .button {
    background-color: #1296db;
    height: 51rpx;
    width: 194rpx;
    border-radius: 5rpx;
    text-align: center;
    line-height: 51rpx;
    font-size: 26rpx;

    &:last-child {
      margin-left: 17rpx;
    }
  }

  a,
  a:active,
  a:hover {
    color: #fff;
    text-decoration: none;
  }
}
</style>
