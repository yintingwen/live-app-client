<template>
  <view class="shop-detail-page">
    <page-layout>
      <!-- 商铺信息 -->
      <shop-info :info="shopData" send @send="onSendLegal"></shop-info>
      <shop-auth :info="shopData"></shop-auth>
      <shop-deal
        :title="$t('mine.myShop.detail.sell')"
        :deals="sellList"
        :button="$t('common.view_details')"
        @tapDeal="onTapDeal"
      ></shop-deal>
      <shop-deal
        :title="$t('mine.myShop.detail.buy')"
        :deals="buyList"
        :button="$t('common.view_details')"
        @tapDeal="onTapDeal"
      ></shop-deal>
    </page-layout>
    <uni-popup ref="send" type="bottom">
      <shop-legal-send :info="shopData" @send="onSendConfirm"></shop-legal-send>
    </uni-popup>
  </view>
</template>

<script>
import ShopInfo from '../../../../components/mine/shop/ShopInfo'
import ShopAuth from '../../../../components/mine/shop/ShopAuth'
import ShopDeal from '../../../../components/mine/shop/ShopDeal'
import ShopLegalSend from '../../../../components/mine/shop/ShopLegalSend'
import UniPopup from '../../../../components/common/uni-popup'

import shopDetailMixin from './shopDetailMixin'

export default {
  mixins: [shopDetailMixin],
  data () {
    return {}
  },
  methods: {
    /**
     * 点击发布
     */
    onSendLegal () {
      this.$refs.send.open()
    },
    /**
     * 点击单笔交易
     */
    onTapDeal (id) {
      this.router.navigateTo('/pages/legal/record/seller', { id })
    },
    /**
     * 确定发布
     */
    async onSendConfirm (form) {
      this.showFullLoading()
      try {
        const message = await this.api.legal.send(form)
        this.toast(message, 'success')
        this.$refs.send.close()
      } catch (e) { }
      this.hideFullLoading()
    },
  },
  async onLoad (e) {
    this.id = e.id
    this.showFullLoading()
    try {
      await this.getShopData()
    } catch (error) {

    } finally {
      this.hideFullLoading()
      this.loaded = true
    }
  },
  components: {
    ShopInfo,
    ShopAuth,
    ShopDeal,
    ShopLegalSend,
    UniPopup
  }
}
</script>

<style lang="scss" scoped>
.shop-detail-page {
  .shop-info {
    padding: 30rpx 35rpx;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
