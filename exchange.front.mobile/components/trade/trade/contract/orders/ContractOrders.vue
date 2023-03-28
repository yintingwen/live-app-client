<template>
  <!-- 交易--合约--合约下单页面  contract-orders-->
  <view class="contract-orders">
    <!-- 合约内容 orders-contant -->
    <view class="orders-contant">
      <!-- 合约操作 orders-action -->
      <view class="orders-action">
        <deal-action @btnAction="btnAction">
          <view slot="actionContent">
            <view class="action-price">
              <view @tap="onPrice(1)" :class="{'price-bgc': priceBgc}">市价</view>
              <view @tap="onPrice(2)" :class="{'price-bgc': !priceBgc}">限价</view>
            </view>
            <deal-input v-if="!priceBgc" placeName="请输入价格" v-model="priceVal"></deal-input>
            <view class="my-10 c-white fs-md">请选择倍数</view>
            <view class="action-times">
              <view
                @tap="onTimes(item, index)"
                :class="{'timesBgc': index === timesBgc}"
                v-for="(item, index) in [30, 50]"
                :key="index"
              >{{ item }}倍</view>
            </view>
            <view class="fs-md mb-5">{{ `1手等于${handNum} ${handObj}` }}</view>
            <view class="fs-md mb-10">交易手数</view>
            <deal-input v-model="handVal"></deal-input>
            <view class="action-hands">
              <view
                @tap="onHands(index, item)"
                :class="{'handsBgc': Number(handVal) === item}"
                v-for="(item, index) in [1, 5, 10, 20]"
                :key="index"
              >{{ item }}手</view>
            </view>
            <view class="action-info">
              <view>
                <view>合约市值</view>
                <view>{{ `≈${contractValue}USDT` }}</view>
              </view>
              <view>
                <view>保证金</view>
                <view>{{ `≈${contractMargin}USDT` }}</view>
              </view>
              <view>
                <view>交易服务费</view>
                <view>{{ `≈${contractServer}USDT` }}</view>
              </view>
              <text>余额:&nbsp;{{ `${contractBalance}USDT` }}</text>
            </view>
          </view>
        </deal-action>
      </view>

      <!-- 合约表格 orders-table -->
      <view class="orders-table">
        <deal-table :priceTape="tableValue"></deal-table>
      </view>
    </view>

    <!-- 合约委托 orders-entrust -->
    <view class="orders-entrust">
      <entrust-header class="mb-20" :rightShow="true"></entrust-header>
      <entrust-table @cleanStor="onStorage" :entrustHeader="entrustHeader" :tableObj="entrustTable"></entrust-table>
    </view>

    <!-- 弹出中部确定平仓窗体 -->
    <c-confirm ref="popupStor" @confirm="onPopStorTrue" @cancel="onPopStorFalse">
      <view class="c-black">确认平仓吗?</view>
    </c-confirm>

    <!-- 弹出中部确定下单窗体 -->
    <c-confirm ref="popupOrder" @confirm="onPopOrderTrue" @cancel="onPopOrderFalse">
      <view class="popup-order">
        <text>确定下单吗</text>
        <view>
          <view>LTC/USDT</view>
          <view></view>
        </view>
        <view>
          <view>类型</view>
          <view>做多</view>
        </view>
        <view>
          <view>手数</view>
          <view>{{ handVal }}</view>
        </view>
        <view>
          <view>倍数</view>
          <view>{{ timesNum }}</view>
        </view>
        <view>
          <view>保证金</view>
          <view>≈ 0.0000 USDT</view>
        </view>
        <view>
          <view>手续费</view>
          <view>≈ 0.0000 USDT</view>
        </view>
      </view>
    </c-confirm>
  </view>
</template>

<script>
import dealTable from '../../DealTable'
import dealAction from '../../DealAction'
import dealInput from '../../DealInput'
import entrustTable from '../../EntrustTable'
import entrustHeader from '../../EntrustHeader'
import cConfirm from '../../../../common/CConfirm'

