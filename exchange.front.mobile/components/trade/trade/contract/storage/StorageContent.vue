<template>
  <!-- 合约持仓页面--内容数据 storage-content -->
  <view></view>
</template>

<script>
	// <view class="storage-content">
	//   <view
	//     class="mb-20 bgc-view"
	//     :class="{'mb-70': index === contractStorageData.length-1}"
	//     v-for="(item, index) in contractStorageData"
	//     :key="index"
	//   >
	//     <view class="content-head">
	//       <view class="fs-md">{{ `${item.type_name}${item.symbol}x${item.share}手 (No.)${item.id}` }}</view>
	//       <view class="fs-md c-down">{{ Number(item.profits).toFixed(4) }}</view>
	//     </view>
	//     <view class="content-body">
	//       <view>
	//         <view>开仓价</view>
	//         <view class="c-active mb-5">{{ Number(item.price).toFixed(4) }}</view>
	//         <view>止盈价</view>
	//         <view class="c-active">{{ Number(item.target_profit_price).toFixed(4) }}</view>
	//       </view>
	//       <view>
	//         <view>当前价</view>
	//         <view class="c-active mb-5">{{ Number(item.origin_price).toFixed(4) }}</view>
	//         <view>止损价</view>
	//         <view class="c-active">{{ Number(item.stop_loss_price).toFixed(4) }}</view>
	//       </view>
	//       <view>
	//         <view>保证金</view>
	//         <view class="c-active mb-5">{{ Number(item.origin_caution_money).toFixed(4) }}</view>
	//         <view>开仓时间</view>
	//         <view class="c-active" style="margin-bottom: 0">{{ String(item.time).slice(0, 10) }}</view>
	//         <view class="c-active">{{ String(item.time).slice(11) }}</view>
	//       </view>
	//       <view>
	//         <view>手续费</view>
	//         <view class="c-active">{{ Number(item.trade_fee).toFixed(4) }}</view>
	//         <view>隔夜费</view>
	//         <view class="c-active">{{ Number(item.overnight_money).toFixed(4) }}</view>
	//       </view>
	//     </view>
	//     <view class="content-action">
	//       <view class="action-up" @tap="onAction(index)">设置止盈止损</view>
	//       <view class="action-storage" @tap="onFlet(index)">平仓</view>
	//     </view>
	//   </view>
	//   <view class="content-total">
	//     <view>
	//       <view>持仓总盈亏:</view>
	//       <view class="c-down ml-5">{{ Number(contractStorage.profits_total).toFixed(4) }}</view>
	//     </view>
	//     <view class="total-storage" @tap="onOnceStorage">一键平仓</view>
	//   </view>
	
	//   <!-- 弹出中部确定平仓窗体 -->
	//   <c-confirm ref="popFlet" @confirm="onPopFletTrue" @cancel="onPopFletFalse">
	//     <view class="c-black">确认平仓吗?</view>
	//   </c-confirm>
	
	//   <!-- 弹出中部设置止盈止损窗体 -->
	//   <c-confirm ref="popAction" @confirm="onPopActionTrue" @cancel="onPopActionFalse">
	//     <!-- 弹出中部窗体设置止盈止损内容操作 storage-action -->
	//     <storage-action></storage-action>
	//   </c-confirm>
	
	//   <!-- 弹出中部一键平仓窗体 -->
	//   <c-confirm ref="popOnce" @confirm="onPopOnceTrue" @cancel="onPopOnceFalse">
	//     <view>
	//       <view class="pop-title">确定平仓</view>
	//       <view class="pop-action">
	//         <view
	//           :class="[[`action-${index}`], {[`action-${index}-s`]: popActionStorage === index}]"
	//           @tap="onPopOnceAction(index)"
	//           v-for="(item, index) in ['全部平仓', '只平多单', '只平空单']"
	//           :key="index"
	//         >{{ item }}</view>
	//       </view>
	//     </view>
	//   </c-confirm>
	// </view>
