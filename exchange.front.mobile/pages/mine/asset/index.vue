<template>
  <view class="myAsset-page">
    <page-layout>
      <view>
        <!-- 账户分类 -->
        <view class="c-white bgc-primary px-28 pt-20 pb-55">
          <graceNavBar
            :items="accountList"
            :currentIndex="currentIndex"
            :size="124"
            lineHeight="40rpx"
            :margin="58"
            textAlign="center"
            activeDirection="center"
            color="#9DA5F5"
            activeColor="#fff"
            activeLineBg="#fff"
            activeLineWidth="124rpx"
            activeLineHeight="2rpx"
            fontSize="32rpx"
            @change="navChange"
          ></graceNavBar>

          <view class="total">
            <view class="mt-50 mb-25 fs-xl">{{$t('mine.myAsset.total')}}（USDT）</view>
            <span class="fs-xxl mr-10">{{Number(total).toFixed(2)}}</span>
            <span class="fs-md">≈ {{(total * cnyPrice).toFixed(2)}} CNY</span>
          </view>
        </view>

        <view class="content">

          <!-- 搜索 -->
          <view class="search">
            <c-icon class="c-text" name="search" size="29" @tap="onTapSearch"></c-icon>
            <input
              class="input"
              placeholder-style="color: #333"
              :placeholder="$t('mine.myAsset.search')"
              v-model.trim="currency"
              @confirm="onTapSearch"
            />
          </view>

          <!-- 币种列表 -->
          <view v-if="isData" class="list">
            <scroll-view scroll-y="true" style="height: 656rpx">
              <view
                class="item"
                v-for="item in (isShowResult ? filterList : currentList)"
                :key="item.currency"
                @tap="onTapCurrency(item)"
              >
                <view class="flex-between c-tip2 fs-md">
                  <view class="mt-20 mb-35 c-primary fs-xl fw">{{item.currency_name}}</view>
                  <text>{{$t('mine.myAsset.detail')}} ></text>
                </view>
                <view class="info">
                  <view>
                    <view>{{$t('mine.myAsset.usable')}}</view>
                    <view>{{toFixed(item[`${accountType}_balance`], 2)}}</view>
                  </view>
                  <view>
                    <view>{{$t('mine.myAsset.freeze')}}</view>
                    <view>{{toFixed(item[`lock_${accountType}_balance`], 2)}}</view>
                  </view>
                  <view class="ta-right">
                    <view>{{$t('mine.myAsset.equivalent')}}(USDT)</view>
                    <view>{{toFixed(Number(item[`${accountType}_balance`])*Number(item.usdt_price), 2)}}</view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view v-else class="nodata">
            <c-icon name="nodata" size="180" color="#787878"></c-icon>
            <view class="mt-5">{{$t('mine.myAsset.noData')}}</view>
          </view>
        </view>
      </view>
    </page-layout>
  </view>
</template>

<script>
import {mapGetters} from 'vuex'
import graceNavBar from '../../../utils/graceUI/components/graceNavBar.vue'

export default {
  data() {
    return {
      pageTitle: 'mine.myAsset.title',
      // 账户列表
      accountList: [this.$t('mine.fundsTransfer.coins'),this.$t('mine.fundsTransfer.fund'),this.$t('mine.fundsTransfer.contract')],
      currentIndex: 0, //当前下标
      currency: '', //币种名

      changeTotal: '0.00', //合约账户信息
      legalTotal: '0.00', //资金账户信息
      leverTotal: '0.00', //合约账户信息
      changeList: [], //合约账户信息
      legalList: [], //资金账户信息
      leverList: [], //合约账户信息

      isShowResult: false, //搜索结果
      isData: true
    }
  },
  computed: {
    ...mapGetters('currency', ['symbolDigitData', 'cnyPrice']),

    // 总资产
    total() {
      let total = '0.00'
      if(this.currentIndex === 0){
        total = this.changeTotal
      }else if(this.currentIndex === 1){
        total = this.legalTotal
      }else if(this.currentIndex === 2){
        total = this.leverTotal
      }
      return total
    },
    // 账户类型
    accountType() {
      let type = 'change'
      if(this.currentIndex === 0){
        type = 'change'
      }else if(this.currentIndex === 1){
        type = 'legal'
      }else if(this.currentIndex === 2){
        type = 'lever'
      }
      return type
    },
    // 当前列表
    currentList() {
      let list = []
      if(this.currentIndex === 0){
        list = this.changeList
      }else if(this.currentIndex === 1){
        list = this.legalList
      }else if(this.currentIndex === 2){
        list = this.leverList
      }
      return list
    },
    // 搜索结果
    filterList() {
      if (this.currency) {
        return this.currentList.filter(
          item => item.currency_name.indexOf(this.currency.toUpperCase()) != -1
        )
      } else {
        return this.currentList
      }
    }
  },
  methods: {
    // 获取账户信息
    async getAccountInfo() {
      this.showFullLoading()
      try {
        const message = await this.api.wallet.info()
        this.changeTotal = Number(message.change_wallet.totle) //资金
        this.legalTotal = Number(message.legal_wallet.totle) //资金
        this.leverTotal = Number(message.lever_wallet.totle) //合约
        if (message.change_wallet.balance.length > 0) {
          this.changeList = message.change_wallet.balance
        } else {
          this.isData = false
        }
        if (message.legal_wallet.balance.length > 0) {
          this.legalList = message.legal_wallet.balance
        } else {
          this.isData = false
        }
        if (message.lever_wallet.balance.length > 0) {
          this.leverList = message.lever_wallet.balance
        } else {
          this.isData = false
        }
      } catch {
        this.isData = false
      }
      this.hideFullLoading()
    },
    //搜索币种
    onTapSearch() {
      this.isShowResult = true
    },
    //选择账户
    navChange(index) {
      this.currentIndex = index
    },

    //跳转到详情页
    onTapCurrency(item) {
      console.log(item);
      
      const params = {
        accountType: this.accountType, //账户类型
        currencyId: item.currency //币种ID
      }
      this.router.navigateTo('/pages/mine/asset/currencyDetail', params)
    }
  },
  onLoad() {
    this.getAccountInfo()
  },

  components: {
    graceNavBar
  }
}
</script>

<style lang="scss" scoped>
.myAsset-page {
  .swiper {
    @extend .mt-30;
    width: 100%;
    height: 198rpx;
    .item {
      padding: 27rpx;
      margin-right: 35rpx;
      border-radius: 10rpx;
      color: #fff;
    }
    .bgc-primary {
      margin-left: 28rpx;
    }

    .blue {
      background-color: #04b0ee;
    }
  }
  .content {
    @extend .px-28;
    .search {
      @extend .pl-10, .mt-20, .bb-g0;
      display: flex;
      align-items: center;
      input {
        @extend .pl-10, .fs-lg;
        width: 100%;
        height: 72rpx;
      }
    }
    .list .item {
      @extend .bb-g0;
      .info {
        display: flex;
        justify-content: space-between;
        > view {
          flex: 1;
          view:first-child {
            @extend .c-tip2;
            font-size: 28rpx;
          }
          view:last-child {
            @extend .py-15;
          }
        }
      }
    }
  }
}
</style>