<template>
  <div class="home-swiper">
    <swiper class="swiper px-28" :current="current" :autoplay="true" circular @change="onSwiperChange">
      <swiper-item class="swiper-item" v-for="(data, index) in banner" :key="index">
        <view
          class="item uni-bg-red"
          :style="{
            background: `url(${data.image_url}) center center/contain no-repeat`
          }"
        ></view>
      </swiper-item>
    </swiper>
    <div class="swiper-dot">
      <div
        class="dot"
        @click.stop="onClickDot(index)"
        :class="{active: current === index}"
        v-for="(dot,index) in banner"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0
    }
  },
  props: {
    banner: Array
  },
  methods: {
    onSwiperChange (e) {
      const { current } = e.detail
      this.current = current
    },
    onClickDot (current) {
      this.current = current
    }
  }
}
</script>

<style lang="scss" scoped>
.home-swiper {
  height: 300rpx;
  position: relative;

  .swiper,
  .swiper-item {
    height: 100%;
  }

  .swiper-item {
    .item {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-dot {
    position: absolute;
    bottom: 20rpx;
    width: 100%;
    display: flex;
    justify-content: center;

    .dot {
      width: 30rpx;
      height: 5rpx;
      background-color: rgba(255, 255, 255, 0.3);
      margin-right: 6rpx;

      &:last-child  {
        margin-right: 0;
      }

      &.active  {
        background-color: #fff;
      }
    }
  }
}
</style>