import cConfirm from '../../../../common/CConfirm'
import storageAction from './StorageAction'

export default {
  props: {
    // 买卖数据
    contractStorage: { type: Object }
  },
  computed: {
    contractStorageData() {
      if (this.contractStorage.order) {
        return this.contractStorage.order.data
      }
      return ''
    }
  },
  data() {
    return {
      popActionStorage: 0
    }
  },
  beforeMount() {
    uni.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      uni.hideLoading()
    }, 2000)
  },
  methods: {
    // 获取年份
    getYear(data) {
      let year = ''
      year = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
      return year
    },
    // 获取详细时间
    getTime(data) {
      let time = ''
      time = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
      return time
    },
    // 点击平仓
    onFlet(index) {
      this.$refs.popFlet.open()
      console.log(index)
    },
    // 点击确定平仓
    onPopFletTrue() {
      this.$emit('onPopFlet')
    },
    // 点击取消平仓
    onPopFletFalse() {
      console.log('取消平仓')
    },
    // 点击设置止盈止损
    onAction(index) {
      this.$refs.popAction.open()
    },
    // 点击确定设置
    onPopActionTrue() {
      console.log('确定设置')
    },
    // 点击取消设置
    onPopActionFalse() {
      console.log('取消设置')
    },
    // 点击一键平仓
    onOnceStorage() {
      this.$refs.popOnce.open()
    },
    // 点击确定一键平仓
    onPopOnceTrue() {
      this.$emit('onPopOnceFlet', this.popActionStorage)
    },
    // 点击取消一键平仓
    onPopOnceFalse() {
      console.log('取消一键')
    },
    // 点击一键平仓内按钮
    onPopOnceAction(index) {
      this.popActionStorage = index
    }
  },
  components: {
    cConfirm,
    storageAction
  }
}
</script>

<style lang="scss" scoped>
.storage-content {
  .content-head {
    @include size(100%, 84rpx);
    @include border('0', 't');
    @include border('0', 'b');
    @extend .bgc-view, .px-10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content-body {
    @extend .py-15, .px-10;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    view {
      @extend .fs-md;
    }
    & > view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
        @extend .mb-10;
      }
    }
  }
  .content-action {
    @extend .mt-5, .pb-15, .px-10;
    display: flex;
    justify-content: flex-end;
    view {
      @extend .fs-md;
      @include size(200rpx, 64rpx);
      @include border('2');
      border-radius: 10rpx;
      text-align: center;
      line-height: 64rpx;
    }
    .action-up {
      @extend .mr-10;
    }
    .action-storage {
      @extend .bgc-active;
    }
  }
  .content-total {
    @extend .bgc-view, .px-15, .mb-50;
    @include size(100%, 100rpx);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    view {
      display: inline-block;
    }
    .total-storage {
      @extend .fs-md, .bgc-active;
      @include size(200rpx, 64rpx);
      @include border('2');
      border-radius: 10rpx;
      text-align: center;
      line-height: 64rpx;
    }
  }
  .pop-title {
    @extend .fs-lg, .mb-20;
    text-align: center;
  }
  .pop-action {
    display: flex;
    justify-content: space-around;
    view {
      @extend .fs-md;
      @include size(160rpx, 60rpx);
      text-align: center;
      line-height: 60rpx;
      border-radius: 10rpx;
    }
    .action-0 {
      @extend .c-active, .mr-5;
      border: 1px solid map-get($colors, 'active');
    }
    .action-0-s {
      @extend .bgc-active;
      color: #ffffff;
    }
    .action-1 {
      @extend .c-up, .mr-5;
      border: 1px solid map-get($colors, 'up');
    }
    .action-1-s {
      @extend .bgc-up;
      color: #ffffff;
    }
    .action-2 {
      @extend .c-warning;
      border: 1px solid map-get($colors, 'warning');
    }
    .action-2-s {
      @extend .bgc-warning;
      color: #ffffff;
    }
  }
}
</style>