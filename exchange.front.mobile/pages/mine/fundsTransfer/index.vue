<template>
  <view class="fundsTransfer-page">
    <page-layout>
      <!-- 切换账户 -->
      <view class="transfer flex-around">
        <view class="selectType">
          <xfl-select ref="left" @change="selectLeft" :list="leftList" :initValue="leftAccount" :clearable="false" :borderRadius="false"></xfl-select>
        </view>
        <view>
          <c-icon class="c-primary" name="transform" size="32"></c-icon>
        </view>
        <view class="selectType">
          <xfl-select ref="right" @change="selectRight" :list="rightList" :initValue="rightAccount" :clearable="false" :borderRadius="false"></xfl-select>
        </view>
      </view>

      <!-- form -->
      <view class="form">
        <view class="coin flex-between mb-30">
          <text>{{$t('mine.fundsTransfer.currency')}}</text>
          <view class="d-flex">
            <picker
              class="fs-sm"
              :range="currentList"
              :value="index"
              @change="selectCurrency"
            >{{currentList[index]}}</picker>
            <c-icon class="ml-10" name="right"></c-icon>
          </view>
        </view>
        <c-inp v-model="quantity" type="number" :title="$t('mine.fundsTransfer.quantity')" :placeholder="$t('mine.fundsTransfer.enterQuantity')" :border="false"></c-inp>
        <view class="available flex-between  mt-30">
          <text class="c-placehold">{{$t('mine.fundsTransfer.max') +' '+ currencyBalance +' '+ currentList[index]}}</text>
          <text class="c-primary" @tap="onTapAll">{{$t('mine.fundsTransfer.all')}}</text>
        </view>

        <view class="tip">{{$t('mine.fundsTransfer.tip')}}</view>
        <button class="c-button" @tap="onTapConfirm">{{$t('mine.fundsTransfer.confirm')}}</button>
      </view>
    </page-layout>
    <c-confirm ref="confirm" @confirm="onConfirm">{{$t('mine.fundsTransfer.toast.confirmTransfer')}}?</c-confirm>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import xflSelect from '../../../components/common/xfl-select.vue'

