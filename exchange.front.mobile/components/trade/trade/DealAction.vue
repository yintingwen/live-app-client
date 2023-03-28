<template>
  <!-- 交易--币币页面--交易区操作组件 -->
  <view class="deal-action">
    <view class="action-head">
      <view :class="byColor" @tap="onHeader('by')">买入</view>
      <text></text>
      <view :class="sellColor" @tap="onHeader('sell')">卖出</view>
    </view>
    <template v-if="contentShow">
      <slot name="actionContent"></slot>
    </template>
    <view @tap="onAction" :class="['action-btn', btnColor]">{{ actionType === 1 ? actionTypeOne: actionTypeTwo}} BTC</view>
  </view>
</template>

<script>
export default {
  props: {
    contentShow: {
      // 是否显示插槽
      type: Boolean,
      default: true
    },
    actionType: {
      // 按钮显示类型
      // 默认1类型 按钮切换显示 买入卖出
      // 2类型 按钮切换显示 买入(做多) 卖出(做空)
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      byColor: 'deal-green',
      btnColor: 'deal-green',
      sellColor: '',
      actionTypeOne: '买入',
      actionTypeTwo: '买入(做多)'
    }
  },
  methods: {
    // 点击卖出或买入按钮
    onHeader(type) {
      if (type === 'by') {
        this.byColor = this.btnColor = 'deal-green'
        this.sellColor = 'deal-black'
        if (this.actionType === 1) {
          this.actionTypeOne = '买入'
        } else if (this.actionType === 2) {
          this.actionTypeTwo = '买入(做多)'
        }
      } else if (type === 'sell') {
        this.sellColor = this.btnColor = 'deal-yellow'
        this.byColor = 'deal-black'
        if (this.actionType === 1) {
          this.actionTypeOne = '卖出'
        } else if (this.actionType === 2) {
          this.actionTypeTwo = '卖出(做空)'
        }
      }
    },
    // 点击买入(做多按钮)
    onAction() {
      if (this.btnColor === 'deal-green') {
        // 买入
        this.$emit('btnAction', 'by')
      } else if (this.btnColor === 'deal-yellow') {
        // 卖出
        this.$emit('btnAction', 'sell')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.deal-green {
  background-color: map-get($colors, 'up');
}
.deal-yellow {
  background-color: map-get($colors, 'down');
}
.deal-black {
  background-color: map-get($colors, 'page');
}
.deal-action {
  @extend .pt-10;
  width: 394rpx;
  .action-head {
    overflow: hidden;
    position: relative;
    z-index: 100;
    view {
      @include size(50%, 70rpx);
      display: inline-block;
      text-align: center;
      line-height: 70rpx;
      color: map-get($colors, 'white');
    }
    text {
      @include size(36rpx, 200%);
      @extend .bgc-view;
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translateX(-50%) rotate(25deg);
    }
  }
  .action-btn {
    @extend .fs-lg, .c-white, .mt-25;
    @include size(100%, 70rpx);
    text-align: center;
    line-height: 70rpx;
  }
}
</style>