<template>
  <view class="notice-detail-page">
    <page-layout>
      <view class="detail-container">
        <view class="ta-center mb-70">{{detail.title}}</view>
        <view v-html="detail.content"></view>
        <view class="fs-xs ta-right mt-65">{{detail.update_time}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'home.notice.detail.title',
      id: 0,
      detail: {}
    }
  },
  methods: {
    async getNoticeDetail() {
      this.detail = await this.api.news.detail({ id: this.id })
    }
  },
  async onLoad(e) {
    this.showFullLoading()
    try {
      this.id = e.id
      await this.getNoticeDetail()
    } catch (error) {}
    this.hideFullLoading()
  }
}
</script>

<style lang="scss" scoped>
.notice-detail-page {
  .detail-container {
    margin: 80rpx 30rpx 0 30rpx;
    padding: 75rpx 45rpx;
    box-shadow: 0 0 10rpx 1rpx rgba(0, 0, 0, 0.24);
    border-radius: 10rpx;
  }
}
</style>