export default {
  data() {
    return {
      pageTitle: 'mine.fundsTransfer.title',
      leftList: [
        {value: this.$t('mine.fundsTransfer.fund'), disabled: false}, 
        {value: this.$t('mine.fundsTransfer.contract'), disabled: false}, 
        {value: this.$t('mine.fundsTransfer.coins'), disabled: false}
      ],
      rightList: [
        {value: this.$t('mine.fundsTransfer.fund'), disabled: false}, 
        {value: this.$t('mine.fundsTransfer.contract'), disabled: false}, 
        {value: this.$t('mine.fundsTransfer.coins'), disabled: false}
      ],
      leftAccount: this.$t('mine.fundsTransfer.fund'),
      rightAccount: this.$t('mine.fundsTransfer.contract'),
      quantity: '', // 划转数量
      min_number: '', // 最小值
      index: 1, // 选中币种下标
      leverUsableList: [], // 合约
      legalUsableList: [], // 法币
      changeUsableList: [], // 币币
    }
  },
  computed: {
    ...mapGetters('currency', ['currencyList']),
    // 币种Id
    currencyId: {
      get(){
        const result = this.currencyList.filter( item => { 
          return item.name === this.currentList[this.index]
        })
        return result[0].id
      },
      set(val){}
    },
    // 币种余额
    currencyBalance () {
      let balance = '0.0000'
      if (this.leftAccount === this.$t('mine.fundsTransfer.fund')) {
        this.legalUsableList.some(item => {
          if (item.currency === this.currencyId) {
            balance = Number(item.legal_balance).toFixed(4)
            return true
          }
        })
      } else if (this.leftAccount === this.$t('mine.fundsTransfer.contract')) {
        this.leverUsableList.some(item => {
          if (item.currency === this.currencyId) {
            balance = Number(item.lever_balance).toFixed(2)
            return true
          }
        })
      } else if (this.leftAccount === this.$t('mine.fundsTransfer.coins')) {
        this.changeUsableList.some(item => {
          if (item.currency === this.currencyId) {
            balance = Number(item.change_balance).toFixed(2)
            return true
          }
        })
      }
      return balance
    },
		// 划转类型
    transferType () {
      let type = 2
      switch (true) {
        case this.leftAccount === this.$t('mine.fundsTransfer.fund') && this.rightAccount === this.$t('mine.fundsTransfer.contract'):
          type = 2 // 法币转合约
          break
        case this.leftAccount === this.$t('mine.fundsTransfer.contract') && this.rightAccount === this.$t('mine.fundsTransfer.fund'):
          type = 1 // 合约转法币
          break
        case this.leftAccount === this.$t('mine.fundsTransfer.coins') && this.rightAccount === this.$t('mine.fundsTransfer.contract'):
          type = 3 // 币币转合约
          break
        case this.leftAccount === this.$t('mine.fundsTransfer.contract') && this.rightAccount === this.$t('mine.fundsTransfer.coins'):
          type = 4 // 合约转币币
          break
        case this.leftAccount === this.$t('mine.fundsTransfer.coins') && this.rightAccount === this.$t('mine.fundsTransfer.fund'):
          type = 5 // 币币转法币
          break
        case this.leftAccount === this.$t('mine.fundsTransfer.fund') && this.rightAccount === this.$t('mine.fundsTransfer.coins'):
          type = 6 // 法币转币币
          break

        default: type = 0
          break
      }
      return type
    },
    // USDT下标
    usdtIndex() {
      let i
      this.currentList.forEach( (item, index) => {
        if(item === 'USDT'){
          i = index
        }
      })
      return i
    },

    // 币种列表
    coinList () {
      const arr = []
      this.currencyList.forEach(item => {
        arr.push(item.name)
      })
      return arr
    },
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
    // 合约币种列表
    leverCoinList () {
      const arr = []
      this.currencyList.forEach(item => {
        if (item.is_lever === 1) {
          arr.push(item.name)
        }
      })
      return arr
    },
    // 对应币种列表下标
    listIndex () {
      let index = 0
      if (this.leftValue === this.$t('mine.fundsTransfer.fund')) {
        index = 0
      } else if (this.leftValue === this.$t('mine.fundsTransfer.contract')) {
        index = 1
      } else if (this.leftValue === this.$t('mine.fundsTransfer.coins')) {
        index = 2
      }
      return index
    },
    // 当前列表
    currentList () {
      let list = []
      switch (this.listIndex) {
        case 0: // 法币
          list = this.legalCoinList
          break
        case 1: // 合约
          list = this.leverCoinList
          break
        case 2: // 币币
          list = this.coinList
          break

        default:
          break
      }
      return list
    },
  },
	
	watch:{
    leftAccount(val){
      this.rightList.forEach( item => {
        if(val === item.value) {
          item.disabled = true
        }else{
          item.disabled = false
        }
      })
    },
    rightAccount(val){
      this.leftList.forEach( item => {
        if(val === item.value) {
          item.disabled = true
        }else{
          item.disabled = false
        }
      })
    },
	},
	
  methods: {
    //获取账户信息
    async getAccountInfo() {
      try {
        const message = await this.api.wallet.info()
        this.leverUsableList = message.lever_wallet.balance  //合约
        this.legalUsableList = message.legal_wallet.balance  //法币
        this.changeUsableList = message.change_wallet.balance // 币币
      } catch{}
    },

    //获取币种信息（法币）
    async getCoinInfo () {
      const message = await this.api.wallet.mentionInfo({ currency: this.currencyId })
      this.min_number = message.min_number
    },

    // 确认划转
    async onConfirm() {
      const params = {
        type: String(this.transferType),
        currency_id: this.currencyId,
        number: Number(this.quantity)
      }
      try {
        await this.api.wallet.transfer(params)
        this.toast('mine.fundsTransfer.toast.success', 'none', 1000)

        setTimeout(() => {
          this.router.navigateTo('/pages/mine/fundsTransfer/record')
        }, 1500)
      } catch {}
    },
    //提交
    onTapConfirm() {
			if (this.quantity) {
				if (Number(this.quantity) >= this.min_number && Number(this.quantity) <= this.currencyBalance) {
					if (this.transferType !== 0) {
						this.onConfirm()
					} else {
						this.toast('mine.fundsTransfer.toast.same', 'none', 1000)
					}
				} else {
					this.toast('mine.fundsTransfer.toast.scope', 'none', 1000)
				}
			} else {
				this.toast('mine.fundsTransfer.toast.enter', 'none', 1000)
			}
    },
    //根据币种Id获取下标
    getIndex(currencyId){
      const name = this.currencyList.filter( item => {
        return item.id == currencyId
      })
      let i
      this.currencysName.forEach( (item, index) => {
        if(item === name[0].name){
          i = index
        } 
      })
      return i
    },

    //选择左侧账户
    selectLeft(e) {
			this.leftAccount = e.newVal
		},
		//选择右侧账户
    selectRight(e) {
			this.rightAccount = e.newVal
		},
    //选择币种
    selectCurrency(e) {
      this.index = e.target.value
      this.getCoinInfo()
    },
 
    //获取账户下标
    getAccountIndex(account){
      let i = 0
      this.leftList.forEach( (item,index) =>{
        if(item.value === account) i = index
      })
      return i 
    },

    //输入全部
    onTapAll() {
      this.quantity = this.currencyBalance
    },
  },

  async onLoad(e) {
    await this.getAccountInfo()
    await this.getCoinInfo()
    
    if(e.type) {
      const index = this.getAccountIndex(this.$t(e.type))
      this.$refs.left.onClickItem(index, this.$t(e.type))
      this.$refs.right.onClickItem(index === 0 ? 1:0, index === 0 ? this.rightList[1].value : this.rightList[0].value) 
      this.$refs.left.onListHide()
      this.$refs.right.onListHide()
    }
    if(e.currencyId){
      this.currencyId = e.currencyId   
      const index = this.getIndex(e.currencyId)
      this.index = index
    }else{
      this.index = this.usdtIndex //默认选中USDT
    }
  },

  onNavigationBarButtonTap() {
    this.router.navigateTo('/pages/mine/fundsTransfer/record')
  },
  components: {
    xflSelect
  }
}
</script>

<style lang="scss" scoped>
.fundsTransfer-page {
  @extend .px-28;
  .transfer {
    margin: 35rpx 0 110rpx 0;
    .show-box{
      @extend .bgc-primary;
      // border-radius: 0;
      // .list{
      //   border-radius: 0;
      // }
    }
  }
  .form {
    .tip {
      @extend .c-warning, .ta-center, .fs-xxs;
      margin: 73rpx 0 130rpx 0;
    }
  }
}
</style>