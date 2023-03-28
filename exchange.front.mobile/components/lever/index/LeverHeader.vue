<template>
  <view>
    <view class="lever-header">
      <view @tap="onIcon" class="d-flex ai-end">
        <view class="mr-20 mb-5">{{ `${amonntHead}` }}</view>
        <c-icon name="down" class="c-primary" size="30" />
      </view>
      <view class="trend">
        <view class="head-num-up">{{ toFixed(price, 4) }}</view>
        <view class="head-num-tip">{{ toFixed(leverInfo.user_lever, 4) }}</view>
        <c-icon @tap="onKIcon" name="trend" class="c-tip" size="30" />
      </view>
    </view>

    <!-- 弹出多个币种信息窗体 -->
    <uni-popup type="top" ref="pop">
      <view class="lever-header lever-header-s">
        <view @tap="onIconClose" class="d-flex ai-end">
          <view class="mr-20 mb-5">{{ `${amonntHead}` }}</view>
          <c-icon name="down" class="c-primary" size="30" />
        </view>
        <view class="trend">
          <view class="head-num-up">{{ toFixed(price, 4) }}</view>
          <view class="head-num-tip">{{ toFixed(leverInfo.user_lever, 4) }}</view>
          <c-icon @tap="onKIcon" name="trend" class="c-tip" size="30" />
        </view>
      </view>
      <view class="pop-content">
        <view class="title">
          <view
            v-for="(item, index) in [$t('lever.header.market'), $t('lever.header.currency'), $t('lever.header.latestPrice'), $t('lever.header.change')]"
            :key="index"
          >
            <view>{{ item }}</view>
            <c-icon v-if="item === '最新价' || item === '涨跌幅'" class="icon" name="up" size="18" />
          </view>
        </view>
        <view class="content">
          <view v-for="(itemBig, indexBig) in contractTable" :key="indexBig">
            <view @tap="onTableLegal(indexBig)" :class="['list', {'list-action' : listAction === indexBig}]">{{ itemBig.name }}</view>
            <view class="table-demo">
              <scroll-view scroll-y style="height: 765rpx">
                <view v-for="(item, index) in itemBig.value" :key="index">
                  <view v-if="listAction === indexBig" class="table" @tap="onTape(item)">
                    <view class="table-name">{{ `${item.currencyName}/${item.baseCurrencyName}` }}</view>
                    <view class="table-price">{{ toFixed(item.close, 4) }}</view>
                    <view :class="item.range >= 0 ? 'table-change-up' : 'table-change-down' ">{{ `${toFixed(item.range, 4)}%` }}</view>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '../../common/uni-popup'

export default {
  props: {
    entrustTape: {
      // 给弹窗内容传递的值
      type: Array,
      default() {
        return []
      }
    },
    // 左侧币种显示值
    amonntHead: {
      type: String,
      default: 'BTC/USDT'
    },
    // 头部交易信息
    leverInfo: {
      default() {}
    }
  },
  data() {
    return {
      listAction: 0,
      tablePrice: [],
      tableDown: []
    }
  },
  computed: {
    // 给表头价格添加动态
    price() {
      if (this.entrustTape.length > 0) {
        let currencyName = this.amonntHead.split('/')[0]
        let legalName = this.amonntHead.split('/')[1]
        let legalArray = this.entrustTape.find( item => item.name === legalName)
        return legalArray.value.find( item => item.currencyName === currencyName).close
      }else {
        return 0
      }
    },
    contractTable() {
      if (this.entrustTape.length > 0) {
        return this.entrustTape.reverse()
      }else {
        return { name: 1, value: [] }
      }
    }
  },
  methods: {
    // 点击表格右侧 法币列表
    onTableLegal(index) {
      this.listAction = index
    },
    // 点击弹出币种信息窗体
    onIcon() {
      this.$refs.pop.open()
    },
    // 点击关闭币种信息窗体
    onIconClose() {
      this.$refs.pop.close()
    },
    // 点击K线图 图标
    onKIcon() {
      this.$emit('onKIcon')
    },
    // 点击弹框数据内容储存数据 并关闭弹窗
    onTape(item) {
      let amonntHeadHs = item.currencyName + '/' + item.baseCurrencyName
      if (this.amonntHead === amonntHeadHs) {
        this.$refs.pop.close()
      } else {
        try {
          uni.setStorageSync('lever', {
            currency_name: item.currencyName,
            currency_id: item.id,
            legal_name: item.baseCurrencyName,
            legal_id: this.getCoinsId(item.baseCurrencyName)
          })
          this.$refs.pop.close()
          this.$emit('onDrawer')
        } catch (error) {
          console.log('setStorageSync lever 错误')
        }
      }
    },
    // 根据货币名得到ID 只适用于此页面
    getCoinsId(val) {
      return this.entrustTape.find( item => item.name === val).id
    }
  },
  components: {
    uniPopup
  }
}
</script>

<style lang="scss" scoped>
.lever-header {
  @extend .py-20;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #f3f3f3;
  .c-primary {
    margin-bottom: 7rpx;
  }
  .head-num-up {
    @extend .c-up;
    margin-bottom: 2rpx;
    margin-right: 15rpx;
  }
  .head-num-tip {
    @extend .c-tip2, .fs-xs;
    margin-bottom: 2rpx;
    margin-right: 34rpx;
  }
  .trend {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
.lever-header-s {
  padding: 0 28rpx;
  padding-bottom: 20rpx;
}
.pop-content {
  background-color: #fff;
  .title {
    @extend .fs-xxs;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65rpx;
    color: #666666;
    background-color: #f5f5f5;
    padding-right: 29rpx;
    padding-left: 49rpx;
    & > view {
      display: flex;
    }
    .icon {
      margin-left: 15rpx;
    }
  }
  .content {
    position: relative;
    height: 765rpx;
    & > view {
      display: flex;
    }
    .list {
      @include size(167, 60);
      font-size: 26rpx;
      background-color: #f5f5f5;
      text-align: center;
      line-height: 60rpx;
    }
    .list-action {
      color: #4f5cd1;
    }
    .table-demo {
      position: absolute;
      top: 0;
      right: 0;
    }
    .table {
      display: flex;
      width: 583rpx;
      view {
        @extend .fs-xs;
        display: flex;
        justify-content: flex-end;
        width: 33%;
        height: 60rpx;
        line-height: 60rpx;
      }
      .table-name {
        padding-right: 40rpx;
      }
      .table-price {
        padding-right: 46rpx;
      }
      .table-change-up {
        @extend .c-up;
        padding-right: 40rpx;
      }
      .table-change-down {
        @extend .c-down;
        padding-right: 40rpx;
      }
    }
  }
}
</style>