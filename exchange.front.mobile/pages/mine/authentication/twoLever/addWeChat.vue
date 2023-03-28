<template>
  <view class="addWeChat-page">
    <page-layout>
      <view class="form">
        <c-inp class="mb-10" :title="$t('common.confirm')" :placeholder="$t('mine.authentication.twoLever.wechat.name.title')" v-model="form.name"></c-inp>
        <c-inp class="mb-10" :title="$t('mine.authentication.twoLever.wechat.account.title')" :placeholder="$t('mine.authentication.twoLever.wechat.account.title')" v-model="form.account"></c-inp>

        <view class="code">
          <text class="mt-15">{{$t('mine.authentication.twoLever.qrCode')}}</text>
          <c-upload :url="uploadUrl" :imgUrl="form.url" @success="onSuccess" iconName="addd" border qrcode></c-upload>
        </view>

        <button class="c-button" @tap="onTapConfirm">{{$t('common.confirm')}}</button>
      </view>
    </page-layout>
  </view>
</template>

<script>
import CUpload from '../../../../components/common/CUpload'
import graceChecker from '../../../../utils/graceUI/jsTools/graceChecker'

import { serverURL } from '../../../../config/network'


export default {
  data() {
    return {
      pageTitle: 'mine.authentication.twoLever.wechat.add',
      uploadUrl: `${serverURL}/api/upload`,
      form: {
        name: '',
        account: '',
        url: '',
        text: ''
      },
      id: '',  
      tipText: 'mine.authentication.twoLever.addSuccessful' 
    }
  },
  methods: {
    onSuccess(e) {
      this.form.url = e.imgUrl
      this.form.text = e.qrcodeUrl
    },
    // 确定
    async confirm() {
      //添加的参数
      const add = {
        bank: 'wechat',
        value: this.form
      }
      //修改的参数
      const edit = {
        bank: 'wechat',
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
      const rules = [
        {
          name: 'name',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.wechat.name.check'
        },
        {
          name: 'account',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.wechat.account.check1'
        },
        {
          name: 'account',
          checkType: 'reg',
          checkRule: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
          errorMsg: 'mine.authentication.twoLever.wechat.account.check2'
        },
        {
          name: 'url',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.twoLever.url'
        }
      ]
      const checkRes = graceChecker.check(this.form, rules)
      if (checkRes) {
        this.confirm()
      } else {
        this.toast(graceChecker.error, 'none')
      }
    },
  },
  onLoad(e){
    // console.log(e);
    
    if(JSON.stringify(e) !== '{}'){
      this.form = JSON.parse(e.value),
      this.id = e.id,
      this.pageTitle = 'mine.authentication.twoLever.wechat.edit'
      this.tipText = 'mine.authentication.twoLever.editSuccessful'
    }
  },
  components: {
    CUpload
  }
}
</script>

<style lang="scss" scoped>
.addWeChat-page {
  @extend .px-28;
  .form {
    .code {
      @extend .d-flex, .pt-20;
      /deep/ .c-uploade {
        margin-left: 75rpx;
        .content {
          width: 142rpx;
          height: 142rpx;
        }
      }
    }
    button {
      margin-top: 120rpx;
    }
  }
}
</style>