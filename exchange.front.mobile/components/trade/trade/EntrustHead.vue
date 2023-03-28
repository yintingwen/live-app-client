<template>
  <!-- 交易--币币页面--委托区表头  -->
  <!-- 效果: 传进来一个数组对象  返回表头状内容表头 且点击返回表头下标 -->
  <view class="en-head">
    <view
      :class="{'head-show': entrustActived === index}"
      v-for="(item, index) in entrustData"
      :key="index"
      @tap="onEntrust(index)"
    >{{ item }}</view>
  </view>
</template>

<script>
export default {
  props: {
    entrustData: {
      // 表头数据对象
      type: Array,
      default() {}
    }
  },
  data() {
    return {
      entrustActived: 0
    }
  },
  methods: {
    // 委托区点击按钮添加样式  更换数据
    onEntrust(index) {
      this.entrustActived = index
      this.$emit('entrustReturn', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.en-head {
  @extend .mb-20;
  display: flex;
  justify-content: space-around;
  view {
    @extend .fs-md, .mt-15, .p-5;
  }
  .head-show {
    @extend .c-active;
    border-bottom: 1px solid map-get($colors, actives);
  }
}
</style>


