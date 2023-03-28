<template>
  <view class="check">
    <!-- 页头小demo -->
    <check-demo :tradeHistoryInfo="tradeHistoryInfo" />

    <!-- 统计: 净值， 总浮动盈亏， 风险率 -->
    <check-statistics :tradeHistoryInfo="tradeHistoryInfo" />

    <!-- 持仓， 挂单， 平仓记录 -->
    <check-title 
        @onTitle="onHistoryTitle"
        @onHistoryTitle="onHistoryTitle" 
        :actionIndex="historyIndex" />

    <!-- 一键平仓， 等等 -->
    <lever-history-model 
        @onHistoryTitle="onHistoryTitle" 
        @onOnceFlatStorage="onOnceFlatStorage" 
        @onTime="onTimeReverse" 
        :putOrderBool="false"
        :actionIndex="historyIndex" />

    <!-- 账单数据显示 -->
    <lever-history
        @onHistoryTitle="onHistoryTitle"
        @onFlatStorage="onFlatStorage"
        @onRemove="onTableRemove"
        @onCheckStop="onCheckStop"
        :tableData="setEntrustData"
        :actionIndex="historyIndex" />
  </view>
</template>

<script>
import marketMixin from '../../mixins/market'
import checkTableMixin from '../../mixins/lever/leverTable'
import CheckDemo from "../../components/lever/check/CheckDemo";
import CheckTitle from "../../components/lever/check/CheckTitle";
import CheckStatistics from "../../components/lever/check/CheckStatistics";
import LeverHistory from '../../components/lever/index/LeverHistory';
import LeverHistoryModel from '../../components/lever/index/LeverHistoryModel';

export default {
  mixins: [marketMixin, checkTableMixin],
  data() {
    return {
      pageTitle: 'check.title',
      checkTableData: '',
      tradeHistoryInfo: '',
			isOnLoad: false,
			timeRun: ''
    };
  },
	onLoad (e) {
		this.onLoadIsShow(e.type)
	},
  onShow () {
    this.setAllTradeHistory = 1
    this.subMarket()
		this.timeRun = setInterval(() => this.getCurrencyDetail(), 1000)
  },
  methods: {
		/**
		 * 首次进入页面判断显示 挂单/持仓/平仓记录
		 */
		onLoadIsShow(type) {
			if (typeof (type) === 'string') {
				this.isOnLoad = true
				this.historyIndex = Number(type)
				switch (this.historyIndex) {
					case 0: {
						this.entrustDataType = 'entrust'
						break
					}
					case 1: {
						this.entrustDataType = 'handStorage'
						break
					}
					case 2: {
						this.entrustDataType = 'flatStorageHt'
						break
					}
				}
			}
		},
		/**
		 * 点击 + 号跳转到合约下单页面
		 */
    onNavigationBarButtonTap() {
      uni.switchTab({
        url: '/pages/lever/index'
      })
    },
    /**
     * 获取币种详情
     */
    async getCurrencyDetail() {
      const params = {
        type: 'lever',
        currency: 3
      }
      this.tradeHistoryInfo = await this.api.wallet.currencyDetail(params)
    }
  },
  onHide() {
		console.log(1)
    this.unSubMarket()
		clearInterval(this.timeRun)
  },
	beforeDestroy() {
		console.log(2)
		this.unSubMarket()
		clearInterval(this.timeRun)
	},
  components: {
    CheckDemo,
    CheckTitle,
    CheckStatistics,
    LeverHistory,
    LeverHistoryModel
  }
};
</script>

<style lang="scss" scoped>
</style>