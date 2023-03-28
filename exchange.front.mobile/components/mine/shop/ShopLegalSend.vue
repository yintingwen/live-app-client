<template>
  <view class="shop-legal-send">
    <!-- tab栏 -->
    <grace-nav-bar
      :currentIndex="currentIndex"
      :items="items"
      isCenter
      lineHeight="55rpx"
      activeColor="#4F5CD1"
      activeLineBg="#4F5CD1"
      activeLineWidth="80rpx"
      activeLineHeight="4rpx"
      activeDirection="center"
      :size="300"
      @change="onChangeWay"
    ></grace-nav-bar>
    <view class="mt-10">
      <view class="item">
        <text>{{ $t('mine.myShop.detail.currency') }}</text>
        <text>{{info.currency_name}}</text>
      </view>
      <view class="item">
        <text class="f-1">{{ $t('mine.myShop.detail.way') }}</text>
        <picker mode="selector" range-key="name" :range="payRange" @change="onChangePicker">{{ wayObj.name }}</picker>
      </view>
      <view class="item">
        <text>{{ $t('common.unit_price') }}</text>
        <input
          type="number"
          class="fs-sm ta-right"
          placeholder-class="c-tip2"
          v-model="price"
          :placeholder="$t('mine.myShop.detail.placeholder.price')"
        />
      </view>
      <view class="item">
        <text>{{ $t('common.number') }}</text>
        <input
          type="number"
          class="fs-sm ta-right"
          placeholder-class="c-tip2"
          v-model="totalNumber"
          :placeholder="$t('mine.myShop.detail.placeholder.number')"
        />
      </view>
      <view class="item">
        <text>{{ $t('mine.myShop.detail.minimum') }}</text>
        <input
          type="number"
          class="fs-sm ta-right"
          placeholder-class="c-tip2"
          v-model="minNumber"
          :placeholder="$t('mine.myShop.detail.placeholder.min')"
        />
      </view>
    </view>
    <view class="p-30">
      <button type="primary" class="c-button" @tap="onTapSend">{{ $t('mine.myShop.detail.release') }}</button>
    </view>
  </view>
</template>

<script>
import GraceNavBar from '../../../utils/graceUI/components/graceNavBar'
import graceChecker from '../../../utils/graceUI/jsTools/graceChecker'

export default {
  data () {
    return {
      currentIndex: 0, // 交易的分类
      way: 0, // 支付方式
      price: '',
      totalNumber: '',
      minNumber: ''
    }
  },
  computed: {
    // tab遍历
    items () {
      return [this.$t('common.buy'), this.$t('common.sell')]
    },
    payRange () {
      return [
        {
          name: this.$t('common.alipay'),
          prop: 'ali_pay'
        },
        {
          name: this.$t('common.wechat'),
          prop: 'we_chat'
        },
        {
          name: this.$t('common.bank_card'),
          prop: 'bank'
        }
      ]
    },
    /**
     * 选择的支付
     */
    wayObj () {
      return this.payRange[this.way]
    },
    /**
     * 提交的表单
     */
    form () {
      return {
        type: this.currentIndex ? 'sell' : 'buy',
        way: this.wayObj.prop,
        price: this.price,
        total_number: this.totalNumber,
        min_number: this.minNumber,
        currency_id: this.info.currency_id
      }
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /**
     * 点击tab
     */
    onChangeWay (index) {
      this.currentIndex = index
    },
    /**
     * picker选择
     */
    onChangePicker (e) {
      this.way = e.detail.value
    },
    /**
     * 点击发布
     */
    onTapSend () {
      const result = this.checkForm()
      if (!result) {
        return uni.showToast({
          title: graceChecker.error,
          duration: 2000,
          icon: 'none'
        })
      }
      this.$emit('send', this.form)
    },
    /**
     * 校验表单
     */
    checkForm () {
      const rules = [
        {
          name: 'price',
          checkType: 'notnull',
          errorMsg: this.$t('mine.myShop.detail.placeholder.price')
        },
        {
          name: 'total_number',
          checkType: 'notnull',
          errorMsg: this.$t('mine.myShop.detail.placeholder.number')
        },
        {
          name: 'min_number',
          checkType: 'notnull',
          errorMsg: this.$t('mine.myShop.detail.placeholder.min')
        },
        {
          name: 'min_number',
          checkType: 'betweenD',
          checkRule: `1,${this.totalNumber}`,
          errorMsg: this.$t('mine.myShop.detail.placeholder.limit')
        }
      ]
      return graceChecker.check(this.form, rules)
    }
  },
  components: {
    GraceNavBar
  }
}
</script>
<style lang='scss' scoped>
.shop-legal-send {
  background-color: #fff;
  padding-top: 20rpx;

  .tab {
    @extend .p-10, .d-flex, .ai-center;

    .active {
    }
  }

  .item {
    @extend .flex-between;
    font-size: 26rpx;
    padding: 25rpx;
    height: 80rpx;
    border-bottom: 1px solid #eeeeee;
    > view {
      @extend .d-flex, .ai-center;
    }
    input {
      flex: 1;
    }
  }
}
</style>