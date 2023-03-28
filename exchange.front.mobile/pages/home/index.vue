<template>
  <view class="home-page">
    <page-layout customHeader>
      <home-header class="bgc-white"></home-header>
      <home-swiper class="bgc-white" :banner="bannerData"></home-swiper>
      <!-- 公告 -->
      <home-notice class="bgc-white" :msgs="noticeData" />
      <view class="home-center-container pb-20">
        <!-- 资产 -->
        <home-asset :assetData="assetData" />
        <!-- 帮助、充提币 -->
        <home-help />
        <!-- 邀请图 -->
        <navigator url="/pages/home/reward" class="home-banner mt-20 mx-28">
          <text class="f-1 ta-center">{{ $t('home.banner.left') }}</text>
          <text class="f-1 ta-center">{{ $t('home.banner.right') }}</text>
        </navigator>
      </view>
      <home-market class="bgc-white" :marketData="marketData" @tapItem="onTapMarket"></home-market>
      <home-information class="mt-15 bgc-white" :list="latestNews"></home-information>
    </page-layout>
  </view>
</template>

<script>
import HomeHeader from '../../components/home/HomeHeader'
import HomeSwiper from '../../components/home/HomeSwiper'
import HomeAsset from '../../components/home/HomeAsset'
import HomeNotice from '../../components/home/HomeNotice'
import HomeHelp from '../../components/home/HomeHelp'
import HomeMarket from '../../components/home/HomeMarket'
import HomeInformation from '../../components/home/HomeInformation'

import marketMixin from '../../mixins/market'

import { mapGetters } from 'vuex'

export default {
  mixins: [marketMixin],
  data () {
    return {
      tabBar: true,
      noticeData: [],
      assetData: {},
      marketData: [],
      bannerData: [],
      latestNews: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin'])
  },
  methods: {
    onTapMarket (e) {
      uni.setStorageSync('lever', e)
      this.router.navigateTo('/pages/home/kline')
    },
    /**
     * 获取公告数据
     */
    async getNoticeData () {
      const params = { c_id: 4 }
      const message = await this.api.news.list(params)
      this.noticeData = message.list
    },
    /**
     * 获取用户资产
     */
    async getUserAsset () {
      this.assetData = await this.api.wallet.info()
    },
    /**
     * 获取轮播数据
     */
    async getBannerData () {
      const res = await this.api.common.getHomeInfo()
      this.bannerData = res.images_data.find(item => item.category === 'moblie_banner').advertise_list
    },
    async getLatestNews () {
      this.latestNews = await this.api.news.latestNews()

    }
  },
  onLoad () {
    this.getNoticeData()
    this.getBannerData()
    this.getLatestNews()
    this.getLatestNews()
  },
  onShow () {
    if (this.isLogin) {
      this.getUserAsset()
    }
    this.subMarket()
  },
  onHide () {
    this.unSubMarket()
  },
  async onPullDownRefresh () {
    try {
      if (this.isLogin) {
        await this.getUserAsset()
      }
    } catch (error) {

    } finally {
      uni.stopPullDownRefresh()
    }
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeAsset,
    HomeNotice,
    HomeHelp,
    HomeMarket,
    HomeInformation
  }
}
</script>
<style lang='scss' scoped>
.home-page {
  background-color: #f2f3f5;
}

.home-banner {
  display: flex;
  align-items: center;
  height: 113rpx;
  border-radius: 10rpx;
  overflow: hidden;
  color: white;
  font-size: 30rpx;
  background: url("/static/image/home/banner.png") center center / contain;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 346.5rpx;
    top: 15rpx;
    width: 1rpx;
    height: 84rpx;
    background-color: #fff;
  }
}
</style>