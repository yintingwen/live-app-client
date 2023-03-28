<template>
  <view class="lever-data">
    <view class="title">
      <view>{{ `${$t('lever.table.titlePrice')}(${leverStorage.legalName})` }}</view>
      <view>{{ `${$t('lever.table.titleNum')}(${leverStorage.currencyName})` }}</view>
    </view>
    <view class="content-sell">
      <view @tap="onPrice(item[0])" v-for="(item, index) in sellData" :key="index">
        <text>{{ item[0] }}</text>
        <view>{{ toFixed(item[1], 4) }}</view>
        <view class="span" :style="{ width: item[2] }" />
      </view>
    </view>
    <view class="content-buy">
      <view @tap="onPrice(item[0])" v-for="(item, index) in buyData" :key="index">
        <text>{{ item[0] }}</text>
        <view>{{ toFixed(item[1], 4) }}</view>
        <view class="span" :style="{ width: item[2] }" />
      </view>
    </view>
    <view class="depth" @tap="onBtn">
      <view class="depth-action">{{ `${$t('lever.table.btn1')}` }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    sellData: {
      default() {}
    },
    buyData: {
      default() {}
    },
    leverStorage: {
      default() {}
    }
  },
  methods: {
    onBtn() {
      // this.$emit('onBtn', true)
    },
    onPrice(val) {
      this.$emit('onPrice', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-data {
  margin-top: 32rpx;
  view {
    @extend .c-text, .fs-xxs;
  }
  .title {
    display: flex;
    justify-content: space-between;
    width: 275rpx;
    margin-bottom: 30rpx;
    view {
      @extend .c-tip2;
      font-size: 22rpx;
    }
  }
  .content-sell {
    padding-bottom: 15rpx;
    border-bottom: 1px solid #f3f3f3;
    & > view {
      height: 42rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      text {
        color: #d72143;
      }
      .span {
        position: absolute;
        right: 0;
        width: 100%;
        height: 42rpx;
        background-color: rgba(215, 33, 67 ,0.1)
      }
    }
  }
  .content-buy {
    margin-top: 15rpx;
    margin-bottom: 23rpx;
    & > view {
      height: 42rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      text {
        color: #11b997;
      }
      .span {
        position: absolute;
        right: 0;
        width: 100%;
        height: 42rpx;
        background-color: rgba(17, 185, 151, 0.1)
      }
    }
  }
  .depth {
    display: flex;
    justify-content: center;
    width: 275rpx;
    margin-bottom: 28rpx;
    text-align: center;
    border: 1px solid #999999;
    border-radius: 4px;
    .depth-action {
      color: map-get($colors, 'primary');
    }
    view {
      line-height: 51rpx;
      height: 51rpx;
    }
  }
  .margin-clear {
    margin-bottom: 0 !important;
  }
}
</style>