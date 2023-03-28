<template>
  <view class="chargeCoin-page">
    <page-layout>
      <view class="select">
        <view class="currency d-flex">
          <view class="mt-10 sides">{{$t('mine.currencyManagement.chargeCoin.currency')}}：</view>
          <view class="option" :class="{showMore: isShowMore}">
            <axb-check-box ref="radio3" :list="legalCoinList" @change="currencyChange"></axb-check-box>
          </view>
          <view v-if="legalCoinList.length > 4" class="more mt-10" :class="{isRotate}" @tap="onTapOther">
            <c-icon name="down" size="40"></c-icon>
          </view>
        </view>
      </view>
      <view class="qrcode">
        <view class="qrimg">
          <tki-qrcode ref="qrcode" :val="val" :size="314" :onval="true" :loadMake="true" />
        </view>
        <view class="c-primary fs-xs mt-10">{{$t('mine.currencyManagement.chargeCoin.screenshot')}}</view>
        <view class="address">{{val}}</view>
        <button class="copy" @tap="onCopyAddress">{{$t('mine.currencyManagement.chargeCoin.copy')}}</button>
      </view>

      <view class="tip fs-xs lh-1-5">
        {{$t('mine.currencyManagement.chargeCoin.prompt.title')}}
        <br />{{$t('mine.currencyManagement.chargeCoin.prompt.prompt1')}}
        <br />{{$t('mine.currencyManagement.chargeCoin.prompt.prompt2')}}
        <br />{{$t('mine.currencyManagement.chargeCoin.prompt.prompt3')}}
        <br />{{$t('mine.currencyManagement.chargeCoin.prompt.prompt4')}}
        <br />{{$t('mine.currencyManagement.chargeCoin.prompt.prompt5')}}
        <view class="c-warning mt-40">{{$t('mine.currencyManagement.chargeCoin.tip')}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import tkiQrcode from 'tki-qrcode'
import axbCheckBox from '../../../components/common/axb-checkbox/axb-checkbox.vue'

export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.chargeCoin.title',
      currency: 'USDT', //选中币种
      val: '', //地址
      isShowMore: false, //显示更多
      isRotate: false //旋转
    }
  },
  computed: {
    ...mapGetters('currency', ['currencyList']),
    // 法币币种列表
    legalCoinList () {
      const arr = []
      this.currencyList.forEach(item => {
        if (item.is_legal === 1) {
          const el = {
            name: item.name,
            value: item.name,
            checked: 0
          }
          arr.push(el)
        }
      })
      return arr
    },
    // 币种Id
    currencyId() {
      const result = this.currencyList.filter( item => {
        return item.name === this.currency
      })
      return result[0].id
    },
    // USDT下标
    usdtIndex() {
      let i
      this.legalCoinList.forEach( (item, index) => {
        if(item.name === 'USDT'){
          i = index
        }
      })
      return i
    }
  },
  methods: {
    // 获取充币地址
    async getChargeAddress(params) {
      try {
        const message = await this.api.wallet.chargeAddress(params)
        this.val = message
      } catch (err) {}
    },
    //选择币种
    currencyChange(val) {
      this.currency = val
      this.getChargeAddress({ currency: this.currencyId })
    },
    //根据币种Id获取下标
    getIndex(currencyId){
      const name = this.currencyList.filter( item => {
        return item.id == currencyId
      })
      let i
      this.currencysName.forEach( (item, index) => {
        if(item.name === name[0].name){
          i = index
        } 
      })
      return i
    },
    //点击其它
    onTapOther() {
      this.isShowMore = !this.isShowMore
      this.isRotate = !this.isRotate
    },
    // 复制地址
    onCopyAddress() {
      uni.setClipboardData({
        data: this.val,
        success: () => {
          this.toast('mine.currencyManagement.chargeCoin.toast')
        }
      })
    }
  },
  
  onLoad(e) {
    const params = {}
    if (e.currencyId) {
      const index = this.getIndex(e.currencyId)
      this.legalCoinList[index].checked = 1 //由传入的货币Id显示选中的币种
      params.currency = e.currencyId
    } else {
      this.legalCoinList[this.usdtIndex].checked = 1 //默认选中USDT
      params.currency = this.currencyId
    }
    this.currency = "BTC"
    if (e.currencyId > 3) {
      this.isShowMore = true
    }
    this.getChargeAddress(params)
  },

  onNavigationBarButtonTap() {
    this.router.navigateTo(
      '/pages/mine/management/record', {title: this.$t(this.pageTitle)}
    )
  },
  components: {
    tkiQrcode,
    axbCheckBox
  }
}
</script>

<style lang="scss" scoped>
.chargeCoin-page {
  padding: 0 28rpx;
  .select {
    margin-top: 10rpx;
    .chain {
      margin-bottom: 24rpx;
      .help {
        margin-left: 24rpx;
      }
    }
    .currency {
      .sides {
        width: 120rpx;
        white-space: nowrap;
      }
      .option {
        &.showMore {
          height: auto;
          overflow: visible;
        }
        width: 500rpx;
        height: 50rpx;
        overflow: hidden;
      }
      .more{
        &.isRotate {
          transform: rotate(180deg);
        }
        height: 40rpx;
        transition: transform .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
  .qrcode {
    @extend .ta-center;
    .qrimg {
      width: 314rpx;
      margin: 72rpx auto 0;
    }
    .address {
      margin: 48rpx 0;
      font-size: 24rpx;
    }
    .copy {
      @extend .bgc-primary;
      width: 403rpx;
      line-height: 70rpx;
      padding-bottom: 20rpx 0;
      margin: 0 auto 106rpx;
      border-radius: 35rpx;
      color: #fff;
      font-size: 32rpx;
    }
  }
  .tip {
    @extend .mt-45;
    line-height: 36rpx;
  }
}
</style>