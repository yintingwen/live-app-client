<template>
  <view class="reward-invite-list ta-center">
    <view class="title d-flex mb-40 fs-sm fw">
      <view class="f-1">{{ $t('home.reward.time') }}</view>
      <view class="f-1">{{ $t('home.reward.rebate_member') }}</view>
      <view class="f-1">{{ $t('home.reward.status') }}</view>
    </view>
    <view class="list">
      <view class="item d-flex pb-50 fs-sm" v-for="item in list" :key="item.id">
        <view class="f-1">{{item.create_date.split(' ')[0]}}</view>
        <view class="f-1">{{item.account}}</view>
        <view class="f-1">{{ $t(statusStr[item.status]) }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      statusStr: ['home.reward.normal', 'home.reward.freeze']
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reward-invite-list {
  box-sizing: border-box;
  overflow: hidden;
}
</style>