<template>
  <view class="legal-page">
    <page-layout>
      <view class="legal-header">
        <view class="d-flex jc-center">
          <view
            class="type"
            @tap="onTapType('sell')"
            :class="[ type === 'sell' ? 'bgc-up c-white': 'un-active' ]"
          >{{$t('legal.deal.buy')}}</view>
          <view
            class="type"
            @tap="onTapType('buy')"
            :class="[ type === 'buy' ? 'bgc-down c-white': 'un-active' ]"
          >{{$t('legal.deal.sell')}}</view>
        </view>
        <c-icon name="history" slot="right" size="17" class="c-active"></c-icon>
      </view>
      <view class="legal-body">
        <deal-currency @change="onChangeCurrency" :value="currencyIndex" :items="legalList"></deal-currency>
        <deal-list @tapButton="onTapDealButton" :type="type" :items="dealData"></deal-list>
      </view>
      <deal-do ref="dealDo" @cancel="onCancelDo" @confirm="onConfirmDo" :dealInfo="dealInfo"></deal-do>
    </page-layout>
  </view>
</template>

<script>
import DealCurrency from '../../components/legal/deal/DealCurrency'
import DealList from '../../components/legal/deal/DealList'
import DealDo from '../../components/legal/deal/DealDo'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tabBar: true,
      pageTitle: 'legal.title',
      type: 'sell',
			limit:99999999,
      currencyIndex: 0,
      dealData: [],
      dealInfo: {} // 交易详情
    }
  },
  computed: {
    ...mapGetters('currency', ['legalList']),
    dealForm () {
      return {
        type: this.type,
        currency_id: this.legalList.length && this.legalList[this.currencyIndex].id,
				limit: this.limit
      }
    }
  },
  methods: {
    /**
     * 点击分类
     */
    async onTapType (type) {
      this.type = type
      this.showFullLoading()
      try {
        await this.getDealData()
      } catch (error) { }
      this.hideFullLoading()
    },
    /**
     * 点击币种
     */
    async onChangeCurrency (e) {
      this.currencyIndex = e
      this.showFullLoading()
      try {
        await this.getDealData()
      } catch (error) { }
      this.hideFullLoading()
    },
    /**
     * 点击交易的按钮
     */
    async onTapDealButton (id) {
      this.showFullLoading()
      try {
        await this.getDealInfo(id)
        this.$refs.dealDo.open()
      } catch { }
      this.hideFullLoading()
    },
    /**
     * 点击取消下单
     */
    onCancelDo () {
      this.$refs.dealDo.close()
    },
    /**
     * 点击确定下单
     */
    onConfirmDo (form) {
      if (form) this.doDeal(form)
    },
    /**
     * 获取法币交易列表
     */
    async getDealData () {
      this.dealData = []
      const message = await this.api.legal.dealList(this.dealForm)
      this.dealData = message.data
    },
    /**
     * 获取交易详情
     */
    async getDealInfo (id) {
      this.dealInfo = await this.api.legal.dealInfo({ id })
    },
    /**
     * 下单并跳转
     */
    async doDeal (form) {
      this.showFullLoading()
      try {
        const { data } = await this.api.legal.doDeal(form)
        this.$refs.dealDo.close()
        this.router.navigateTo('/pages/legal/detail', { id: data.id, auth: 'user' })
      } catch { }
      this.hideFullLoading()
    }
  },
  /**
   * 点击导航栏按钮
   */
  onNavigationBarButtonTap (e) {
    const currency_id = this.legalList[this.currencyIndex].id
    this.router.navigateTo('/pages/legal/record/user', { currency_id })
  },
  async onLoad () {
    this.showFullLoading()
    try {
      await this.getDealData()
    } catch (error) { }
    this.hideFullLoading()
  },
  components: {
    DealCurrency,
    DealList,
    DealDo
  }
}
</script>

<style lang="scss" scoped>
.legal-page {
  .legal-header {
    margin-top: 40rpx;
    .type {
      @extend .ta-center;
      @include size(200, 64);
      line-height: 64rpx;

      &.un-active {
        background-color: #eee;
      }
    }
  }
}
</style>
