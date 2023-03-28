<template>
  <view class="reward-page">
    <!-- 导航栏 -->
    <page-header :title="$t('home.reward.title')" color="#fff">
      <view slot="right" class="fs-lg pr-20">{{ $t('home.reward.rule') }}</view>
    </page-header>
    <!-- 奖励明细 -->
    <view class="reward-page-content">
      <view class="reward-detail">
        <view class="reward-card">
          <!-- 标题 -->
          <view class="detail-title fw">{{ $t('home.reward.detail') }}</view>
          <!-- 信息 -->
          <view class="detail-info">
            <view>
              <view>{{ $t('home.reward.person') }}</view>
              <view>{{ count }}</view>
            </view>
            <view>
              <view>{{ $t('home.reward.earn_rewards') }}</view>
              <view>0.0000</view>
            </view>
            <view>
              <view>{{ $t('home.reward.reward_ratio') }}</view>
              <view>0%</view>
            </view>
          </view>
          <!-- 链接二维码 -->
          <view class="invite-link fs-xs">
            <view @click.stop="onClickQrcode">
              <view class="code">{{ $t('home.reward.code') }}：{{extensionCode}}</view>
              <view class="qrcode d-flex ai-center jc-end">
                {{ $t('home.reward.qr_code') }}
                <c-icon name="qrcode" size="28" class="mx-10"></c-icon>
                {{ $t('home.reward.click_look') }}
              </view>
            </view>
            <view>
              <view class="label">{{ $t('home.reward.link') }}：</view>
              <view class="url">{{extensionLink}}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 奖励记录 -->
      <view class="reward-history">
        <view class="reward-card">
          <!-- 选择 -->
          <view class="history-selector fw">
            <view
              @click.stop="onClickHistory(0)"
              class="invite"
              :class="[historyType ? 'bg-inactive' : 'bg-active']"
            >{{$t('home.reward.invite_history')}}</view>
            <view
              @click.stop="onClickHistory(1)"
              class="reward"
              :class="[historyType ? 'bg-active' : 'bg-inactive']"
            >{{$t('home.reward.reward_history')}}</view>
          </view>
          <scroll-view class="history-list" scroll-y>
            <component class :list="inviteListData" :is="currencyList"></component>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import RewardInviteList from '../../components/home/reward/RewardInviteList'

export default {
  data () {
    return {
      historyType: 0,
      inviteData: {},
      inviteListData: [],
      count: 0
    };
  },
  computed: {
    extensionCode () {
      return this.inviteData.extension_code
    },
    extensionLink () {
      const defaultUrl = 'http://mobile.zcccoin.com:82'
      const path = '/#/pages/login/register'
      return `${this.inviteData.share_url || defaultUrl}${path}?extension_code=${this.extensionCode}`
    },
    currencyList () {
      return this.historyType ? '' : 'RewardInviteList'
    }
  },
  methods: {
    async getInviteCode () {
      this.inviteData = await this.api.user.promoCode()
    },
    async getInviteList () {
      const { count, list } = await this.api.user.inviteList()
      this.inviteListData = list
      this.count = count
    },
    onClickQrcode () {
      this.router.navigateTo('/pages/mine/promotion/index')
    },
    onClickHistory (index) {
      this.historyType = index
    }
  },
  async onLoad () {
    this.getInviteCode()
    this.getInviteList()
  },
  components: {
    RewardInviteList
  }
}
</script>

<style lang="scss">
.reward-page {
  height: 100vh;
  background: url("/static/image/bg/reward.png") center -50rpx/100% auto no-repeat, #3071ff;

  .reward-page-content {
    height: calc(100vh - 88rpx - var(--status-bar-height));

    .reward-card {
      background-color: #f6fbff;
      border-radius: 20rpx;
      width: 100%;
      position: relative;
    }

    .reward-detail {
      padding: 300rpx 28rpx 100rpx;

      > .reward-card {
        height: 388rpx;
        padding: 66rpx 0 46rpx;
      }

      .detail-title {
        background: url("/static/image/reward/card@detail.png") center/auto 100% no-repeat;
        width: 100%;
        height: 66rpx;
        text-align: center;
        line-height: 66rpx;
        font-size: 30rpx;
        color: #fff;
        position: absolute;
        top: -34rpx;
      }

      .detail-info {
        height: 78rpx;
        width: 600rpx;
        background-color: #fff;
        border-radius: 10rpx;
        margin: 0 auto 31rpx;
        display: flex;
        font-size: 24rpx;
        text-align: center;

        > view {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &:nth-child(2) {
            border-left: 1rpx #dcdcdc solid;
            border-right: 1rpx #dcdcdc solid;
          }

          > view:first-child {
            margin-bottom: 10rpx;
          }
        }
      }

      .invite-link {
        background-color: #fff;
        width: 600rpx;
        min-height: 167rpx;
        margin: 0 auto;
        border-radius: 10rpx;

        > view {
          width: 100%;
          padding-left: 18rpx;
          padding-right: 18rpx;

          &:first-child {
            height: 78rpx;
            line-height: 78rpx;
            border-bottom: 1px solid #dcdcdc;
            display: flex;

            > view {
              width: 50%;
              height: 100%;
            }
          }

          &:last-child {
            min-height: 89rpx;
            padding-top: 20rpx;
            padding-bottom: 20rpx;
            display: flex;

            .url {
              word-break: break-all;
              flex: 1;
            }

            > view {
              // flex: 1;
              display: inline-block;
            }
          }
        }
      }
    }

    .reward-history {
      padding: 0 28rpx 28rpx;
      height: calc(100% - 788rpx);

      .reward-card {
        height: 100%;
      }

      .history-selector {
        height: 66rpx;
        width: 100%;
        line-height: 66rpx;
        display: flex;
        position: absolute;
        top: -34rpx;
        z-index: 999;

        > view {
          height: 100%;
          flex: 1;
          text-align: center;
          color: #fff;
        }

        .bg-active {
          background: url("/static/image/reward/card@active.png") center/auto 100% no-repeat;
        }

        .bg-inactive {
          background: url("/static/image/reward/card@inactive.png") center/auto 100% no-repeat;
        }
      }

      .history-list {
        padding-top: 55rpx;
        height: calc(100% - 55rpx);
      }
    }
  }
}
</style>
