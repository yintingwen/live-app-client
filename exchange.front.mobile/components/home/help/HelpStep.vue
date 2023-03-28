<template>
  <view class="help-step">
    <view class="help-title">{{ $t(title) }}:</view>
    <view class="help-item" v-for="(step,index) in steps" :key="index">
      <view class="description" v-if="step.description">
        <view class="step">{{ $t(stepTitle[index]) }}：</view>
        <view class="content">
          <view v-for="content in step.description" :key="content">{{ $t(content) }}</view>
        </view>
      </view>
      <view class="img" v-if="step.img">
        <image :src="img" v-for="img in step.img" :key="img" />
      </view>
      <view class="detail" v-if="step.detail">
        <view v-for="detail in step.detail" :key="detail">{{ $t(detail) }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      stepTitle: [
        'home.help.detail.step.first',
        'home.help.detail.step.second',
        'home.help.detail.step.thirdly'
      ]
    }
  },
  computed: {
    title () {
      return this.options.title
    },
    steps () {
      return this.options.steps || []
    }
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.help-step {
  margin-bottom: 50rpx;
  .help-title {
    font-size: 30rpx;
    font-weight: 550;
    margin-bottom: 40rpx;
    padding: 0 28rpx;
  }
  .help-item {
    margin: 0 55rpx 35rpx 55rpx;

    .description {
      line-height: 1.5;
      display: flex;
      flex-wrap: wrap;
      font-size: 26rpx;
      margin: 0 15rpx 35rpx 15rpx;

      .content {
        flex: 1;
        view {
          margin-bottom: 20rpx;
          &:first-child {
            margin: 0;
          }
        }
      }
    }
    .img {
      display: flex;
      justify-content: space-between;

      image {
        width: 300rpx;
        height: 534rpx;
        display: block;
        margin: 0 auto;
        box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 0, 0.1);
      }
    }

    .detail {
      padding: 25rpx;
      background-color: #f5f5f5;
      view {
        word-break: break-all;
        letter-spacing: 3rpx;
        line-height: 2;
        font-size: 24rpx;
        margin-bottom: 25rpx;
        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>