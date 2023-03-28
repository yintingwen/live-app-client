<template>
  <view class="record-page">
    <page-layout>
      <graceNavBar
        :items="navItems"
        textAlign="center"
        activeDirection="center"
        :currentIndex="navIndex"
        activeColor="#4F5CD1"
        activeLineBg="#4F5CD1"
        activeLineWidth="100rpx"
        activeLineHeight="2rpx"
        fontSize="32rpx"
        @change="navChange"
      ></graceNavBar>

      <view class="content">
        <view class="item" v-for="(item, index) in records" :key="index">
          <view class="d-flex ai-center">
            <c-icon type="img" :name="item.currency_name" :imgPath="item.currency_name" size="35" imgHeight="35"></c-icon>
            <text class="ml-20">{{item.currency_name}}</text>
          </view>
          <view class="fs-xs">{{item[`${create}_time`]}}</view>
          <view class="ta-right">{{toFixed(item[`${num}`], 2)}}</view>
          {{item.num}}
        </view>
      </view>
      <view v-if="noData" class="nodata">
        <c-icon name="nodata" size="180"></c-icon>
        <view class="mt-50 fs-md">{{$t('mine.currencyManagement.record.noData')}}</view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

import graceNavBar from '../../../utils/graceUI/components/graceNavBar.vue'

export default {
  data() {
    return {
      pageTitle: 'mine.currencyManagement.record.title',
      navItems: [this.$t('mine.currencyManagement.record.chargeCoin'), this.$t('mine.currencyManagement.record.mentionCoin')],
      navIndex: 0,
      chargeRecords: [],
      mentionRecords: [],
      noData: false
    }
  },
  computed: {
    ...mapGetters('currency', ['logoObject']),
    records() {
      return this.navIndex === 0 ? this.chargeRecords : this.mentionRecords
    },
    create() {
      return this.navIndex === 0 ? 'created' : 'create'
    },
    num() {
      return this.navIndex === 0 ? 'value' : 'number'
    }
  },
  methods: {
    //获取充币记录
    async getChargeRecode() {
      console.log(1);

      this.showFullLoading()
      try {
        let message = await this.api.wallet.chargeRecord()
        if (message.length > 0) {

          this.chargeRecords = message
          this.noData = false
        }else{
          this.noData = true
        }
      } catch (error) {
        this.noData = true
      }
      this.hideFullLoading()
    },
    //获取提币记录
    async getMentionRecode() {
      console.log(2);

      this.showFullLoading()
      try {
        const message = await this.api.wallet.mentionRecord()
        if (message.length > 0) {
          this.mentionRecords = message
          this.noData = false
        }else{
          this.noData = true
        }
      } catch (error) {
        this.noData = true
      }
      this.hideFullLoading()
    },
    navChange(index) {
      this.navIndex = index
      this.navIndex === 0 ? this.getChargeRecode() : this.getMentionRecode()
    }
  },
  onLoad(e) {
    e.title === '充币' ? this.navIndex = 0 : this.navIndex = 1
    this.navIndex === 0 ? this.getChargeRecode() : this.getMentionRecode()
  },
  components: {
    graceNavBar
  }
}
</script>

<style lang="scss" scoped>
.record-page {
  /deep/ .uni-scroll-view{
    .uni-scroll-view{
      .uni-scroll-view-content {
        @extend .flex-around;
      } 
    }
  }
  .content {
    margin-top: 30rpx;
    .item {
      @extend .flex-between, .bb-g0;
      padding: 35rpx 28rpx;
      > view {
        flex: 1;
      }
    }
  }
}
</style>