<template>
  <view class="authentication-page">
    <page-layout>
      <view class="lever">
        <navigator
          :url="item.link"
          class="item d-flex jc-between ai-center"
          v-for="(item, index) in leverList"
          :key="index"
        >
          <view class="left">
            <c-icon name="user" size="30" :style="{color: item.iconColor}"></c-icon>
            <text>{{item.title}}</text>
          </view>
          <view class="right">
            <text v-if="index === 0" :class="info.review_status === 2 ? 'c-warning' : ''">{{oneLeverStatus}}</text>
            <text v-else-if="index === 1" :class="info.is_pay === 1 ? 'c-warning' : ''">{{twoLeverStatus}}</text>
            <text v-else-if="index === 2">{{threeLeverStatus}}</text>
            <c-icon class="icon" name="left"></c-icon>
          </view>
        </navigator>
      </view>
    </page-layout>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      pageTitle: 'mine.authentication.title',
      status: [
        this.$t('mine.authentication.unverified'),
        this.$t('mine.authentication.isverify'),
        this.$t('mine.authentication.verified')
      ],
      leverList: [
        {
          iconColor: '#43B5F1',
          title: this.$t('mine.authentication.oneLever.title'),
          link: ''
        },
        {
          iconColor: '#184CC4',
          title: this.$t('mine.authentication.twoLever.title'),
          link: '/pages/mine/authentication/twoLever/index'
        },
        {
          iconColor: '#2400E8',
          title: this.$t('mine.authentication.threeLever.title'),
          link: '/pages/mine/authentication/threeLever/index'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['info']),
    oneLeverStatus() {
      if (this.info.review_status === 0) {
        return this.status[0]
      } else if (this.info.review_status === 1) {
        return this.status[1]
      } else {
        return this.status[2]
      }
    },
    twoLeverStatus() {
      if (this.info.is_pay === 0) {
        return this.status[0]
      } else {
        return this.status[2]
      }
    },
    threeLeverStatus() {
      return this.status[0]
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    
  },
  onShow() {
    this.getUserInfo()
    this.info.review_status === 2 ? this.leverList[0].link = '/pages/mine/authentication/oneLever/verified' : this.leverList[0].link = '/pages/mine/authentication/oneLever/index'
  }
}
</script>

<style lang="scss" scoped>
.authentication-page {
  padding: 0 28rpx;
  .lever {
    margin-top: 5rpx;
    .item {
      border-bottom: 2rpx solid #f3f3f3;
      padding: 38rpx 0 27rpx 0;
      .left {
        @extend .d-flex, .ai-center;
        text:last-child {
          margin-left: 28rpx;
        }
      }
      .right {
        @extend .d-flex, .ai-center, .c-tip2;
        .icon {
          margin-left: 43rpx;
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style> 