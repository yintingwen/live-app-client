<template>
  <view @tap="onIndex" class="lever">
    <page-layout>
      <view class="trade">
        
        <!-- 头部 -->
        <lever-header
          @onDrawer="setAllCoinsCut"
          @onKIcon="onKIcon"
          :amonntHead="amonntHead"
          :entrustTape="marketData"
          :leverInfo="leverInfo"/>

        <!-- 限价买入 倍数 -->
        <lever-times 
          :timesIndex="timesIndex"
          v-if="modelIsShow(0)" 
          @onTimes="onTimes('limitTimes', $event)" 
          :leverInfo="leverInfo" />
        
        <view class="trade-content">
          <!-- 交易 -->
          <lever-trade
            @onTrade="onSubmit"
            :amonntHead="amonntHead"
            :leverType="leverType"
            :leverInfo="kindTitle === 0 ? limitPriceInput : marketPriceInput"
            :moneyInfo="kindTitle === 0 ? limitActionInfo : marketActionInfo">

            <!-- 交易种类 例如: 限价买入 -->
            <lever-trade-kind
              @onTitle="onKindTitle"
              @onContent="onKindContent"
              :title="1"
              :contentShow="contentShow"
              :kindContent="[$t('lever.trade.limit.title'), $t('lever.trade.market.title')]"/>

            <!-- 市价买入 -->
            <template v-if="modelIsShow(1)">
              <view class="trade-price">{{ $t('lever.trade.market.hindPrice') }}</view>
              <input :value="marketPriceInput.price" class="market-input" type="number" :disabled="true" />

              <!-- 市价买入 倍数 -->
              <lever-times 
                :leverInfo="leverInfo" 
                :timesIndex="timesIndex"
                @onTimes="onTimes('marketTimes', $event)" 
                :titleShow="false" />

              <view class="trade-price">
                {{ `${$t('lever.trade.market.hindHands')} = ${leverStorage.shareNum} ${leverStorage.currencyName}`}}
              </view>

              <!-- 市价买入 数量输入框 -->
              <lever-input-center
                v-model="marketPriceInput.hands"
                :placeholder="$t('lever.trade.market.hindInput')"
                @onInputBtn="onInputBtn('marketHands', $event)"/>

              <!-- 市价买入 滚动条 -->
              <lever-slider @onSliderChange="onMarketSliderChange" :value="marketPriceInput.hands" :leverInfo="leverInfo" />

              <!-- 市价买入 交易信息 -->
              <lever-trade-info :actionInfo="marketActionInfo" :leverStorage="leverStorage" />
            </template>

            <!-- 限价买入 -->
            <template v-if="modelIsShow(0)">
              <!-- 限价买入 价格输入框 -->
              <lever-input-center
                v-model="limitPriceInput.price"
                :placeholder="$t('lever.trade.limit.hindPriceInput')"
                @onInputBtn="onInputBtn('limitPrice', $event)"/>

              <view class="trade-price">
                {{`${$t('lever.trade.limit.hindHands')} = ${leverStorage.shareNum} ${leverStorage.currencyName}`}}
              </view>

              <!-- 限价买入 数量输入框 -->
              <lever-input-center
                v-model="limitPriceInput.hands"
                :placeholder="$t('lever.trade.limit.hindNumInput')"
                @onInputBtn="onInputBtn('limitNum', $event)" />

              <view class="trade-price" >
                {{ `${$t('lever.trade.limit.hindBalance')} ${toFixed(leverInfo.user_lever, 4)} ${leverStorage.legalName}` }}
              </view>

              <!-- 限价买入 滚动条 -->
              <lever-slider @onSliderChange="onLimitSliderChange" :value="limitPriceInput.hands" :leverInfo="leverInfo" />

              <!-- 限价买入 交易信息 -->
              <lever-trade-info :actionInfo="limitActionInfo" :leverStorage="leverStorage" />
            </template>
          </lever-trade>

          <!-- 右侧数据 -->
          <lever-data
            @onPrice="onLeverPrice" 
            @onBtn="onMarketBtn" 
            :leverStorage="leverStorage" 
            :sellData="sellData" 
            :buyData="buyData" />

        </view>
      </view>

      <!-- 历史记录 -->
      <lever-history-title 
        @onBtn="onHistoryTitle" 
        @onHistoryTitle="onHistoryTitle" 
        :actionIndex="historyIndex"
        :isShow="setAllTradeHistory" />
      
      <lever-history-model 
        @onHistoryTitle="onHistoryTitle" 
        @onOnceFlatStorage="onOnceFlatStorage" 
        @onTime="onTimeReverse" 
        :actionIndex="historyIndex" />

      <lever-history
        @onHistoryTitle="onHistoryTitle"
        @onFlatStorage="onFlatStorage"
        @onRemove="onTableRemove"
        @onCheckStop="onCheckStop"
        :tableData="setEntrustData"
        :actionIndex="historyIndex"
      />
    </page-layout>
  </view>
