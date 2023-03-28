<template>
  <!-- 交易--币币页面 -->
  <view class="deal-coins">
    <!-- 副头部 -->
    <deal-header :entrustTape="headerTypes"></deal-header>

    <!-- 交易区 -->
    <view class="deal">
      <view class="left-mod">
        <deal-action>
          <view slot="actionContent">
            <view class="pt-20" @click="onPop">
              <text class="fs-md c-tip">{{ dealPrice }}</text>
              <text class="iconfont icon-down fs-md c-tip"></text>
            </view>
            <view class="t-prace">
              <input type="confirmtype" :value="tapePrice" />
              <view>
                <view class="minus">-</view>
                <view>|</view>
                <view class="add">+</view>
              </view>
            </view>
            <view class="t-num">
              <input type="confirmtype" placeholder="请输入数量" />
              <view>BTC</view>
            </view>
            <view class="t-pass">
              <input type="password" placeholder="请输入资金密码" />
            </view>
            <view class="mt-10 c-tip fs-md">可用 0.000000000 {{ moneyType }}</view>
            <view class="lf-num">
              <view>
                <view class="c-tip fs-md">交易额</view>
                <view class="c-white fs-md fw">0.0000</view>
              </view>
              <view class="c-tip fs-md fw">USDT</view>
            </view>
          </view>
        </deal-action>
      </view>
      <view class="right-mod">
        <deal-table @cPrice="getPrice" :priceTape="tape"></deal-table>
      </view>
    </view>

    <!-- 委托区 -->
    <view class="entrust">
      <entrust-header></entrust-header>
      <entrust-head :entrustData="entrustHeadObj" @entrustReturn="entrustGet"></entrust-head>
      <entrust-table :entrustHeader="enHeader" :tableObj="enHeaderTable"></entrust-table>
    </view>

    <!-- 弹出下方价格分类信息窗体 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-content">
        <view v-for="(item, index) in popupContent" :key="index" @tap="onDownPop(item)">{{ item }}</view>
        <text></text>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import entrustTable from '../EntrustTable'
import entrustHead from '../EntrustHead'
import dealHeader from '../DealHeader'
import dealTable from '../DealTable'
import dealAction from '../DealAction'
import entrustHeader from '../EntrustHeader'
import uniDrawer from '../../../common/uni-drawer'

export default {
  computed: {
    enHeaderTable() {
      this.onMoreShow = false
      if (this.enHeaderNum === '') {
        return this.enHeaderTableS
      }
      switch (this.enHeaderNum) {
        case 0: {
          return this.enHeaderTableS
        }
        case 1: {
          return this.enHeaderTableA
        }
        case 2: {
          return this.enHeaderTableH
        }
        default:
          return ''
      }
    }
  },
  data() {
    return {
      headerBorder: 'b-on',
      moneyType: 'USDT',
      entrustHeaderActived: 0,
      entrustHeadObj: ['当前委托(卖出)', '当前委托(买入)', '历史委托'],
      entrustHeadIndex: '',
      dealPrice: '限价',
      tape: [
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
      tapePrice: 0,
      enHeader: ['币种', '价格', '数量', '时间', '操作'],
      enHeaderNum: '',
      enHeaderTableS: [
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        },
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        }
      ],
      enHeaderTableA: [],
      enHeaderTableH: [
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        },
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        },
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        },
        {
          amonnt: 'BTC/USDT',
          price: '0.02000',
          num: '1.00000',
          time: '2019-12-12 10:30:17',
          action: '撤单'
        }
      ],
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
      popupContent: ['限价', '市价']
    }
  },
  methods: {
    // 点击关闭价格分类信息窗体
    onDownPop(item) {
      this.dealPrice = item
      this.$refs.popup.close()
    },
    // 点击弹出价格分类信息窗体
    onPop() {
      this.$refs.popup.open()
    },
    //盘口区点击表格数据发生变化
    getPrice(val) {
      this.tapePrice = val
    },
    // 委托区头部组件返回被点击的按钮的对象的下标
    entrustGet(index) {
      this.entrustHeadIndex = index
      this.enHeaderNum = index
    }
  },
  components: {
    entrustTable,
    entrustHead,
    dealHeader,
    dealTable,
    dealAction,
    entrustHeader,
    uniDrawer
  }
}
</script>

<style scoped lang="scss">
.deal-green {
  background-color: map-get($colors, 'up');
}
.deal-yellow {
  background-color: map-get($colors, 'down');
}
.deal {
  @extend .p-10, .bgc-view;
  display: flex;
  justify-content: space-between;
  .left-mod {
    @extend .pt-10;
    width: 394rpx;
    .t-prace {
      @extend .mt-20;
      @include border('1');
      display: flex;
      width: 100%;
      input {
        @extend .pl-10, .c-white;
        @include size(180rpx, 70rpx);
        @include border('1', r);
      }
      view {
        display: inline-block;
      }
      .minus {
        @include size(80rpx, 70rpx);
        text-align: center;
        line-height: 70rpx;
      }
      .add {
        @include size(80rpx, 70rpx);
        text-align: center;
        line-height: 70rpx;
      }
    }
    .t-num {
      @extend .mt-10;
      @include border('1');
      display: flex;
      input {
        @extend .pl-10, .fs-md, .c-white;
        @include size(300rpx, 66rpx);
      }
      view {
        @extend .fw, .fs-md, .c-tip;
        height: 70rpx;
        margin-right: 15rpx;
        text-align: center;
        line-height: 70rpx;
      }
    }
    .t-pass {
      @include border('1');
      @extend .mt-10;
      width: 100%;
      input {
        @extend .pl-10, .fs-md, .c-white;
        @include size(100%, 70rpx);
      }
    }
    .lf-num {
      @extend .my-10;
      display: flex;
      justify-content: space-between;
      view {
        view {
          @extend .mr-10;
          display: inline-block;
        }
      }
    }
  }
  .right-mod {
    width: 280rpx;
    margin-left: 17rpx;
  }
}
.entrust {
  @extend .bgc-view, .mt-10;
}
.popup-content {
  @extend .bgc-view;
  width: 100%;
  border-radius: 30rpx;
  view {
    @extend .fs-md, .c-tip;
    @include size(100%, 80rpx);
    @include border('1', 'b');
    text-align: center;
    line-height: 80rpx;
  }
  text {
    @extend .bgc-page;
    @include size(100%, 20rpx);
    display: inline-block;
  }
}
</style>
