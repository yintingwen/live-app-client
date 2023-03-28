<template>
  <view class="exchange-page">
    <page-layout>
      <!-- 币种 -->
      <div class="currency">
        <xfl-select @change="selectCurrency" :list="exchangeCoinList" :initValue="currency" :clearable="false"></xfl-select>
        <c-icon name="transform" size="46"></c-icon>
        <div class="right">USDT</div>
      </div>

      <!-- 表单 -->
      <view class="form">
        <view>
          <text>{{$t('mine.exchange.price')}}</text>
          <text>{{price}} USDT</text>
        </view>
        <c-inp
          v-model="form.quantity"
          :title="$t('mine.exchange.quantity')"
          :placeholder="$t('mine.exchange.enterQuantity')"
          :border="false"
          type="number"
        ></c-inp>
        <view>
          <text>{{$t('mine.exchange.balance')}}</text>
          <view>
            <text>{{currencyBalance.toFixed(4)}} BTC</text>
            <text class="c-primary ml-20" @tap="onTapAll">{{$t('mine.exchange.all')}}</text>
          </view>
        </view>
        <view>
          <text>{{$t('mine.exchange.serviceCharge')}}</text>
          <text>{{serviceCharge.toFixed(4)}} USDT</text>
        </view>
        <view>
          <text>{{$t('mine.exchange.afterChange')}}</text>
          <text>{{afterChange.toFixed(4)}} USDT</text>
        </view>

        <view class="tip">{{$t('mine.exchange.tip')}}</view>
        <button class="c-button" @tap="onTapConfirm">{{$t('mine.exchange.confirm')}}</button>
      </view>
    </page-layout>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import market from '../../../mixins/market'
import xflSelect from '../../../components/common/xfl-select.vue'

export default {
  mixins: [market],

  data() {
    return {
      pageTitle: 'mine.exchange.title',
      currency: 'BTC', // 币种名
      rate: 0, // 手续费
      min_number: 0, // 最小值
      changeUsableList: [], // 币币账户
      form: {
        quantity: '' //数量
      }
    }
  },

  computed: {
    ...mapGetters('currency', ['currencyList']),
    // 币兑币种列表
    exchangeCoinList () {
      const arr = []
      this.currencyList.filter(item => item.name !== 'USDT').forEach(item => {
        if (item.is_flash_exchange === 1) {
          arr.push(item.name)
        }
      })
      return arr
    },
    // 币种Id
    currencyId(){
      const result = this.currencyList.filter( item => { 
        return item.name === this.currency
      })
      return result[0].id
    },
    // 当前报价
    price () {
      if (!this.marketData.length) return 0
      const res = this.marketData[0].value.filter(item => item.currencyName === this.currency)
      return res[0].close
    },
    // 币种余额
    currencyBalance () {
      const res = this.changeUsableList.filter(item => {
        return item.currency_name === this.currency
      })
      return res[0] ? Number(res[0].change_balance) : 0
    },
    // 手续费
    serviceCharge () {
      if (!this.form.quantity) return 0
      return (this.form.quantity * this.rate) / 100
    },
    // 兑换后实际数
    afterChange () {
      return (this.form.quantity - this.serviceCharge) * this.price
    },
  },
	
  methods: {
    //获取币币账户信息
    async getAccountInfo () {
      try {
        const message = await this.api.wallet.info()
        this.changeUsableList = message.change_wallet.balance // 币币
      } catch { }
    },

    //获取币种信息（法币）
    async getCoinInfo () {
      const message = await this.api.wallet.mentionInfo({ currency: this.currencyId })
      this.rate = message.rate
      this.min_number = message.min_number
    },

    // 币兑
    async confirm() {
      const params = {
        currency_id: this.currencyId,
        number: Number(this.form.quantity)
      }
      try {
        await this.api.wallet.exchange(params)
        this.toast('mine.exchange.toast.success', 'none', 1000)
        setTimeout(() => {
          this.router.navigateTo('/pages/mine/exchange/record')
        }, 1500)
      } catch(error) {
        this.toast(error)
      }
    },

    //点击确定
    onTapConfirm() {
			if (this.form.quantity) {
				if (Number(this.form.quantity) >= this.min_number && this.form.quantity <= this.currencyBalance) {
          this.confirm()
				} else {
					this.toast('mine.exchange.toast.scope', 'none', 1000)
				}
			} else {
				this.toast('mine.exchange.enterQuantity', 'none', 1000)
			}
    },

    //选择币种
    selectCurrency(e) {
      this.currency =  e.newVal
      this.getCoinInfo()
    },

    //输入全部
    onTapAll() {
      this.form.quantity = this.currencyBalance.toFixed(4).toString()
    },
  },

  async onLoad(e) {
    await this.getAccountInfo()
    await this.getCoinInfo()
    this.subMarket()
  },

  onUnload(){
    this.unSubMarket()
  },

  onNavigationBarButtonTap() {
    this.router.navigateTo('/pages/mine/exchange/record')
  },
  
  components: {
    xflSelect
  }
}
</script>

<style lang="scss" scoped>
.exchange-page {
  .currency{
    @extend .bgc-primary, .c-white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 142rpx;
    font-size: 26rpx;
    .right{
      width: 100rpx;
    }
  }
  .form{
    padding: 0 28rpx;
    > view{
      @extend .flex-between;
      padding: 30rpx 0;
    }
    .tip {
      @extend .c-warning, .fs-xxs;
      margin: 0 0 100rpx 0;
    }
  }
}
</style>