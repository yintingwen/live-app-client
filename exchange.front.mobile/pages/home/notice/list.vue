<template>
  <view class="notice-list-page">
    <page-layout>
      <view class="notice-list">
        <navigator
          :url="`/pages/home/notice/detail?id=${item.id}`"
          v-for="item in noticeData"
          :key="item.id"
          class="notice-item"
        >
          <view class="mb-25">
            {{item.title}}
            <c-icon name="bell" class="ml-25" color="#3296FA"></c-icon>
          </view>
          <view class="flex-between c-tip2 fs-xs">
            <text>{{item.update_time}}</text>
            <text>{{ $t('common.view_details') }} ></text>
          </view>
        </navigator>
      </view>
    </page-layout>
  </view>
</template>

<script>
export default {
  data () {
    return {
      pageTitle: 'home.notice.list.title',
      noticeData: []
    }
  },
  methods: {
    /**
     * 获取公告数据
     */
    async getNoticeData () {
      const params = { c_id: 4 }
      const message = await this.api.news.list(params)
      this.noticeData = message.list
    }
  },
  async onLoad () {
    this.showFullLoading()
    try {
      await this.getNoticeData()
    } catch (error) { }
    this.hideFullLoading()
  }
}
</script>

<style lang="scss" scoped>
.notice-list-page {
  .notice-list {
    .notice-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 30rpx;
      height: 139rpx;
      border-bottom: 1px solid #e7e7e7;
    }
  }
}
</style>
