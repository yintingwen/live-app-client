<template>
  <view>
    <view class="lever-entrust">
      <view class="table" v-for="(datas, index) in tableData" :key="index">

        <!-- 内容头部 -->
        <view class="table-title">
          <view class="d-flex">
            <view :class="datas.type_name === '买入' ? 'table-type-buy' : 'table-type-sell'">
              {{ datas.type_name === '买入' ? $t('lever.entrust.content.buy') : $t('lever.entrust.content.sell') }}
            </view>
            <view class="table-trade">{{ `${datas.symbol}  ${datas.multiple}X` }}</view>
            <view class="table-time">{{ getTime(datas.transaction_time) }}</view>
            <view v-if="actionIndex === 2" class="table-btn-final">{{ $t('lever.entrust.content.alreadyFlatStorage') }}</view>
          </view>
          <view
            v-if="actionIndex === 0 && datas.status_name === '挂单中'"
            @tap="onRemove(datas.id)"
            class="table-btn">
            {{ $t('lever.entrust.content.backout') }}
          </view>
          <view
            v-if="actionIndex === 0 && datas.status_name === '已撤单' "
            class="table-btn-cancel">
            {{ $t('lever.entrust.content.canceled') }}
          </view>
          <view v-if="actionIndex !== 0" @tap="onStorHisMore(index)" class="d-flex ai-center">
            <view class="table-btn-more">{{ $t('lever.entrust.content.lookMore') }}</view>
            <c-icon name="down" size="22"></c-icon>
          </view>
        </view>

        <!-- 中心内容 -->
        <view class="table-content2">
          <view>
            <text>{{ `${$t('lever.entrust.content.nowPrice')}(${getName(datas.symbol, 1)})` }}</text>
            <view>{{ toFixed(datas.update_price, 4) }}</view>
          </view>
          <view>
            <text>{{ `${$t('lever.entrust.content.num')}(${getName(datas.symbol, 0)})` }}</text>
            <view>{{ toFixed(datas.number, 4) }}</view>
          </view>
          <view v-if="actionIndex !== 0">
            <text>{{ $t('lever.entrust.content.floating') }}</text>
            <view v-if="datas.type_name === '买入'">{{ toFixed((datas.update_price - datas.origin_price)*datas.number, 4) }}</view>
            <view v-else>{{ toFixed((datas.origin_price - datas.update_price)*datas.number, 4) }}</view>
          </view>
          <view>
            <text>{{ `${$t('lever.entrust.content.price')}(${getName(datas.symbol, 0)})` }}</text>
            <view>{{ toFixed(datas.price, 4) }}</view>
          </view>
        </view>

        <!-- 平仓， 设置止盈止损按钮 -->
        <view class="hand-storage">
          <view
            v-if="actionIndex === 1"
            @tap="onFlatStorage(datas.id)"
            class="table-flat">
            {{ $t('lever.entrust.content.flatStorage') }}
          </view>
          <view
            v-if="actionIndex === 1 && datas.status_name === '交易中'"
            @tap="onCheckStop(datas)"
            class="table-flat">
            {{ $t('lever.entrust.content.actionCheckStop') }}
          </view>
        </view>

        <!-- 查看更多模块 -->
        <view class="look-more" v-if="actionIndex !== 0 && flatHisIndex[index]">
          <view>
            {{ `${$t('lever.entrust.more.orderId')}: ${datas.order_id}` }}
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.currency')}: ${datas.symbol}` }}
            </view>
            <view v-if="datas.is_blow === 2">{{ $t('lever.entrust.more.burst') }}</view>
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.orderType')}: ${datas.deal_type === 1 ? $t('lever.entrust.more.market'):$t('lever.entrust.more.limit')}` }}
            </view>
            <view class="d-flex">
              <view>{{ $t('lever.entrust.more.direction') }}:</view>
              <view class="ml-5 c-up">
                {{ `${datas.type_name === '买入' ? $t('lever.entrust.more.more'):$t('lever.entrust.more.short')}` }}
              </view>
            </view>
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.num')}: ${toFixed(datas.number, 2)}` }}
            </view>
            <view>
              {{ `${$t('lever.entrust.more.occupy')} ${getName(datas.symbol, 1)}: ${toFixed(datas.occupy_usdt, 2)}` }}
            </view>   
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.addPrice')}: ${toFixed(datas.origin_price, 2)}` }}
            </view>
            <view>
              {{ `${$t('lever.entrust.more.addServer')}: ${toFixed(datas.trade_fee, 2)}` }}
            </view>
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.sellPrice')}: ${toFixed(datas.update_price, 2)}` }}
            </view>
            <view>
              {{ `${$t('lever.entrust.more.interest')}: ${toFixed(datas.overnight_money, 2)}` }}
            </view>
          </view>
          <view class="more-line">
            <view>
              {{ `${$t('lever.entrust.more.stopLoss')}: ${toFixed(datas.stop_loss_price, 2)}` }}
            </view>
            <view>
              {{ `${$t('lever.entrust.more.stopProfit')}: ${toFixed(datas.target_profit_price, 2)}` }}
            </view>
          </view>
          <view class="more-line">
            <view v-if="datas.type_name === '买入'">
              {{ `${$t('lever.entrust.more.profitLoss')}: ${toFixed((datas.update_price - datas.origin_price)*datas.number, 4)}` }}
            </view>
						<view v-else>
						  {{ `${$t('lever.entrust.more.profitLoss')}: ${toFixed((datas.origin_price - datas.update_price)*datas.number, 4)}` }}
						</view>
          </view>
          <view>
            {{ `${$t('lever.entrust.more.times')}: ${datas.multiple}X` }}
          </view>
          <view>
            {{ `${$t('lever.entrust.more.openTime')}: ${datas.time}` }}
          </view>
          <view v-if="datas.handle_time">
            {{ `${$t('lever.entrust.more.closTime')}: ${datas.handle_time}` }}
          </view>
        </view>
      </view>
    </view>

    <!-- 点击设置止盈止亏 -->
    <c-confirm ref="stopPop" :title="$t('lever.entrust.pop.actionCheckStop')" @confirm="stopPopConfirm">
      <view class="stop-pop">
        <view class="price">
          <view>{{ $t('lever.entrust.pop.checkPrice') }}</view>
          <view>
            <lever-input-center v-model="popAction.updateCheck" @onInputBtn="onInputBtn('checkPrice', $event)" />
          </view>
        </view>
				<!-- {{ this.popAction.updateCheck }} -->
        <view class="feture">
          <view>{{ $t('lever.entrust.pop.futureCheck') }}</view>
          <text>{{ toFixed(popAction.fetureCheck, 2) }}</text>
        </view>
        <view class="price">
          <view>{{ $t('lever.entrust.pop.stopPrice') }}</view>
          <view>
            <lever-input-center v-model="popAction.updateStop" @onInputBtn="onInputBtn('stopPrice', $event)" />
          </view>
        </view>
        <view class="feture">
          <view>{{ $t('lever.entrust.pop.futureStop') }}</view>
          <text>{{ toFixed(popAction.fetureStop, 2) }}</text>
        </view>
      </view>
    </c-confirm>

    <!-- 撤销挂单弹窗 -->
    <c-confirm ref="removePop" @confirm="removePopConfirm">{{ $t('lever.entrust.pop.removeOrder') }}</c-confirm>

    <!-- 平仓弹窗 -->
    <c-confirm ref="flatPop" @confirm="flatPopConfirm">{{ $t('lever.entrust.pop.flatStorage') }}</c-confirm>
  </view>