export default {
  props: {},
  data() {
    return {
      priceBgc: true,
      timesBgc: 0,
      timesNum: 30,
      handsBgc: '',
      priceVal: '',
      handNum: '',
      handObj: '',
      handVal: '',
      headerTypes: [
        {
          amonnt: 'BTC/USDT',
          price: '10340.53000',
          exchang: '-0.44'
        },
        {
          amonnt: 'ETH/USDT',
          price: '181.99000',
          exchang: '0.35'
        },
        {
          amonnt: 'LTC/USDT',
          price: '70.09000',
          exchang: '-0.75'
        }
      ],
      contractValue: '0.000000',
      contractMargin: '0.000000',
      contractServer: '0.000000',
      contractBalance: '0.000000',
      tableValue: [
        {
          a1: 1,
          a2: 10.332465,
          a3: 10.023442
        },
        {
          a1: 2,
          a2: 10.235,
          a3: 1.0242
        }
      ],
      entrustHeader: ['类型', '价格', '交易量', '时间', '操作'],
      entrustTable: [
        {
          amonnt: '买入',
          price: '0.02000',
          num: '10.00',
          time: '2019-12-12 10:30:17',
          action: '平仓'
        },
        {
          amonnt: '买入',
          price: '0.02000',
          num: '100.00',
          time: '2019-12-12 10:30:17',
          action: '平仓'
        }
      ]
    }
  },
  created() {
    this.getStorLever()
  },
  watch: {
    handVal(newVal, oldVal) {
      if (this.handVal === newVal) {
        setTimeout(() => {
          if (newVal === 0 || newVal < 0) {
            uni.showLoading({
              title: '请输入大于0的手数'
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 2000)
          } else if (newVal > 300) {
            uni.showLoading({
              title: '请输入小于300的手数'
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 2000)
          }
        }, 300)
      }
    }
  },
  methods: {
    // 点击市价/原价
    onPrice(index) {
      if (index === 1) {
        this.priceBgc = true
      } else {
        this.priceBgc = false
      }
    },
    // 点击倍数
    onTimes(item, index) {
      this.timesBgc = index
      this.timesNum = item
      console.log(index)
    },
    // 点击几手
    onHands(index, item) {
      this.handsBgc = index
      this.handVal = item
      console.log(index)
    },
    // 委托区 点击平仓
    onStorage(index) {
      this.$refs.popupStor.open()
    },
    // 点击平仓后 取消平仓
    onPopStorFalse() {
      console.log('取消平仓')
    },
    // 点击平仓后 确定平仓
    onPopStorTrue() {
      console.log('确定平仓')
    },
    // 点击买入/卖出按钮
    btnAction(order) {
      if (this.inputAction(order)) {
        this.$refs.popupOrder.open()
      }
    },
    // 点击确定下单
    onPopOrderTrue() {
      console.log('确定下单')
    },
    // 点击取消下单
    onPopOrderFalse() {
      console.log('取消下单')
    },
    //判断所有input是否正常
    inputAction(order) {
      console.log(isNaN(this.priceVal) + '  aaa  ' + this.handVal)

      if (order === 'sell') {
      } else if (order === 'by') {
        if (!this.priceBgc) {
          if (isNaN(this.priceVal)) {
            uni.showLoading({
              title: '请正确价格'
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 2000)
            return false
          } else if (this.priceVal === '') {
            uni.showLoading({
              title: '请输入价格'
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 2000)
            return false
          } else if (this.priceVal <= 0) {
            uni.showLoading({
              title: '价格必须大于0'
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 2000)
            return false
          }
        }
        if (isNaN(this.handVal)) {
          uni.showLoading({
            title: '请正确手数'
          })
          setTimeout(() => {
            uni.hideLoading()
          }, 2000)
          return false
        } else if (this.handVal === 0 || this.handVal < 0) {
          uni.showLoading({
            title: '请输入大于0的手数'
          })
          setTimeout(() => {
            uni.hideLoading()
          }, 2000)
          return false
        } else if (this.handVal > 300) {
          uni.showLoading({
            title: '请输入小于300的手数'
          })
          setTimeout(() => {
            uni.hideLoading()
          }, 2000)
          return false
        } else if (this.handVal === '') {
          uni.showLoading({
            title: '请输入手数'
          })
          setTimeout(() => {
            uni.hideLoading()
          }, 2000)
          return false
        }
      }
      return true
    },
    // 获取1手等于多少..
    getStorLever() {
      try {
        let getStorages = uni.getStorageSync('lever')

        if (!getStorages) {
          this.handNum = '10.00'
          this.handObj = 'BTC'
        } else {
          this.handNum = getStorages.share_num
          this.handObj = getStorages.currency_name
        }
      } catch (error) {
        console.log('amonntHead错误')
      }
    }
  },
  components: {
    dealTable,
    dealAction,
    dealInput,
    entrustTable,
    entrustHeader,
    cConfirm
  }
}
</script>

<style scoped lang="scss">
.orders-contant {
  @extend .bgc-view, .px-10, .pb-10, .mb-10;
  display: flex;
  justify-content: space-between;
}
.orders-action {
  .action-price {
    @extend .my-10;
    display: flex;
    justify-content: space-between;
    view {
      @extend .c-white, .fs-md, .bgc-view;
      @include size(180rpx, 72rpx);
      @include border('0');
      text-align: center;
      line-height: 72rpx;
      border-radius: 10rpx;
    }
    .price-bgc {
      @extend .bgc-active;
    }
  }
  .action-times {
    @extend .mb-20;
    display: flex;
    view {
      @extend .bgc-view, .mr-5;
      @include size(90rpx, 52rpx);
      @include border('0');
      text-align: center;
      line-height: 52rpx;
    }
    .timesBgc {
      @extend .bgc-up;
    }
  }
  .action-hands {
    @extend .mt-10, .mb-20;
    display: flex;
    justify-content: space-around;
    view {
      @extend .bgc-view;
      @include size(90rpx, 52rpx);
      @include border('0');
      text-align: center;
      line-height: 52rpx;
    }
    .handsBgc {
      @extend .bgc-up;
    }
  }
  .action-info {
    & > view {
      @extend .fs-md, .mb-10;
      display: flex;
      justify-content: space-between;
    }
  }
}
.orders-entrust {
  @extend .bgc-view;
  .entrust-head {
    @extend .mb-20;
    display: flex;
    justify-content: space-between;
    view {
      display: flex;
    }
  }
}
.popup-order {
  // @extend .pb-10;
  text {
    @include size(100%, 80rpx);
    @extend .fs-lg, .c-black, .mb-30;
    display: block;
    text-align: center;
    line-height: 80rpx;
  }
  & > view {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @extend .fs-md, .c-black, .mb-15;
  }
}
</style>
