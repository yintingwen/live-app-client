<template>
  <view class="addBankCard-page">
    <page-layout>
      <view class="form">
        <c-inp class="mb-10" :title="$t('mine.authentication.twoLever.bankCard.name.title')" :placeholder="$t('mine.authentication.twoLever.bankCard.name.enter')" v-model="form.cardname"></c-inp>
        <c-inp class="mb-10" :title="$t('mine.authentication.twoLever.bankCard.cardNum.title')" :placeholder="$t('mine.authentication.twoLever.bankCard.cardNum.enter')" v-model="form.cardnum" type="number"></c-inp>
        <c-inp class="mb-10" :title="$t('mine.authentication.twoLever.bankCard.cardBank.title')" :placeholder="$t('mine.authentication.twoLever.bankCard.cardBank.enter')" v-model="form.cardbank"></c-inp>
        <c-inp :title="$t('mine.authentication.twoLever.bankCard.subBank.title')" :placeholder="$t('mine.authentication.twoLever.bankCard.subBank.enter')" v-model="form.cardbanks"></c-inp>

        <button class="c-button" @tap="onTapConfirm">{{$t('common.confirm')}}</button>
      </view>
    </page-layout>
  </view>
</template>

<script>
import graceChecker from '../../../../utils/graceUI/jsTools/graceChecker'

export default {
  data() {
    return {
      pageTitle: 'mine.authentication.twoLever.bankCard.add',
      form: {
        cardname: '',
        cardnum: '',
        cardbank: '',
        cardbanks: ''
      },
      id: '',  
      tipText: 'mine.authentication.twoLever.addSuccessful' 
    }
  },
  methods: {
    // 确定
    async confirm() {
      //添加的参数
      const add = {
        bank: 'bank',
        value: this.form
      }
      //修改的参数
      const edit = {
        bank: 'bank',
        id: this.id,
        value: this.form
      }
      let params = {}
      this.id ? params = edit : params = add
      try {
        const msg = await this.api.wallet.payment(params)

        this.toast(this.tipText, 'none')
        setTimeout(() => {
          this.router.navigateBack(this.id ? 1 : 2)
        }, 2000)
      } catch (error) {}
    },
    // 点击确定
    onTapConfirm() {
      console.log(this.form);
      
      const rules = [
        {
          name: 'cardname',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.bankCard.name.check'
        },
        {
          name: 'cardnum',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.bankCard.cardNum.check1'
        },
        {
          name: 'cardnum',
          checkType: 'reg',
          checkRule: /^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/,
          errorMsg: 'mine.authentication.twoLever.bankCard.cardNum.check2'
        },
        {
          name: 'cardbank',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.bankCard.cardBank.check'
        },
        {
          name: 'cardbanks',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.bankCard.subBank.check'
        }
      ]
      const checkRes = graceChecker.check(this.form, rules)
      if (checkRes) {
        this.confirm()
      } else {
        this.toast(graceChecker.error, 'none')
      }
    }
  },
  onLoad(e){
    console.log(e);
    
    if(JSON.stringify(e) !== '{}'){
      this.form = JSON.parse(e.value),
      this.id = e.id
      this.pageTitle = 'mine.authentication.twoLever.bankCard.edit'
      this.tipText = 'mine.authentication.twoLever.editSuccessful'
    }
  }
}
</script>

<style lang="scss" scoped>
.addBankCard-page {
  @extend .px-28;
  .form {
    button {
      margin-top: 120rpx;
    }
  }
}
</style>