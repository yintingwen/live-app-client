<template>
  <view class="page-header default-bgc" :style="headerStyles">
    <div class="header-placeholder"></div>
    <view class="header-main">
      <view class="header-left" @tap.stop="goBack">
        <slot name="left" :style="{'color': leftColor}">
          <c-icon v-if="back" size="42" :name="leftIcon"></c-icon>
        </slot>
      </view>
      <view class="header-center">
        <slot name="center">{{title}}</slot>
      </view>
      <view class="header-rigth" @tap="onTapRight">
        <slot name="right">
          <c-icon v-if="rightIcon"></c-icon>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: { type: String }, // 中间标题
    color: { type: String },
    bgc: { type: String, default: 'transparent' }, // 背景色,默认透明
    back: { type: Boolean, default: true }, // 是否显示左边返回按钮
    leftIcon: { type: String, default: 'left' }, // 左侧图标, icon-xxx中的xxx, none不显示
    leftColor: { type: String, default: 'white' }, // 左侧字体颜色
    rightIcon: { type: String, default: '' }, // 右侧图标
    rightColor: { type: String, default: 'white' } // 右侧颜色
  },
  computed: {
    headerStyles () {
      return {
        backgroundColor: this.bgc,
        color: this.color
      }
    }
  },
  methods: {
    goBack () {
      uni.navigateBack({})
    },
    onTapRight () {
      this.$emit('right')
    }
  }
}
</script>

<style scoped lang="scss">
.page-header {
  width: 100%;
  padding-top: var(--status-bar-height);

  .header-placeholder {
    height: 88rpx;
  }

  .header-main {
    position: fixed;
    top: var(--status-bar-height);
    left: 0;
    height: 88rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-center {
      font-size: 32rpx;
    }

    .header-left,
    .header-rigth {
      height: 100%;
      width: 88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.default-bgc {
  background-color: map-get($colors, "page");
}
</style>
