<template>
  <view class="trade-kind">
    <view @tap.stop="onTitle" class="trade-title">
      <view class="d-flex">
        <view class="title">{{ kindContent[titleIndex] }}</view>
        <c-icon name="down" size="18"></c-icon>
      </view>
    </view>
    <view v-if="contentShow" class="content">
      <view
        @tap="onContent(index)"
        :class="index !== kindContent.length-1 ? 'content-row' : 'content-row-last'"
        v-for="(item, index) in kindContent"
        :key="index"
      >
        <view class="select">{{ item }}</view>
        <c-icon v-if="kindContent[titleIndex] === item" class="c-primary" name="get" size="14"></c-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 分类列表
    kindContent: {
      type: Array,
      default() {
        return []
      }
    },
    // 列表当前选中下标
    title: {
      type: Number,
      default: 0
    },
    // 是否显示下拉列表
    contentShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleIndex: this.title
    }
  },
  watch: {
    title(newVal) {
      this.titleIndex = newVal
    }
  },
  methods: {
    // 点击弹出选择框
    onTitle() {
      this.$emit('onTitle')
    },
    // 点击选择框内容
    onContent(index) {
      this.titleIndex = index
      this.$emit('onContent', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.trade-kind {
  position: relative;
  .trade-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24rpx;
    padding-right: 14rpx;
    .title {
      @extend .c-text, .fs-xs, .mt-5;
      margin-left: 13rpx;
      margin-right: 18rpx;
    }
  }
  .content {
    padding: 18rpx 16rpx 17rpx 13rpx;
    border-radius: 4rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rpx 0rpx 10rpx gray;
    position: absolute;
    left: 0;
    top: 34rpx;
    z-index: 100;
    .content-row {
      display: flex;
      align-items: center;
      margin-bottom: 21rpx;
    }
    .content-row-last {
      display: flex;
      align-items: center;
    }
    .select {
      @extend .c-text, .fs-xs, .mt-5;
      margin-right: 21rpx;
    }
  }
}
</style>