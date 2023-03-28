<template>
  <!-- 交易--币币页面--委托区表单 -->
  <!-- 效果: 传进来表格和种类对象数组  返回表格状数据(不带表头, 带表的种类) 没有数据会自动显示无数据 -->
  <view class="entrust-table">
    <view class="entrust-header" v-if="entrustHeader != ''">
      <view :class="{'header-time': item === '时间'}" v-for="(item, index) in entrustHeader" :key="index">{{ item }}</view>
    </view>
    <view class="entrust-show">
      <template v-if="tableObj != ''">
        <view class="table" v-for="(item, index) in tableObj" :key="index">
          <view>{{ item.amonnt }}</view>
          <view>{{ item.price }}</view>
          <view>{{ item.num }}</view>
          <view>{{ item.time }}</view>
          <view class="btn" @tap="onBtn(index)">{{ item.action }}</view>
        </view>
      </template>
      <template v-else>
        <image src="/static/nomore.png" />
        <view>没有更多了..</view>
      </template>
      <template v-if="tableObj != '' && tableObj.length >= 3">
        <view v-if="!onMoreShow" class="fs-sm c-tip" @tap="onMore">加载更多</view>
        <view v-if="onMoreShow">
          <image src="/static/nomore.png" />
          <view>没有更多了..</view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    entrustHeader: {
      // 需要遍历的表单数据种类的对象 例如:币种,价格....
      type: Array,
      default() {}
    },
    tableObj: {
      // 需要遍历的表单数据对象
      type: [Object, Array],
      default() {}
    }
  },
  data() {
    return {
      onMoreShow: false
    }
  },
  methods: {
    // 委托区表格底部是否显示 "显示更多字样"
    onMore() {
      this.onMoreShow = true
    },
    // 点击平仓操作
    onBtn(index) {
      this.$emit('cleanStor', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.entrust-header {
  display: flex;
  justify-content: space-around;
  view {
    @extend .fs-sm;
  }
  .header-time {
    @extend .mx-40;
  }
}
.entrust-show {
  @extend .pt-20, .pb-50;
  text-align: center;
  image {
    @include size(160rpx, 160rpx);
  }
  view {
    @extend .mt-5, .c-tip, .fs-sm;
  }
}
.entrust-table {
  @extend .bgc-view;
  .table {
    @extend .mb-10;
    display: flex;
    justify-content: space-around;
    view {
      @extend .fs-sm;
    }
    .btn {
      @include size(90rpx, 45rpx);
      @extend .c-active, .bgc-view;
      border: 1px solid map-get($colors, active);
      line-height: 40rpx;
      text-align: center;
      border-radius: 10rpx;
      transform: translateY(-25%);
    }
  }
}
</style>