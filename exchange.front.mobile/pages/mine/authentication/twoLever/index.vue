<template>
  <view class="twoLever-page">
    <page-layout>
      <view class="title">{{$t('mine.authentication.twoLever.receivingAccount')}}</view>
      <view class="content">
        <uni-swipe-action>
          <!-- 银行卡 -->
          <uni-swipe-action-item
            v-for="(item, index) in bankcardList"
            :key="item.value.cardnum"
            class="item"
            :options="options" 
            @change="onChange"
            @con="tapBankcard(item)"
            @click="onDel(item, index)" 
          >
            <view class="wrap" :class="{noradius: noradius}" @touchstart="onTouch"  @touchmove="onMove" :style="{backgroundColor: bgColors[0]}">
              <c-icon name="card" size="38"></c-icon>
              <view class="info">
                <text class="fs-sm">{{item.value.cardbank}}</text>
                <text class="fs-xxxs">{{$t('mine.authentication.twoLever.bankCard.depositCard')}}</text>
                <text class="fs-md">{{item.value.cardnum}}</text>
              </view>
            </view>
          </uni-swipe-action-item>

          <!-- 支付宝 -->
          <uni-swipe-action-item
            v-for="(item, index) in alipayList"
            :key="item.value.account"
            class="item"
            :options="options" 
            @change="onChange"
            @con="tapAlipay(item)"
            @click="onDel(item, index)" 
          >
            <view class="wrap" :class="{noradius: noradius}" @touchstart="onTouch" @touchmove="onMove" :style="{backgroundColor: bgColors[1]}">
              <c-icon name="alipay" size="48"></c-icon>
              <view class="info">
                <text class="fs-sm">{{$t('mine.authentication.twoLever.alipay.alipay')}}</text>
                <text class="fs-xxxs">{{item.value.name}}</text>
                <text class="fs-md">{{item.value.account}}</text>
              </view>
            </view>
          </uni-swipe-action-item>

          <!-- 微信 -->
          <uni-swipe-action-item
            v-for="(item, index) in wechatList"
            :key="item.value.account"
            class="item"
            :options="options" 
            @change="onChange"
            @con="tapWechat(item)"
            @click="onDel(item, index)" 
          >
            <view class="wrap" :class="{noradius: noradius}" @touchstart="onTouch" @touchmove="onMove" :style="{backgroundColor: bgColors[2]}">
              <c-icon name="wechat" size="48"></c-icon>
              <view class="info">
                <text class="fs-sm">{{$t('mine.authentication.twoLever.wechat.wechat')}}</text>
                <text class="fs-xxxs">{{item.value.name}}</text>
                <text class="fs-md">{{item.value.account}}</text>
              </view>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>

      <view v-if="noData" class="nodata">
        <image src="../../../../static/image/mine/no_account.png" mode="widthFix" style="width: 360rpx"></image>
        <view class="mt-50 fs-xs">{{$t('mine.authentication.twoLever.noData')}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import uniSwipeAction  from '../../../../components/common/uni-swipe-action/uni-swipe-action';
import uniSwipeActionItem  from '../../../../components/common/uni-swipe-action-item/uni-swipe-action-item';

export default {
  data() {
    return {
      pageTitle: 'mine.authentication.twoLever.title',
      bgColors: ['#E64D53','#34ABDF','#67CB31'],
      bankcardList: [],
      alipayList: [],
      wechatList: [],
      noData: false,
      noradius: false,
      options:[
        {
          text: this.$t('mine.authentication.twoLever.delete'),
          style: {
            backgroundColor: '#ff3a31'
          }
        }
      ]
    }
  },
  methods: {
    // 获取收款账户列表
    async getCashInfo() {
      this.showFullLoading()
      try {
        let message = await this.api.user.cashInfo()
        
        if(Array.isArray(message) && message.length > 0){
          console.log(Array.isArray(message));
          this.noData = false

          let bArr = []
          let aArr = []
          let wArr = []
          message.forEach(item => {
            item.value = JSON.parse(item.value)
            
            if(item.bank === 'bank'){
              bArr.push(item)
            }else if(item.bank === 'alipay'){
              aArr.push(item)
            }else{
              wArr.push(item)
            }
            this.bankcardList = bArr
            this.alipayList = aArr
            this.wechatList = wArr
          })
        }else{
          this.noData = true
        }
      } catch (error) {
        this.noData = true
      }
      this.hideFullLoading()
    },
    // 点击银行卡
    tapBankcard(item){
      this.router.navigateTo('/pages/mine/authentication/twoLever/addBankCard',{
        id: item.id,
        value: JSON.stringify(item.value)//uniapp不能传对象故转成字符串
      })
    },
    // 点击支付宝
    tapAlipay(item){
      this.router.navigateTo('/pages/mine/authentication/twoLever/addAlipay',{
        id: item.id,
        value: JSON.stringify(item.value)
      })
    },
    // 点击微信
    tapWechat(item){
      this.router.navigateTo('/pages/mine/authentication/twoLever/addWeChat',{
        id: item.id,
        value: JSON.stringify(item.value)
      })
    },

    //触摸开始
    onTouch(){
      console.log('touch');
      this.noradius = true
    },
    //滑动
    onMove(){
      console.log('move');
      this.noradius = true
    },
    //组件开关状态改变
    onChange(e){
      console.log(e);
      this.noradius = e
    },
    
    // 点击删除账户
    async onDel(item, index){
      if(item.bank === 'bank'){
        this.bankcardList.splice(index, 1)
      }else if(item.bank === 'alipay'){
        this.alipayList.splice(index, 1)
      }else{
        this.wechatList.splice(index, 1)
      }
      try {
        const msg = await this.api.user.delCash({id: item.id})
        this.getCashInfo()
      } catch (error) {}
    }
  },

  onShow() {
    this.getCashInfo()
  },
  onNavigationBarButtonTap() {
    uni.navigateTo({
      url: '/pages/mine/authentication/twoLever/addReceivingAccount'
    })
  },
  components: {
      uniSwipeAction,
      uniSwipeActionItem
  }
}
</script>

<style lang="scss" scoped>
.twoLever-page {
  @extend .px-28, .pt-40;
  .content {
    @extend .mt-28;
    .item {
      .wrap{
        display: flex;
        width: 100%;
        height: 148rpx;
        padding: 25rpx;
        border-radius: 10rpx;
        color: #fff;
      }
      .noradius{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .info {
        @extend .d-flex, .jc-between, .fd-column;
        margin-left: 33rpx;
      }
    }
  }
}
</style>