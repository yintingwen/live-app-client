export default {
  data () {
    return {
      pageTitle: 'mine.myShop.title',
      id: 0,
      limit: 999999999,
      shopData: {},
    }
  },
  computed: {
    shopDataForm () {
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
     * 获取商铺信息
     */
    async getShopData () {
      this.shopData = await this.api.user.shopInfo(this.shopDataForm)
    },
  },
  async onPullDownRefresh () {
    try {
      await this.getShopData()
    } catch (e) {

    } finally {
      uni.stopPullDownRefresh()
    }
  },
  onShow () {
    if (!this.loaded) return
    this.getShopData()
  }
}