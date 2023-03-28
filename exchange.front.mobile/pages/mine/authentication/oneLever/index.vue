<template>
  <view class="oneLever-page">
    <page-layout>
      <c-inp class="mb-10" :title="$t('mine.authentication.oneLever.name')" :placeholder="$t('mine.authentication.oneLever.enterName')" v-model="form.name"></c-inp>
      <c-inp type="idcard" :title="$t('mine.authentication.oneLever.idCard')" :placeholder="$t('mine.authentication.oneLever.enterIdCard')" v-model="form.card_id"></c-inp>
      <button class="c-button" @tap="onTapNext">{{$t('mine.authentication.oneLever.next')}}</button>
    </page-layout>
  </view>
</template>

<script>
import graceChecker from '../../../../utils/graceUI/jsTools/graceChecker'

export default {
  data() {
    return {
      pageTitle: 'mine.authentication.oneLever.title',
      form: {
        name: '',
        card_id: ''
      }
    }
  },
  methods: {
    //下一步
    next() {
      this.router.navigateTo(
        '/pages/mine/authentication/oneLever/uploadIdCard',
        this.form
      )
    },
    // 点击下一步
    onTapNext() {
      const rules = [
        {
          name: 'name',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.oneLever.toast.name'
        },
        {
          name: 'name',
          checkType: 'reg',
          checkRule: /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/,
          errorMsg: 'mine.authentication.oneLever.toast.checkName'
        },
        {
          name: 'card_id',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.oneLever.toast.idCard'
        },
        {
          name: 'card_id',
          checkType: 'reg',
          checkRule: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
          errorMsg: 'mine.authentication.oneLever.toast.checkIdCard'
        },
      ]
      const checkRes = graceChecker.check(this.form, rules)
      if (checkRes) {
        this.next()
      } else {
        this.toast(graceChecker.error, 'none')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.oneLever-page {
  padding: 0 28rpx;
  button {
    margin-top: 105rpx;
  }
}
</style>