</template>

<script>
import CConfirm from '../../common/CConfirm'
import LeverInputCenter from './LeverInputCenter'

export default {
  props: {
    // 显示数据
    tableData: {
      type: Array,
      default() {}
    },
    // 标题下标
    actionIndex: {
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      flatHisIndex: [0],
      popAction: {
        dataId: 0,
        nowPrice: 0,
        storagePrice: 0,
        fetureCheck: 0,
        fetureStop: 0,
        updateCheck: 0,
        updateStop: 0,
				leverType: 1
      }
    }
  },
  watch: {
    tableData(val, oldVal) {
      if(val.length !== oldVal.length) {
        this.flatHisIndex = new Array(this.tableData.length)
        if (this.flatHisIndex.length > 0) {
          for (let index = 0; index < val.length; index++) {
            this.flatHisIndex[index] = true
          }
        }
      }
    },
    popAction: {
      handler(newVal, oldVal) {
        let pop = this.popAction
				
				switch (pop.leverType) {
					case 1:
						if (pop.updateCheck < pop.nowPrice || pop.updateCheck <= 0) {
						  pop.updateCheck = pop.nowPrice
						}
						if (pop.updateStop > pop.nowPrice || pop.updateStop <= 0) {
						  pop.updateStop = pop.nowPrice
						}
						pop.fetureCheck = pop.updateCheck - pop.storagePrice
						pop.fetureStop = pop.updateStop - pop.storagePrice
						break
					case 2:
						if (pop.updateCheck > pop.nowPrice || pop.updateCheck <= 0) {
						  pop.updateCheck = pop.nowPrice
						}
						if (pop.updateStop < pop.nowPrice || pop.updateStop <= 0) {
						  pop.updateStop = pop.nowPrice
						}
						pop.fetureCheck = pop.storagePrice - pop.updateCheck 
						pop.fetureStop = pop.storagePrice - pop.updateStop
						break
				}
      },
      deep: true
    }
  },
  methods: {
    // 点击 平仓
    onFlatStorage(value) {
      this.popAction.dataId = value
      this.$refs.flatPop.open()
    },
    // 点击 撤销按钮 弹出撤销弹框
    onRemove(value) {
      this.popAction.dataId = value
      this.$refs.removePop.open()
    },
    // 点击 设置止盈止损按钮
    onCheckStop(val) {
      let pop = this.popAction
      pop.nowPrice = pop.updateCheck = pop.updateStop = this.toFixed( val.price, 2 )
      pop.storagePrice = this.toFixed(val.price, 2)
      pop.fetureCheck = this.toFixed(val.update_price - val.price, 2)
      pop.fetureStop = 0
      pop.dataId = val.id
			pop.leverType = val.type_name === '买入' ? 1 : 2
      this.$refs.stopPop.open()
    },
    // 点击 设置止盈止损按钮 -/+
    onInputBtn(type, value) {
      const add = 0.01
      const minus = -0.01
      let pop = this.popAction
      let action = add
      if (value === 'add') {
        action = add
      } else {
        action = minus
      }

      switch (type) {
        case 'checkPrice': {
          pop.updateCheck = (Number(pop.updateCheck) + action).toFixed(2)
          break
        }
        case 'stopPrice': {
          pop.updateStop = (Number(pop.updateStop) + action).toFixed(2)
          break
        }
      }
    },
    // 点击 设置止盈止损按钮 确定
    stopPopConfirm() {
      this.$emit('onCheckStop', this.popAction)
    },
    // 点击 撤销挂单 确定
    removePopConfirm() {
      this.$emit('onRemove', this.popAction.dataId)
    },
    // 点击 平仓 确定
    flatPopConfirm() {
      this.$emit('onFlatStorage', this.popAction.dataId)
    },
    // 点击 查看详情
    onStorHisMore(val) {
      this.flatHisIndex[val] ? 
      this.$set(this.flatHisIndex, val, false) 
      : 
      this.$set(this.flatHisIndex, val, true)
    },
    // 时间转换  15:57 01/13
    getTime(value) {
      let month =
        value.split(' ')[0].split('-')[1] +
        '/' +
        value.split(' ')[0].split('-')[2]
      let time =
        value.split(' ')[1].split(':')[0] +
        ':' +
        value.split(' ')[1].split(':')[1]
      return time + ' ' + month
    },
    // 截取字符串
    getName(value, type) {
      return value.split('/')[type]
    }
  },
  components: {
    CConfirm,
    LeverInputCenter
  }
}
</script>

