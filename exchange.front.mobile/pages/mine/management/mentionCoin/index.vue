<template>
  <page-layout class="mentionCoin-page">
    <page-layout>
      <view class="form">
        <view class="mt-20">
          <text>{{$t('mine.currencyManagement.mentionCoin.currency')}}：</text>
          <view class="d-flex">
            <picker
              class="fs-sm"
              :range="legalCoinList"
              :value="index"
              @change="selectCurrency"
            >{{legalCoinList[index]}}</picker>
            <c-icon class="ml-10" name="right"></c-icon>
          </view>
        </view>
        <view @tap="onTapAddress" style="margin-bottom: 42rpx">
          <text class="f-1">{{$t('mine.currencyManagement.mentionCoin.mentionAddress.title')}}：</text>
          <view class="f-1 ta-right ellipsis">
            <text class="mr-10">{{form.address}}</text>
            <c-icon name="right"></c-icon>
          </view>
        </view>
        <c-inp
          :title="$t('mine.currencyManagement.mentionCoin.quantity')+'：'"
          :placeholder="$t('mine.currencyManagement.mentionCoin.min')+Number(info.min_number).toFixed(2)"
          type="number"
          :border="false"
          v-model="form.quantity"
        ></c-inp>
        <view class="c-primary">
          <text>{{$t('mine.currencyManagement.mentionCoin.limit') + currencyBalance.toFixed(2)}}</text>
          <text @tap="onTapAll">{{$t('mine.currencyManagement.mentionCoin.all')}}</text>
        </view>
        <view>
          <text>{{$t('mine.currencyManagement.mentionCoin.serviceCharge')}}</text>
          <text>{{serviceCharge.toFixed(2)}}</text>
        </view>
      </view>

      <button class="c-button" @tap="submit">{{$t('mine.currencyManagement.mentionCoin.confirm')}}</button>

      <view class="tip c-warning fs-xs lh-1-5">
        {{$t('mine.currencyManagement.mentionCoin.tip.title')}}
        <br />
        {{$t('mine.currencyManagement.mentionCoin.tip.tip1')+Number(info.min_number).toFixed(2)+info.name}}。
        <br />
        {{$t('mine.currencyManagement.mentionCoin.tip.tip2')+serviceCharge.toFixed(2)}}。
        <br />{{$t('mine.currencyManagement.mentionCoin.tip.tip3')}}
      </view>
    </page-layout>
  </page-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import graceChecker from '../../../..//utils/graceUI/jsTools/graceChecker'

export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.mentionCoin.title',
      index: 0, //选中币种下标
      // 提币信息
      info: {
        name: 'USDT',
        change_balance: 0.0,
        min_number: 0.0,
        rate: 0.0
      },
      changeUsableList: [], // 币币账户
      form: {
        address: '',
        quantity: ''
      }
    }
  },

  computed: {
    ...mapGetters('currency', ['currencyList']),
    // 法币币种列表
    legalCoinList () {
      const arr = []
      this.currencyList.forEach(item => {
        if (item.is_legal === 1) {
          arr.push(item.name)
        }
      })
      return arr
    },
		// 币种id
    currencyId() {
      const result = this.currencyList.filter( item => {
        return item.name === this.legalCoinList[this.index]
      })
      return result[0].id
    },
		// USDT下标
    usdtIndex() {
      let i
      this.legalCoinList.forEach( (item, index) => {
        if(item === 'USDT'){
          i = index
        }
      })
      return i
    },
    // 币种余额
    currencyBalance () {
      const res = this.changeUsableList.filter(item => {
        return item.currency_name === this.info.name
      })
      return res[0] ? Number(res[0].change_balance) : 0
    },
    // 手续费
    serviceCharge () {
      if (!this.form.quantity) return 0
      return (this.form.quantity * this.info.rate) / 100
    },
  },
  
  methods: {
    //获取币币账户信息
    async getAccountInfo () {
      try {
        const message = await this.api.wallet.info()
        this.changeUsableList = message.change_wallet.balance // 币币
      } catch {}
    },

    // 获取提币信息
    async getMentionCoinInfo() {
      try {
        const message = await this.api.wallet.mentionInfo({ currency: this.currencyId })
        this.info = message
      } catch {}
    },

    //获取提币地址列表
    async getMentionAddress() {
      try {
        const message = await this.api.wallet.mentionAddress({ currency: this.currencyId })
        this.form.address = message[0].address
      } catch {
        this.form.address = ''
      }
    },

    // 提币
    async mentionCoin() {
      const params = {
        currency: this.currencyId,
        number: this.form.quantity,
        rate: this.info.rate,
        address: this.form.address
      }
      try {
        await this.api.wallet.mentionCoin(params)
        this.toast('mine.currencyManagement.mentionCoin.toast.submit')
        this.form.quantity = ''
      } catch {}
    },

    // 提交
    submit() {
      const rule = [
        {
          name: 'address',
          checkType: 'notnull',
          errorMsg: 'mine.currencyManagement.mentionCoin.toast.address'
        },
        {
          name: 'quantity',
          checkType: 'notnull',
          errorMsg: 'mine.currencyManagement.mentionCoin.toast.quantity1'
        },
        {
          name: 'quantity',
          checkType: 'between',
          checkRule: `${this.info.min_number}, ${this.currencyBalance}`,
          errorMsg: 'mine.currencyManagement.mentionCoin.toast.quantity2'
        }
      ]
      const checkRes = graceChecker.check(this.form, rule)
      if (checkRes) {
        this.mentionCoin()
      } else {
        this.toast(graceChecker.error)
      }
    },

    //选择币种
    selectCurrency(e) {
      this.index = e.target.value
      this.getMentionCoinInfo()
      this.getMentionAddress()
    },

    //点击提币地址
    onTapAddress() {
      const params = {
        currencyId: this.currencyId,
        currencyName: this.info.name,
        selected: this.form.address
      }
      this.router.navigateTo(
        '/pages/mine/management/mentionCoin/mentionAddress',
        params
      )
    },

    //输入全部
    onTapAll() {
      this.form.quantity = Number(this.info.change_balance).toFixed(2)
    }
  },

  async onLoad(e) {
    this.index = this.usdtIndex //默认选中USDT
    await this.getMentionAddress()
    if(e.address) this.form.address = e.address

    this.getAccountInfo()
    this.getMentionCoinInfo()
  },
  
  onNavigationBarButtonTap() {
    this.router.navigateTo(
      '/pages/mine/management/record', {title: this.$t(this.pageTitle)}
    )
  },
}
</script>

<style lang="scss" scoped>
.mentionCoin-page {
  padding: 0 28rpx;	
  .form {
    > view {
      @extend .flex-between;
      margin-bottom: 72rpx;
    }
    .c-primary{
      /* #ifdef H5 */
      margin-top: -30rpx;
      /* #endif */

      /* #ifdef APP-PLUS */
      margin-top: 42rpx;
      /* #endif */
    }
  }
  button {
    margin-bottom: 77rpx;
  }
}
</style>