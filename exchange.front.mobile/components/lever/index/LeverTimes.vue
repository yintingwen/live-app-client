<template>
  <view class="lever-times">
    <view v-if="titleShow" class="times-title">{{ $t('lever.times') }}</view>
    <view class="action-times">
      <view
        @tap="onTimes(item, index)"
        :class="index === timesIndex ? 'timesBgcActive' : 'timesBgc'"
        v-for="(item, index) in timesObj"
        :key="index"
      >{{ item.value }}X</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 倍数
    leverInfo: {
      default() {}
    },
    // 杠杆倍速 文字 是否显示
    titleShow: {
      type: Boolean,
      default: true
    },
    // 当前选中下标
    timesIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timesObj() {
      if (this.leverInfo.multiple) {
        return this.leverInfo.multiple.muit
      }
    }
  },
  methods: {
    // 点击倍数
    onTimes(item, index) {
      let arr = [item.value, index]
      this.$emit('onTimes', arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-times {
  @extend .fs-xxs;
  height: 90rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  view {
    @extend .fs-xxs;
  }
  .times-title {
    margin-right: 26rpx;
  }
  .action-times {
    display: flex;
    view {
      @include size(72, 36);
      border: 1rpx solid map-get($colors, 'primary');
      border-radius: 4rpx;
      margin-right: 26rpx;
      text-align: center;
      line-height: 36rpx;
    }
    .timesBgc {
      @extend .c-primary;
    }
    .timesBgcActive {
      @extend .bgc-primary, .c-white;
    }
  }
}
</style>