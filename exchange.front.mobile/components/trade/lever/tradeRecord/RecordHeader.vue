<template>
  <page-header>
    <view class="history-header" slot="center">
      <block v-for="(item,index) in template" :key="index">
        <view class="header-item" :class="{'active': active === index}" @tap="onTapItem(index)">{{item}}</view>
      </block>
    </view>
  </page-header>
</template>

<script>
const template = ['委托中', '交易中', '平仓中', '已平仓', '已撤单']

export default {
  data() {
    return {
      template,
      active: 0
    }
  },
  props: {
    value: {
      type: Number
    }
  },
  methods: {
    onTapItem(index) {
      this.active = index
      this.$emit('change', index)
    }
  },
  created() {
    this.active = this.value
  }
}
</script>
<style lang='scss' scoped>
.history-header {
  @include border('2');
  height: 66rpx;
  width: 530rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30rpx;

  .header-item {
    @extend .flex-center, .fs-sm;
    height: 100%;
    flex: 1;
    text-align: center;

    &.active {
      background-color: map-get($border-colors, '2');
      border-radius: 30rpx;
    }
  }
}
</style>