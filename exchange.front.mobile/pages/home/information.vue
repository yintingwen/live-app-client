<template>
  <view class="information-page">
    <view class="header">
      <view>{{detailData.title}}</view>
      <view>{{detailData.update_time}}</view>
    </view>
    <view class="content">
      <view v-html="detailData.content"></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      pageTitle: 'information.title',
      id: '',
      detailData: {}
    }
  },
  methods: {
    async getDetail () {
      const { id } = this
      this.detailData = await this.api.news.latestNewsDetail({ id })
    }
  },
  async onLoad (e) {
    const { id } = e
    this.id = id
    this.showFullLoading()
    try {
      await this.getDetail()
    } catch (error) {
      this.toast(error.message || error)
    } finally {
      this.hideFullLoading()
    }
  }
}
</script>

<style lang="scss">
.information-page {
  padding: 0 28rpx;

  .header {
    padding-top: 51rpx;

    > view:first-child {
      font-weight: 700;
    }

    > view:last-child {
      font-size: 28rpx;
      margin: 18rpx 0 66rpx;
      color: #999;
    }
  }

  .content {
    font-size: 30rpx;
  }
}
</style>
