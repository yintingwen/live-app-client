<template>
  <view class="home-information">
    <view class="title">{{ $t('home.information') }}</view>
    <view class="informations">
      <navigator v-for="(item, index) in list" :key="index" class="item" :url="`/pages/home/information?id=${item.id}`">
        <view class="content">
          <view>
            {{item.title}}
            <c-icon name="hot" size="26" color="#F95732" v-if="item.recommend"></c-icon>
          </view>
          <view>{{item.create_time}}</view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      informations: [
        {
          title: '热烈祝贺区块链技术服务商太壹科技“双总部”战略正式启动！',
          hot: true,
          time: '2020-05-19 04:22:00'
        },
        {
          title: '知名区块链技术服务商——太壹科技“双总部”战略的背景',
          hot: false,
          time: '2020-05-19 04:22:00'
        },
        {
          title: '知名区块链技术服务商——太壹科技“双总部”战略的背景',
          hot: false,
          time: '2020-05-19 04:22:00'
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
.home-information {
  .title {
    padding: 0 28rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 26rpx;
    font-weight: 700;
  }

  .informations {
    font-size: 24rpx;

    .item {
      padding: 0 28rpx;

      &:not(:last-child) {
        .content {
          border-bottom: 1rpx #eeeeee solid;
        }
      }

      .content {
        min-height: 125rpx;
        white-space: pre-wrap;
        word-break: break-all;
        display: flex;
        flex-direction: column;
        justify-content: center;

        > view:first-child {
          margin-bottom: 23rpx;
        }

        > view:last-child {
          color: #666666;
        }
      }
    }
  }
}
</style>