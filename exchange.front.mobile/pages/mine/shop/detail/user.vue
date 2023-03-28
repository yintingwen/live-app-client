<template>
  <view class="shop-detail-page">
    <page-layout>
      <!-- 商铺信息 -->
      <shop-info :info="shopData"></shop-info>
      <shop-auth :info="shopData"></shop-auth>
      <shop-deal
        :title="$t('mine.myShop.detail.online_sale')"
        :deals="sellList"
        :button="$t('common.buy')"
        @tapDeal="onTapDeal"
      ></shop-deal>
      <shop-deal
        :title="$t('mine.myShop.detail.online_buying')"
        :deals="buyList"
        :button="$t('common.sell')"
        @tapDeal="onTapDeal"
      ></shop-deal>
    </page-layout>
    <deal-do ref="dealDo" @cancel="onCancelDo" @confirm="onConfirmDo" :dealInfo="dealInfo"></deal-do>
  </view>
</template>

<script>
import ShopInfo from '../../../../components/mine/shop/ShopInfo'
import ShopAuth from '../../../../components/mine/shop/ShopAuth'
import ShopDeal from '../../../../components/mine/shop/ShopDeal'
import DealDo from '../../../../components/legal/deal/DealDo'

export default {
  data () {
    return {
      pageTitle: 'mine.myShop.title',
      id: 0,
      limit: 999999999,
      shopData: {}, // 商铺信息
      dealInfo: {} // 交易详情
    }
  },
  computed: {
    form () {
      return {
        id: this.id,
        limit: this.limit
      }
    },
    /**
     * 订单数据
     */
    dealData () {
      if (!Object.keys(this.shopData).length) return []
      return this.shopData.lists.data
    },
    /**
     * 出售订单
     */
    sellList () {
      return this.dealData.filter(item => item.type === 'sell')
    },
    /**
     * 求购订单
     */
    buyList () {
      return this.dealData.filter(item => item.type === 'buy')
    }
  },
  methods: {
    /**
     * 点击单笔交易
     */
    async onTapDeal (id) {
      this.showFullLoading()
      try {
        await this.getDealInfo(id)
        this.$refs.dealDo.open()
      } catch (error) { }
      this.hideFullLoading()
    },
    /**
     * 点击取消或超时
     */
    onCancelDo () {
      this.$refs.dealDo.close()
    },
    /**
     * 点击确定下单
     */
    async onConfirmDo (form) {
      this.showFullLoading()
      try {
        const { data } = await this.api.legal.doDeal(form)
        this.$refs.dealDo.close()
        this.router.navigateTo('/pages/legal/detail', { id: data.id, auth: 'user' })
      } catch { }
      this.hideFullLoading()
    },

    /**
     * 获取商铺信息
     */
    async getShopData () {
      this.shopData = await this.api.user.shopInfo(this.form)
    },
    /**
     * 获取交易详情
     */
    async getDealInfo (id) {
      this.dealInfo = await this.api.legal.dealInfo({ id })
    }
  },
  async onLoad (e) {
    this.id = e.id
    this.showFullLoading()
    try {
      await this.getShopData()
    } catch (error) { }
    this.hideFullLoading()
  },
  components: {
    ShopInfo,
    ShopAuth,
    ShopDeal,
    DealDo
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
