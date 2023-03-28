<template>
  <view class="mine-page">
    <!-- 用户 -->
    <view class="user">
      <view v-if="isLogin">
        <view class="nickname">
          {{info.review_status ===2 ? info.name : $t('mine.unverified')}}
          <c-icon class="fs-lg ml-5" :class="info.review_status ===2 ? 'c-warning' : 'gray'" name="user"></c-icon>
        </view>
        <view class="mobile">{{info.account}}</view>
      </view>

      <navigator v-else url="/pages/login/index">{{ $t('mine.logAndReg') }}</navigator>
    </view>

    <view class="main">
      <!-- 主要功能 -->
      <view class="primary">
        <navigator url="/pages/mine/authentication/index">{{ $t('mine.authentication.name') }}</navigator>
        <navigator url="/pages/mine/securityCenter/index">{{ $t('mine.securityCenter.title') }}</navigator>
        <navigator url="/pages/mine/fundsTransfer/index">{{ $t('mine.fundsTransfer.title') }}</navigator>
      </view>

      <!-- 选项 -->
      <view class="options">
        <block v-for="(item, index) in options" :key="index">
          <navigator v-if="item.show" :url="item.link" class="option d-flex jc-between ai-center">
            <view class="d-flex ai-center">
              <c-icon :name="item.iconName" size="40" :style="{color: item.iconColor}"></c-icon>
              <text>{{$t(item.title)}}</text>
            </view>
            <c-icon class="icon" name="left"></c-icon>
          </navigator>
        </block>

        <view class="option d-flex jc-between ai-center">
          <view class="d-flex ai-center">
            <c-icon name="about" size="40" style="color: #285AFF"></c-icon>
            <text>{{ $t('mine.about.title') }}</text>
          </view>
          <text class="fs-xs c-tip">{{ $t('mine.about.currentVersion')+versions }}</text>
        </view>
      </view>

      <button v-if="isLogin" @tap="onTapLogout">{{$t('login.logout')}}</button>
      <button v-else @tap="onTapLogin">{{$t('login.index')}}</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      tabBar: true,
      versions: ' 9.9.1'
    }
  },
  computed: {
    ...mapState('user', ['info']),
    ...mapGetters('user', ['isLogin', 'isSeller']),
    options () {
      return [
        {
          iconName: 'asset',
          iconColor: '#E7A402',
          title: 'mine.myAsset.title',
          link: '/pages/mine/asset/index',
          show: true
        },
        {
          iconName: 'shop',
          iconColor: '#D91321',
          title: 'mine.myShop.title',
          link: '/pages/mine/shop/list',
          show: this.isSeller
        },
        {
          iconName: 'recharge',
          iconColor: '#5A57FF',
          title: 'mine.currencyManagement.title',
          link: '/pages/mine/management/index',
          show: true
        },
        {
          iconName: 'promotion',
          iconColor: '#59B05A',
          title: 'mine.myPromotion.title',
          link: '/pages/home/reward',
          show: true
        },
        {
          iconName: 'setting',
          iconColor: '#3B99F5',
          title: 'mine.system.title',
          link: '/pages/mine/system/index',
          show: true
        }
      ]
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    // 退出登录
    async onTapLogout () {
      try {
        await this.logout()
      } catch (error) { }
    },
    onTapLogin () {
      this.router.navigateTo('/pages/login/index')
    }
  },
}
</script>

<style lang="scss" scoped>
.mine-page {
  .user {
    @extend .fs-xxxxxl, .c-white;
    width: 100%;
    height: 250rpx;
    padding: 98rpx 29rpx 50rpx;
    background: url("../../static/image/bg/mine.png") no-repeat center center/cover;
    .nickname {
      margin-bottom: 43rpx;
    }
    .gray {
      color: #b7b7b7;
    }
  }
  .main {
    padding: 0 28rpx;
    .primary {
      @extend .d-flex, .jc-between;
      padding-top: 34rpx;
      navigator {
        width: 220rpx;
        height: 138rpx;
        line-height: 138rpx;
        text-indent: 20rpx;
        font-size: 28rpx;
        border-radius: 12rpx;
        box-shadow: 0 2rpx 8rpx rgba(17, 0, 143, 0.2);
      }
      :nth-child(1),
      :nth-child(2),
      :nth-child(3) {
        background: no-repeat center / contain;
      }
      :nth-child(1) {
        background-image: url(../../static/image/mine/primary_1.png);
      }
      :nth-child(2) {
        background-image: url(../../static/image/mine/primary_2.png);
      }
      :nth-child(3) {
        background-image: url(../../static/image/mine/primary_3.png);
      }
    }
    .options {
      margin-top: 35rpx;
      .option {
        padding: 24rpx 0;
        view text:last-child {
          @extend .fs-xl;
          margin-left: 27rpx;
        }
        .icon {
          transform: rotate(180deg);
        }
      }
    }
    button {
      @extend .bgc-primary, .c-white, .fs-xxl;
      line-height: 90rpx;
      margin-top: 103rpx;
    }
  }
}
</style>
