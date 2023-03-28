<template>
  <!-- 交易页面头部  -->
  <!-- PS:并不能悬浮,要在外部包一层悬浮组件 -->
  <!-- 效果: 传进来一个数组  返回相对应数量的等距按钮  自带点击效果 -->
  <view class="trade-header">
    <block v-for="(item, index) in items" :key="index">
      <view :class="{'b-on': value === index}" @tap="onTapHeader(index)">{{ item }}</view>
    </block>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    // 需要遍历的头部数据对象
    items: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Number,
      default: 0
    }
  },

  methods: {
    // 点击按钮切换组件
    onTapHeader(index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.trade-header {
  @extend .py-10, .bgc-view;
  display: flex;
  justify-content: space-around;
  align-items: center;

  view {
    @include size(164rpx, 52rpx);
    @extend .bgc-black, .c-white;
    line-height: 52rpx;
    text-align: center;
    border-radius: 10rpx;
  }

  .b-on {
    @extend .c-active, .bgc-view;
    border: 1px solid map-get($colors, active);
  }

  .b-off {
    @extend .c-white;
    border: 1px solid map-get($colors, white);
  }
}
</style>

