<template>
  <view class="news px-28">
    <c-icon name="notice" color="#4B59D3" class="ml-15 mr-20" size="26"></c-icon>
    <swiper vertical="true" :autoplay="true" :circular="true" :interval="3000">
      <swiper-item v-for="(item, index) in msgs" :key="index">
        <navigator url="/pages/home/notice/list">{{item.title}}</navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    list () {
      return this.msgs.map(item => {
        return {
          title: item.title,
          url: '/pages/home/notice/list',
          opentype: 'navigate'
        }
      })
    }
  },
  props: {
    msgs: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.news {
  height: 58rpx;
  display: flex;
  align-items: center;
  border-radius: 0 0 10rpx 10rpx;

  swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  swiper-item {
    line-height: 58rpx;
    height: 100%;
    overflow: hidden;
  }

  navigator {
    font-size: 24rpx;
    line-height: 58rpx;
    height: 100%;
    overflow: hidden;
  }
}
</style>