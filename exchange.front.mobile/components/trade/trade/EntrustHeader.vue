<template>
  <view class="entrust-header">
    <view class="fs-lg">{{ headerTitle }}</view>
    <navigator url="/pages/trade/lever/entrust" class="flex-center" v-if="rightShow">
      <c-icon name="order" class="mr-5" size="16"></c-icon>
      <view class="fs-lg">全部</view>
    </navigator>
  </view>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
      default: '我的委托'
    },
    rightShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.entrust-header {
  @extend .bgc-view, .px-10, .pt-20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > view {
    display: flex;
  }
}
</style>