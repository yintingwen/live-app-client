<template>
  <view class="kline-page">
    <web-view :src="url" @message="onMessagWeb"></web-view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      symbolInfo: {},
      baseURL: '/hybrid/html/index.html'
    }
  },
  computed: {
    ...mapState(['lang']),
    symbol () {
      return `${this.symbolInfo.currency_name}/${this.symbolInfo.legal_name}`
    },
    query () {
      const queryObj = {
        ...this.symbolInfo,
        lang: this.lang,
        token: uni.getStorageSync('token'),
      }
      return Object.keys(queryObj).reduce((total, item) => {
        total += `${item}=${queryObj[item]}&`
        return total
      }, '?')
    },
    url () {
      return `${this.baseURL}${this.query}`
    }
  },
  methods: {
    onMessagWeb (message) {
      const { type } = message.detail.data[0]
      if (type !== 'history') {
        uni.setStorageSync('lever_type', type)
      }
    },
    saveSymbol () {
      uni.setStorageSync('lever', this.symbolInfo)
    }
  },
  onNavigationBarButtonTap () {
    this.router.switchTab('/pages/lever/check')
  },
  onLoad (e) {
    this.symbolInfo = uni.getStorageSync('lever')
    uni.setNavigationBarTitle({
      title: this.symbol
    })
  },
  onUnload () {
    this.saveSymbol()
  }
}  
</script>
<style lang="scss" scoped>
page,
.kline-page {
  height: 100%;
  width: 100%;
}

.kline-page {
  background: #171b2c;
}
</style>
