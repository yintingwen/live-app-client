<template>
  <!-- 交易--合约--合约持仓组件页面 -->
  <view class="contract-storage">
    <!-- 合约持仓页面--头部 storage-title -->
    <view class="storage-title">
      <view class="fs-xl fw mb-10">USDT: 111395.7760</view>
      <view class="fs-md">风险率: 12474.88%</view>
    </view>

    <!-- 合约持仓页面--内容数据 storage-content -->
    <storage-content :contractStorage="contractStorage" @onPopFlet="onPopFlet" @onPopOnceFlet="onPopOnceFlet"></storage-content>
  </view>
</template>

<script>
import storageContent from './StorageContent'

export default {
  created() {
    this.getStorContent()
  },
  data() {
    return {
      contractStorage: {}
    }
  },
  methods: {
    // 获取列表数据
    async getStorContent() {
      let storContent = ''
      try {
        storContent = await this.api.trade.lever.allDeal({
          legal_id: 3,
          currency_id: 6,
          page: 1,
          limit: 10
        })
      } catch (error) {
        console.log('错误')
      }
      this.contractStorage = storContent
    },
    // 点击平仓并且确定
    onPopFlet() {
      console.log('确定平仓')
    },
    // 点击一键平仓并且确定
    onPopOnceFlet(index) {
      switch (index) {
        case 0: {
          console.log('确定全部平仓')
          break
        }
        case 1: {
          console.log('确定只平多单')
          break
        }
        case 2: {
          console.log('确定只平空单')
          break
        }
      }
    }
  },
  components: {
    storageContent
  }
}
</script>

<style lang="scss" scoped>
.contract-storage {
  .storage-title {
    @extend .pb-30, .px-10, .bgc-view;
  }
}
</style>