<template>
  <view class="help-currency">
    <!-- 充提币 -->
    <block v-if="type === 'currency'">
      <help-step :options="cb"></help-step>
      <help-step :options="tb"></help-step>
    </block>
    <!-- 实名认证 -->
    <block v-if="type === 'realName'">
      <help-step :options="realName"></help-step>
    </block>
    <!-- 开户 -->
    <block v-if="type === 'account'">
      <help-step :options="account"></help-step>
    </block>
    <!-- 安全 -->
    <block v-if="type === 'safety'">
      <help-step :options="safety"></help-step>
    </block>

    <!-- 收款 -->
    <block v-if="type === 'pay'">
      <help-step :options="pay"></help-step>
    </block>
    <!-- 法币 -->
    <block v-if="type === 'legal'">
      <help-step :options="legal"></help-step>
    </block>
    <!-- 合约 -->
    <block v-if="type === 'lever'">
      <help-step :options="lever"></help-step>
    </block>
  </view>
</template>

<script>
import HelpStep from '../../../components/home/help/HelpStep'

export default {
  data () {
    return {
      cb: {
        title: 'home.help.detail.cb.title',
        steps: [
          {
            description: [
              'home.help.detail.cb.first'
            ],
            img: [
              '/static/image/help/help@cb.png'
            ]
          },
          {
            description: [
              'home.help.detail.cb.second'
            ]
          }
        ]
      },
      tb: {
        title: 'home.help.detail.tb.title',
        steps: [
          {
            description: [
              'home.help.detail.tb.first'
            ],
            img: [
              '/static/image/help/help@tb.png'
            ]
          },
          {
            description: [
              'home.help.detail.tb.second'
            ]
          }
        ]
      },
      realName: {
        title: 'home.help.detail.real_name.title',
        steps: [
          {
            description: [
              'home.help.detail.real_name.first.one',
              'home.help.detail.real_name.first.two'
            ],
            img: [
              '/static/image/help/help@relaName1.png'
            ]
          },
          {
            description: [
              'home.help.detail.real_name.second'
            ],
            img: [
              '/static/image/help/help@realName2.png'
            ]
          },
          {
            description: [
              'home.help.detail.real_name.thirdly'
            ]
          }
        ]
      },
      account: {
        title: 'home.help.account',
        steps: [
          {
            description: [
              'home.help.detail.account.first'
            ],
            img: [
              '/static/image/help/help@register.png'
            ]
          },
          {
            description: [
              'home.help.detail.account.second'
            ],
            img: [
              '/static/image/help/help@mine.png'
            ]
          }
        ]
      },
      safety: {
        title: 'home.help.detail.safety.title',
        steps: [
          {
            description: [
              'home.help.detail.safety.first.one',
              'home.help.detail.safety.first.two'
            ],
            img: [
              '/static/image/help/help@safety.png'
            ]
          },
          {
            description: [
              'home.help.detail.safety.second'
            ]
          }
        ]
      },
      pay: {
        title: 'home.help.detail.pay.title',
        steps: [
          {
            description: [
              'home.help.detail.pay.first'
            ],
            img: [
              '/static/image/help/help@level.png',
              '/static/image/help/help@secondLevel.png'
            ]
          },
          {
            description: [
              'home.help.detail.pay.second.one',
              'home.help.detail.pay.second.two'
            ],
            img: [
              '/static/image/help/help@addPay.png'
            ]
          },
          {
            description: [
              'home.help.detail.pay.thirdly'
            ]
          }
        ]
      },
      legal: {
        title: 'home.help.legal',
        steps: [
          {
            detail: [
              'home.help.detail.legal.one',
              'home.help.detail.legal.two',
              'home.help.detail.legal.three'
            ]
          }
        ]
      },
      lever: {
        title: 'home.help.lever',
        steps: [
          {
            detail: [
              'home.help.detail.lever.one',
              'home.help.detail.lever.two',
            ]
          }
        ]
      },
      pageTitle: 'home.asset.help'
    };
  },
  onLoad (e) {
    this.type = e.type
  },
  components: {
    HelpStep
  }
}
</script>

<style lang="scss">
.help-currency {
  padding-top: 15rpx;
}
</style>
