<template>
  <view class="uploadIdCard-page">
    <page-layout>

      <view class="step">
        <view class="content">
          <text>{{$t('mine.authentication.oneLever.uploadIdCard.step1')}}</text>
          <view class="photo d-flex">
            <view class="reference">
              <view class="title">{{$t('mine.authentication.oneLever.uploadIdCard.reference')}}</view>
              <view class="img">
                <image src="../../../../static/image/mine/id_card_1.png" mode="widthFix" />
              </view>
            </view>
            <view class="your">
              <view class="title">{{$t('mine.authentication.oneLever.uploadIdCard.your')}}</view>
              <view class="p">
                <c-upload :url="uploadUrl" @success="onSuccessFirst" iconName="camera" iconSize="90"></c-upload>
              </view>
            </view>
          </view>
          <view class="tip">
            {{$t('mine.authentication.oneLever.uploadIdCard.tip')}}
          </view>
        </view>
      </view>

      <view class="step">
        <view class="content">
          <text>{{$t('mine.authentication.oneLever.uploadIdCard.step2')}}</text>
          <view class="photo d-flex">
            <view class="reference">
              <view class="title">{{$t('mine.authentication.oneLever.uploadIdCard.reference')}}</view>
              <view class="img">
                <image src="../../../../static/image/mine/id_card_2.png" mode="widthFix" />
              </view>
            </view>
            <view class="your">
              <view class="title">{{$t('mine.authentication.oneLever.uploadIdCard.your')}}</view>
              <view class="p">
                <c-upload :url="uploadUrl" @success="onSuccessSecond" iconName="camera" iconSize="90"></c-upload>
              </view>
            </view>
          </view>
          <view class="tip">
            {{$t('mine.authentication.oneLever.uploadIdCard.tip')}}
          </view>
        </view>
      </view>

      <button class="c-button mx-28 mt-60 mb-50" @tap="onTapConfirm">{{$t('mine.authentication.oneLever.uploadIdCard.confirm')}}</button>
    </page-layout>
  </view>
</template>

<script>
import CUpload from '../../../../components/common/CUpload'
import graceChecker from '../../../../utils/graceUI/jsTools/graceChecker'

import { serverURL } from '../../../../config/network'

export default {
  data () {
    return {
      pageTitle: 'mine.authentication.oneLever.uploadIdCard.title',
      uploadUrl: `${serverURL}/api/upload`,
      form: {
        front_pic: '',
        reverse_pic: ''
      }
    }
  },
  methods: {
    onSuccessFirst (e) {
      this.form.front_pic = e
    },
    onSuccessSecond (e) {
      this.form.reverse_pic = e
    },
    // 确定
    async confirm () {
      this.showFullLoading()
      try {
        await this.api.user.realName(this.form)
        this.toast('mine.authentication.oneLever.uploadIdCard.toast.success', 'none')
        setTimeout(() => {
          this.router.navigateBack(2)
        }, 2000)
      } catch (error) { }
      this.hideFullLoading()
    },
    // 点击确定
    onTapConfirm () {
      const rules = [
        {
          name: 'front_pic',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.oneLever.uploadIdCard.toast.front'
        },
        {
          name: 'reverse_pic',
          checkType: 'notnull',
          errorMsg: 'mine.authentication.oneLever.uploadIdCard.toast.reverse'
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
  onLoad (e) {
    this.form = Object.assign(e, this.form)
    console.log(e)
  },
  components: {
    CUpload
  }
}
</script>

<style lang="scss" scoped>
.uploadIdCard-page {
  .content {
    padding: 40rpx 48rpx 0 30rpx;
    .title {
      @extend .fs-xs, .c-tip2, .py-28;
    }
    .tip {
      @extend .fs-xs, .c-tip2;
      line-height: 44rpx;
      margin-top: 24rpx;
    }
    .photo {
      .reference {
        width: 320rpx;
        margin-right: 30rpx;
        .img {
          @extend .ta-center;
          image {
            width: 294rpx;
            height: 195rpx;
          }
          image.sm {
            width: 201rpx;
          }
        }
      }
      .your .p {
        width: 308rpx;
        height: 195rpx;
        background-color: #e9e9e9;
        border-radius: 10rpx;
      }
    }
  }
}
</style>