</template>

<script>
import marketMixin from '../../mixins/market'
import leverMarketMixin from '../../mixins/lever/leverMarket'
import leverTableMixin from '../../mixins/lever/leverTable'
import leverHeader from '../../components/lever/index/LeverHeader'
import leverTimes from '../../components/lever/index/LeverTimes'
import leverTrade from '../../components/lever/index/LeverTrade'
import leverInputCenter from '../../components/lever/index/LeverInputCenter'
import leverInputLeft from '../../components/lever/index/LeverInputLeft'
import leverSlider from '../../components/lever/index/LeverSlider'
import leverData from '../../components/lever/index/LeverData'
import leverHistory from '../../components/lever/index/LeverHistory'
import leverHistoryTitle from '../../components/lever/index/LeverHistoryTitle'
import leverHistoryModel from '../../components/lever/index/LeverHistoryModel'
import leverTradeKind from '../../components/lever/index/LeverTradeKind'
import leverTradeInfo from '../../components/lever/index/LeverTradeInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [marketMixin, leverMarketMixin, leverTableMixin],
  data () {
    return {
      pageTitle: 'lever.title',
      leverType: 'buy',
      tabBar: true,
      contentShow: false,
      leverInfo: '',
      kindTitle: 1,
      amonntHead: 'BTC/USDT',
      timesIndex: 0,
      leverStorage: {
        currencyId: 1,
        currencyName: 'BTC',
        legalId: 3,
        legalName: 'USDT',
        shareNum: '',
        overNight: ''
      },
      limitPriceInput: {
        price: '',
        hands: '',
        times: ''
      },
      marketPriceInput: {
        price: 0,
        hands: '',
        times: ''
      },
      limitActionInfo: {
        marketPrice: '',
        marginPrice: '',
        reservePrice: '',
        balance: ''
      },
      marketActionInfo: {
        marketPrice: '',
        marginPrice: '',
        reservePrice: '',
        balance: ''
      }
    }
  },
  computed: {
    ...mapGetters('currency', ['currencyList', 'legalList'])
  },
  watch: {
    /**
     * 监听限价买入对象
     * 对象内数据发生改变就对 合约市值 保证金 交易服务费 余额进行更新
     */
    limitPriceInput: {
      handler (newVal, oldVal) {
        this.limitActionInfo.marketPrice = (
          this.limitPriceInput.price *
          this.limitPriceInput.hands *
          this.leverStorage.shareNum
        ).toFixed(4)

        this.limitActionInfo.marginPrice = (
          this.limitActionInfo.marketPrice / this.limitPriceInput.times
        ).toFixed(4)

        this.limitActionInfo.reservePrice = Number(
          this.limitActionInfo.marketPrice * (this.leverStorage.overNight / 100)
        ).toFixed(4)

        this.limitActionInfo.balance = (
          this.leverInfo.user_lever -
          this.limitActionInfo.marginPrice -
          this.limitActionInfo.reservePrice
        ).toFixed(4)
      },
      deep: true
    },
    /**
     * 监听市价买入对象
     * 对象内数据发生改变就对 合约市值 保证金 交易服务费 余额进行更新
     */
    marketPriceInput: {
      handler (newVal, oldVal) {
        this.marketActionInfo.marketPrice = (
          this.marketPriceInput.price *
          this.marketPriceInput.hands *
          this.leverStorage.shareNum
        ).toFixed(4)

        this.marketActionInfo.marginPrice = (
          this.marketActionInfo.marketPrice / this.marketPriceInput.times
        ).toFixed(4)

        this.marketActionInfo.reservePrice = Number(
          this.marketActionInfo.marketPrice * (this.leverStorage.overNight / 100)
        ).toFixed(4)

        this.marketActionInfo.balance = (
          this.leverInfo.user_lever -
          this.marketActionInfo.marginPrice -
          this.marketActionInfo.reservePrice
        ).toFixed(4)
      },
      deep: true
    }
  },
  onShow() {
    this.setAllTradeHistory = 0
    this.timesIndex = 0
    this.setAllCoinsCut()
    this.getLeverInfo()
    this.getLeverType()
  },
  onHide() {
    this.isLeverStorage()
  },
  methods: {
    /**
     * 全局币种信息切换
     * 用户点击 币种列表触发的方法
     */
    async setAllCoinsCut () {
			console.log('setAllCoinsCut')
      try {
        let getStorages = uni.getStorageSync('lever')
        if (!getStorages) {
          this.amonntHead = 'BTC/USDT'
        } else {
          this.amonntHead =
            getStorages.currency_name + '/' + getStorages.legal_name
          this.leverStorage.currencyId = getStorages.currency_id
          this.leverStorage.legalId = getStorages.legal_id
          this.leverStorage.legalName = getStorages.legal_name
          this.leverStorage.currencyName = getStorages.currency_name
        }

        this.showFullLoading()
        let amonntList = await this.api.currency.quotation()
        let usdtAmonntList = amonntList.find(item =>
          item.name === (getStorages ? getStorages.legal_name : 'USDT')
        )
       
        this.leverStorage.shareNum = Number(
          usdtAmonntList.quotation.find(
            item => item.currency_id == this.leverStorage.currencyId
          ).lever_share_num
        ).toFixed(2)
        this.leverStorage.overNight = Number(
          usdtAmonntList.quotation.find(
            item => item.currency_id == this.leverStorage.currencyId
          ).overnight
        ).toFixed(2)
        this.getMarketMore()
        this.toCutCoins()
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 获取杠杆交易信息(手数区间 倍数 用户余额)
     * 首次进入页面触发
     */
    async getLeverInfo () {
      const params = {
        legal_id: String(this.leverStorage.legalId),
        currency_id: String(this.leverStorage.currencyId)
      }
      try {
        this.showFullLoading()
        this.leverInfo = await this.api.lever.info(params)
        this.limitPriceInput.times = this.marketPriceInput.times = this.leverInfo.multiple.muit[0].value
      } catch (error) {
        console.log('getLeverInfo错误')
        console.log(error)
      }
    },
    /**
     * 提交合约下单
     * 手动触发
     */
    async onSubmit(value) {
      let inputType = this.limitPriceInput
      let status = 0

      switch (this.kindTitle) {
        case 0:
          inputType = this.limitPriceInput
          break
        case 1:
          inputType = this.marketPriceInput
          status = 1
          break
      }
      
      const params = {
        share: inputType.hands,
        multiple: inputType.times,
        type: value,
        legal_id: this.leverStorage.legalId,
        currency_id: this.leverStorage.currencyId,
        status,
        target_price: inputType.price
      }

      try {
        this.showFullLoading()
        await this.api.lever.submit(params)
        this.router.navigateTo('/pages/lever/check', {type: status})
      } catch (error) {
        console.log(error)
      }
    },
     /**
     * 获取交易类别 （sell or buy）
     * 首次进入页面触发
     */
    getLeverType() {
      let getLeverType = uni.getStorageSync('lever_type')
      console.log('getLeverType', getLeverType);
      if(getLeverType) {
        this.leverType = getLeverType
      }
    },
    /**
     * 点击K线图 图标  跳转到K线图页面
     */
    onKIcon() {
      this.router.navigateTo('/pages/home/kline')
    },
    /**
     * 点击 右侧数据 返回到限价买入价格
     */
    onLeverPrice(price) {
      this.limitPriceInput.price = price
    },
    /**
     * 根据 限价买入/市价买入 判断显示
     */
    modelIsShow (value) {
      return value === this.kindTitle ? true : false
    },
    /**
     * 点击主页面时将下拉框关闭
     */
    onIndex () {
      this.contentShow = false
    },
    /**
     * input 点击 -/+操作
     * 手动触发
     * type为不同input  value为 -/+ 操作
     */
    onInputBtn (type, value) {
      let market = this.marketPriceInput
      let limit = this.limitPriceInput
      const add = 0.01
      const minus = -0.01
      let action = add
      if (value === 'add') {
        action = add
      } else {
        action = minus
      }

      switch (type) {
        case 'marketHands': {
          market.hands = (Number(market.hands) + action * 100).toFixed(2)
          if (Number(market.hands) < 0) {
            market.hands = 0.0
          }
          break
        }
        case 'limitPrice': {
          limit.price = (Number(limit.price) + action).toFixed(2)
          if (Number(limit.price) < 0) {
            limit.price = 0.0
          }
          break
        }
        case 'limitNum': {
          limit.hands = (Number(limit.hands) + action * 100).toFixed(2)
          if (Number(limit.hands) < 0) {
            limit.hands = 0.0
          }
          break
        }
      }
    },
    /**
     * 限价滑块 返回手数
     * 手动触发
     */
    onLimitSliderChange (value) {
      this.limitPriceInput.hands = value
    },
    /**
     * 市价滑块 返回手数
     * 手动触发
     */
    onMarketSliderChange (value) {
      this.marketPriceInput.hands = value
    },
    /**
     * 点击买卖种类内容 传出值
     * 手动触发
     */
    onKindContent (value) {
      this.kindTitle = value
    },
    /**
     * 点击买卖种类头部 数据列表
     * 手动触发
     */
    onKindTitle () {
      this.contentShow = !this.contentShow
    },
    /**
     * 选择倍数
     * 手动触发
     */
    onTimes (type, value) {
      this.timesIndex = value[1]
      switch (type) {
        case 'limitTimes': {
          this.limitPriceInput.times = value[0]
          break
        }
        case 'marketTimes': {
          this.marketPriceInput.times = value[0]
          break
        }
      }
    },
    /**
     * 在离开本页面的时候判断有没有 lever这个缓存 没有就存个默认缓存
     * K线图要这个
     */
    isLeverStorage() {
      if(!uni.getStorageSync('lever')) {
        uni.setStorageSync('lever', {
            currency_name: this.leverStorage.currencyName,
            currency_id: this.leverStorage.currencyId,
            legal_name: this.leverStorage.legalName,
            legal_id: this.leverStorage.legalId
          })
      }
    },
  },
  components: {
    leverHeader,
    leverTimes,
    leverTrade,
    leverInputCenter,
    leverInputLeft,
    leverSlider,
    leverData,
    leverHistory,
    leverHistoryTitle,
    leverHistoryModel,
    leverTradeKind,
    leverTradeInfo
  }
}
</script>

<style lang="scss" scoped>
.title {
  @extend .c-text, .fs-xl;
  width: 100%;
  text-align: center;
  padding-top: 40rpx;
  padding-bottom: 26rpx;
}
.lever {
  .trade {
    padding: 0 28rpx;
    .trade-content {
      @extend .d-flex, .jc-between;
      border-top: 1px solid #f3f3f3;
      .market-input {
        @extend .fs-xs, .c-tip2;
        @include size(375, 58);
        border: 1px solid rgba(222, 222, 222, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 58rpx;
      }
    }
    .trade-price {
      @extend .fs-xxxs, .c-tip2;
      margin-top: 13rpx;
      margin-bottom: 16rpx;
    }
  }
}
</style>