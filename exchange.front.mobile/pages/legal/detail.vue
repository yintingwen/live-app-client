<template>
  <view class="legal-order-detail">
    <page-layout>
      <view class="detail-body">
        <!-- 详情信息 -->
        <detail-info-pay
          v-if="isBuy && status === 0"
          :meta="detail"
          :auth="auth"
          @orderCancel="showPopup('cancel')"
          @orderConfirm="showPopup('pay')"
        />
        <detail-info
          v-if="(isBuy && status !== 0) || !isBuy"
          :meta="detail"
          :auth="auth"
          @orderSure="showPopup('sure')"
          @orderAppeal="showPopup('appeal')"
        />

        <!-- 其他信息 -->
        <block v-if="isBuy && status === 0">
          <!-- 用户视角显示，商铺信息 -->
          <view v-if="!isSeller" @tap="onTapSeller" class="seller">
            <view>{{detail.seller_name}}</view>
            <c-icon name="left" class="reverse" size="15"></c-icon>
          </view>
          <!-- 交易提示 -->
          <view class="mx-28 lh-1-5 mt-35">
            <view class="fs-xxxs">{{ $t('legal.detail.deal_tip.title') }}</view>
            <view class="fs-xxxs">{{ $t('legal.detail.deal_tip.first') }}</view>
            <view class="fs-xxxs">{{ $t('legal.detail.deal_tip.second') }}</view>
            <view class="fs-xxxs">{{ $t('legal.detail.deal_tip.thirdly') }}</view>
          </view>
        </block>

        <!---------------------------------- 确认框 ------------------------------------------>
        <!-- 取消订单 -->
        <c-confirm
          ref="cancel"
          @confirm="onConfirmPopup('cancel')"
          :title="$t('legal.detail.popup.cancel.title')"
        >{{ $t('legal.detail.popup.cancel.first') }}</c-confirm>

        <!-- 确认付款 -->
        <c-confirm ref="pay" @confirm="onConfirmPopup('pay')" :title=" $t('legal.detail.popup.pay.title') ">
          <view class="fs-xs mb-20">{{$t('legal.detail.popup.pay.first')}}</view>
          <view class="fs-xs c-primary">{{$t('legal.detail.popup.pay.second')}}</view>
        </c-confirm>

        <!-- 确认收款 -->
        <c-confirm
          ref="sure"
          @confirm="onConfirmPopup('sure')"
          :title="$t('legal.detail.popup.paid.title')"
        >{{$t('legal.detail.popup.paid.first')}}</c-confirm>

        <!-- 申诉 -->
        <c-confirm
          ref="appeal"
          @confirm="onConfirmPopup('appeal')"
          :title="$t('legal.detail.popup.appeal.title')"
        >{{ $t('legal.detail.popup.appeal.first') }}</c-confirm>
      </view>
    </page-layout>
  </view>
</template>

<script>
import DetailInfo from '../../components/legal/detail/DetailInfo'
import DetailInfoPay from '../../components/legal/detail/DetailInfoPay'

export default {
  data () {
    return {
      auth: '', // 用户类型
      id: 0, // 订单id
      detail: {} // 详情信息
    }
  },
  computed: {
    // 页面头内容
    pageTitle () {
      const str = ['pay', 'completed', 'canceled', 'paid']
      return `legal.detail.title.${str[this.detail.is_sure || 1]}`
    },
    // 订单类型, 是否是购买
    isBuy () {
      const flag = this.isSeller ? 'buy' : 'sell'
      return this.detail.type === flag
    },
    // 订单状态
    status () {
      return this.detail.is_sure
    },
    // 是否是商家
    isSeller () {
      return this.auth === 'seller'
    }
  },
  methods: {
    /**
     * 点击商家
     */
    onTapSeller () {
      this.router.navigateTo('/pages/mine/shop/detail/user', { id: this.detail.seller_id })
    },
    /**
     * 显示确认框
     */
    showPopup (name) {
      this.$refs[name].open()
    },
    /**
     * 确认框确认事件
     */
    async onConfirmPopup (name) {
      this.showFullLoading()
      try {
        if (name === 'cancel') {
          await this.cancelDeal()
        } else if (name === 'pay') {
          await this.confirmDeal()
        } else if (name === 'sure') {
          await this.sureDeal()
        } else if (name === 'appeal') {
          await this.appealDeal()
        }
      } catch (error) { }
      this.hideFullLoading()
    },


    /**
     * 获取订单详情
     */
    async getDealDetail () {
      this.showFullLoading()
      try {
        this.detail = await this.api.legal.orderDetail({ id: this.id })
        uni.setNavigationBarTitle({
          title: this.$t(`${this.pageTitle}`)
        })
      } catch (error) { }
      this.hideFullLoading()
    },
    /**
     * 取消订单
     */
    async cancelDeal () {
      await this.api.legal.cancelDeal({ id: this.id })
      this.getDealDetail()
    },
    /**
     * 确认付款
     */
    async confirmDeal () {
      await this.api.legal.confirmPay({ id: this.id })
      this.getDealDetail()
    },
    /**
     * 确认收款
     */
    async sureDeal () {
      const api = this.isSeller ? 'sellerSure' : 'userSure'
      await this.api.legal[api]({ id: this.id })
      this.getDealDetail()
    },
    /**
     * 订单申诉
     */
    async appealDeal () {
      const message = await this.api.legal.userAppeal({ id: this.id })
      this.toast('legal.detail.toast.appeal_success')
    }
  },
  onLoad (e) {
    this.id = e.id
    this.auth = e.auth
    this.getDealDetail()
  },
  components: {
    DetailInfo,
    DetailInfoPay
  }
}
</script>

<style lang="scss" scoped>
.legal-order-detail {
  .seller {
    @extend .mt-55, .mx-28, .bd-g1, .flex-between, .px-30, .py-25;
  }
}
</style>
