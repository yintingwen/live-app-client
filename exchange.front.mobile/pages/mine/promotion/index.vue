<template>
  <view class="promotion-page">
    <page-layout>
      <view class="ad_message">
        <view class="mb-45">{{$t('mine.myPromotion.adMessage1')}}</view>
        <view>{{$t('mine.myPromotion.adMessage2')}}</view>
      </view>
      <view class="content">
        <view class="wrap">
          <view class="head mb-60 fs-xl c-white">{{$t('mine.myPromotion.shareRegister')}}</view>
          <view class="qr_code">
            <view class="qrimg">
              <tki-qrcode
                ref="qrcode"
                :val="val"
                :size="210"
                :onval="true"
                :loadMake="true"
                :loadingText="$t('mine.myPromotion.generation')"
              />
            </view>
          </view>
          <view class="my-20 fs-xxxl c-black">{{$t('mine.myPromotion.promoCode')}}：{{promoCode}}</view>
          <button @tap="onTapSaveImg">{{$t('mine.myPromotion.saveImage')}}</button>
          <view class="mt-25 fs-xs c-tip1">{{$t('mine.myPromotion.tip')}}</view>
        </view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import tkiQrcode from 'tki-qrcode'
import { serverURL } from '../../../config/network'

export default {
  data () {
    return {
      pageTitle: 'mine.myPromotion.title',
      val: '', //二维码地址
      promoCode: '', //推广码
      host: '', //域名
      currentWebview: null  //当前webview对象
    }
  },
  methods: {
    // 获取推广码和域名
    async getPromoCode () {
      try {
        const msg = await this.api.user.promoCode()
        this.promoCode = msg.extension_code
        msg.share_url ? this.host = msg.share_url : this.host = 'http://mobile.zcccoin.com:82'
      } catch (error) { }
    },

    // 点击保存图片
    onTapSaveImg () {
      // var pages = getCurrentPages(); //获取当前页面栈的实例
      // var page = pages[pages.length - 1]; //最后一个元素为当前页面
      // console.log(pages);
      // var currentWebview = page.$getAppWebview(); //页面实例的方法，用于获取webview窗口对象
      var bitmap = null;
      bitmap = new plus.nativeObj.Bitmap('amway_img'); //创建原生图片对象

      // 将Webview窗口的可视区域截屏并绘制到Bitmap图片对象中
      this.currentWebview.draw(bitmap,  () => { //Webview截屏绘制方法
        console.log('截屏绘制图片成功');
        bitmap.save("_doc/a.jpg", {}, i => { //保存图片
          console.log('保存图片成功：' + JSON.stringify(i)); //打印保存后的图片信息
          uni.saveImageToPhotosAlbum({ //保存图片到系统相册
            filePath: i.target, //保存后的图片路径
            success: () => {
              bitmap.clear(); //销毁Bitmap图片
              this.toast('mine.myPromotion.saveSuccess')
            }
          });
        },
          function (e) {
            console.log('保存图片失败：' + JSON.stringify(e));
          });
      },
        function (e) {
          console.log('截屏绘制图片失败：' + JSON.stringify(e));
        });
      //currentWebview.append(amway_bit);
    }
  },
  async onLoad () {
    await this.getPromoCode()
    this.val = `${this.host}/#/pages/login/register?extension_code=${this.promoCode}`
    
    this.currentWebview = this.$mp.page.$getAppWebview();//获取当前页面 webview 的对象实例
  },
  components: {
    tkiQrcode
  }
}
</script>

<style lang="scss" scoped>
.promotion-page {
  // #ifdef H5
  min-height: calc(100vh - 88rpx);
  // #endif
  // #ifdef APP-PLUS
  min-height: 100vh;
  // #endif
  padding: 0 34rpx;
  background: #dde9f9 url('../../../static/image/mine/promotion.jpg') no-repeat center center/750rpx;
  background-position: 0 -88rpx;
  overflow-y: hidden;
  .ad_message{
    @extend .ta-center;
    position: absolute;
    left: 50%;
    top: 60rpx;
    transform: translateX(-50%);
    width: 100%;
    color: #fff;
    font-size: 72rpx;
    font-weight: bold;
    text-shadow: 0 12rpx 8rpx rgba(26, 19, 100, .6);
  }
  .content {
    @extend .ta-center;
    position: absolute;
    left: 50%;
    top: 580rpx;
    transform: translateX(-50%);
    width: 680rpx;
    height: 572rpx;
    border-radius: 30rpx;
    background-color: #fff;
    .wrap{
      position: relative;
      width: 500rpx;
      height: 500rpx;
      margin: 0 auto;
      padding-top: 60rpx;
      .head{
        position: absolute;
        left: 50%;
        top: -30rpx;
        transform: translateX(-50%);
        width: 400rpx;
        line-height: 60rpx;
        border-radius: 10rpx;
        background-color: #2e95fe;
      }
      .qr_code {
        width: 280rpx;
        height: 280rpx;
        margin: 0 auto;
        padding: 28rpx;
        background-color: #2e95fe;
        .qrimg {
          @extend .flex-center;
          padding: 6rpx 0 2rpx;
          background-color: #fff;
        }
      }
    }
    button {
      line-height: 76rpx;
      border-radius: 50rpx;
      background-image: linear-gradient(180deg, #52b5fb, #0d80d0);
      color: #fff;
      font-size: 30rpx;
      box-shadow: 0 8rpx 8rpx rgba(0, 0, 0, .5);
    }
  }
}
</style>