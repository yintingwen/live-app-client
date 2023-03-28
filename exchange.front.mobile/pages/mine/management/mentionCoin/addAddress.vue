<template>
  <view class="addAddress-page px-28">
    <page-layout>
      <view class="form">
        <view class="flex-between bb-g0 py-30">
          <text>{{$t('mine.currencyManagement.mentionCoin.addAddress.currency')}}</text>
          <text>{{this.currencyName}}</text>
        </view>
        <c-inp :title="$t('mine.currencyManagement.mentionCoin.addAddress.note')" :placeholder="$t('mine.currencyManagement.mentionCoin.addAddress.enterNote')" v-model="form.notes"></c-inp>
        <c-inp :title="$t('mine.currencyManagement.mentionCoin.addAddress.address')" :placeholder="$t('mine.currencyManagement.mentionCoin.addAddress.enterAddress')" v-model="form.address"></c-inp>
      </view>
      <button class="c-button" @tap="onTapConfirm">{{$t('mine.currencyManagement.mentionCoin.addAddress.confirm')}}</button>
    </page-layout>
  </view>
</template>

<script>
import graceChecker from '../../../../utils/graceUI/jsTools/graceChecker'

export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.mentionCoin.addAddress.title',
      currencyName: '', //币种名称
      form: {
        currency_id: '',
        address: '',
        notes: ''
      }
    }
  },

  methods: {
    //确定
    async confirm() {
      try {
        await this.api.wallet.addAddress(this.form)
        this.toast('mine.currencyManagement.mentionCoin.addAddress.toast.addSuccess')
        setTimeout(() => {
          this.router.navigateBack()
        }, 2000)
      } catch (error) {}
    },
    //点击确定
    onTapConfirm() {
      const rules = [
        {
          name: 'notes',
          checkType: 'notnull',
          errorMsg: 'mine.currencyManagement.mentionCoin.addAddress.toast.notes'
        },
        {
          name: 'address',
          checkType: 'notnull',
          errorMsg: 'mine.currencyManagement.mentionCoin.addAddress.toast.address'
        }
      ]
      const checkRes = graceChecker.check(this.form, rules)

      if (checkRes) {
        this.confirm()
      } else {
        this.toast(graceChecker.error)
      }
    }
  },
  
  onLoad(e) {
    this.form.currency_id = e.currencyId
    this.currencyName = e.currencyName
  }
}
</script>

<style lang="scss" scoped>
.addAddress-page {
  padding: 0 28rpx;
  button {
    margin-top: 390rpx;
  }
}
</style>