<style lang="scss" scoped>
.lever-entrust {
  @extend .fs-md, .c-text;
  margin-bottom: 74rpx;
  .table {
    padding: 14rpx 33rpx 16rpx 30rpx;
    border-bottom: 1rpx solid #dedede;
    .table-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24rpx;
      .table-type-buy {
        @extend .fs-md, .c-up;
        margin-top: 8rpx;
        margin-right: 32rpx;
      }
      .table-type-sell {
        @extend .fs-lg, .c-down;
        margin-top: 8rpx;
        margin-right: 32rpx;
      }
      .table-trade {
        @extend .fs-sm, .c-primary;
        margin-top: 8rpx;
        margin-right: 10rpx;
      }
      .table-time {
        @extend .fs-xs, .c-tip2;
        margin-top: 11rpx;
      }
      .table-btn {
        @extend .c-text;
        @include size(80, 40);
        font-size: 22rpx;
        text-align: center;
        line-height: 40rpx;
        border: 1px solid #c9c9c9;
        border-radius: 8rpx;
        background-color: #f9f9f9;
      }
      .table-btn-cancel {
        @extend .c-tip2;
        @include size(80, 40);
        font-size: 20rpx;
        text-align: center;
        line-height: 40rpx;
      }
      .table-btn-final {
        @extend .c-warning;
        @include size(80, 40);
        font-size: 20rpx;
        text-align: center;
        line-height: 40rpx;
      }
      .table-btn-more {
        @include size(120, 40);
				color: #4f5cd1;
        font-size: 26rpx;
        text-align: center;
        line-height: 40rpx;
      }
    }
    .hand-storage {
      display: flex;
      justify-content: flex-end;
      .table-flat {
        @extend .c-white;
        margin: 16rpx 0 0 24rpx;
        padding: 0 16rpx;
        height: 40rpx;
        font-size: 20rpx;
        text-align: center;
        line-height: 40rpx;
        border: 1px solid #c9c9c9;
        border-radius: 8rpx;
        // background-color: #4d90eb;
        background-color: #4f5cd1;
      }
    }
    .table-content2 {
      @extend .fs-sm;
      display: flex;
      justify-content: space-between;
      text {
        @extend .c-tip2;
        display: block;
        margin-bottom: 21rpx;
      }
      & > view > view {
        @extend .c-text;
      }
    }
    .look-more {
      margin-top: 16rpx;
      padding-top: 16rpx;
      font-size: 30rpx;
      border-top: 1rpx solid #dedede;
      .more-line {
        display: flex;
        & > view {
          width: 50%;
        }
      }
      & > view {
        margin-bottom: 30rpx;
      }
    }
  }
}
.stop-pop {
  width: 100%;
  text-align: center;
  .price {
    @extend .c-text;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15rpx;
    view {
      margin-right: 15rpx;
    }
  }
  .feture {
    @extend .c-text;
		display: flex;
		justify-content: space-around;
		padding:0 80rpx 0 200rpx;
    margin-bottom: 30rpx;
    text {
      @extend .c-primary;
    }
  }
}
</style>