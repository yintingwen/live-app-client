<template>
  <view class="order-filter">
    <view class="mt-15">
      <view class="c-tip px-15">交易类型</view>

      <view class="option-grop">
        <block v-for="item in tradeType" :key="item.value">
          <view @tap="onTapType(item.value)" class="option" :class="{'active': form.type === item.value}">{{item.name}}</view>
        </block>
      </view>

      <view class="c-tip px-15">订单状态</view>

      <view class="option-grop">
        <block v-for="(item,index) in statusType" :key="item">
          <view @tap="onTapStatus(index)" class="option" :class="{'active': form.status === index}">{{item}}</view>
        </block>
      </view>

      <view class="filter-button">
        <view class="c-tip f-1 flex-center" @tap="onTapReset">重置</view>
        <view class="f-1 flex-center bgc-active" @tap="onTapConfirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tradeType: [
        {
          name: '购买',
          value: 'sell'
        },
        {
          name: '出售',
          value: 'buy'
        }
      ],
      statusType: ['未确定', '已确定', '已取消'],
      form: {
        type: '',
        status: ''
      }
    }
  },
  props: {
    defaultType: {
      type: String
    },
    defaultStatus: {
      type: Number
    }
  },
  methods: {
    onTapType(value) {
      this.form.type = value
    },
    onTapStatus(value) {
      this.form.status = value
    },
    onTapReset() {
      this.form = {
        type: '',
        status: -1
      }
    },
    onTapConfirm() {
      this.$emit('confirm', this.form)
    }
  },
  created() {
    this.form.type = this.defaultType
    this.form.status = this.defaultStatus
  }
}
</script>
<style lang='scss' scoped>
.order-filter {
  @extend .bgc-view;
  margin-top: var(--status-bar-height);
  padding-top: 88rpx;

  .option-grop {
    @extend .d-flex, .py-15, .fw-wrap, .px-15;

    .option {
      @extend .py-10, .mr-10, .ta-center, .fs-sm, .c-tip;
      width: 30%;
      background-color: #1b2a3e;

      &.active {
        @extend .c-white, .bgc-active;
      }
    }
  }

  .filter-button {
    @extend .d-flex;
    @include border('1', 't');
    height: 80rpx;
  }
}
</style>