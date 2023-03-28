<template>
  <view class="legal-record-filter">
    <view class="filter-option">
      <view class="my-30 d-flex">
        <text class="mr-15">{{ $t('legal.record.filter.currency') }}</text>
        <picker
          mode="selector"
          :value="currencyIndex"
          range-key="name"
          :range="currencyData"
          @change="onChangePicker"
        >{{currencyInfo.name}}</picker>
      </view>
      <view class="fs-xs mb-15 c-tip2">{{ $t('legal.record.filter.type') }}</view>

      <view class="option-grop">
        <block v-for="item in orderType" :key="item.value">
          <view @tap="onTapType(item.value)" class="option" :class="{'active': form.type === item.value}">{{item.name}}</view>
        </block>
      </view>

      <view class="fs-xs mb-15 c-tip2">{{ $t('legal.record.filter.status') }}</view>

      <view class="option-grop">
        <block v-for="(item,index) in statusType" :key="item">
          <view
            @tap="onTapStatus(index)"
            class="option"
            :class="{'active': form.status === index}"
          >{{ $t(`legal.status.${item}`) }}</view>
        </block>
      </view>
    </view>

    <view class="filter-button">
      <view class="f-1 flex-center reset" @tap="onTapReset">{{ $t('common.reset') }}</view>
      <view class="f-1 flex-center bgc-primary c-white" @tap="onTapConfirm">{{ $t('common.confirm') }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      orderType: [
        {
          name: this.$t('common.buy'),
          value: 'sell'
        },
        {
          name: this.$t('common.sell'),
          value: 'buy'
        }
      ],
      statusType: ['unpaid', 'completed', 'canceled'],
      currencyIndex: 0, // 当前币种的下标
      type: '',
      status: -1
    }
  },
  computed: {
    currencyInfo () {
      return this.currencyData[this.currencyIndex]
    },
    form () {
      return {
        type: this.type,
        status: this.status,
        currency_id: this.currencyInfo.id
      }
    }
  },
  props: {
    defaultType: {
      type: String
    },
    defaultStatus: {
      type: Number
    },
    currencyData: {
      type: Array
    },
    currency_id: {
      type: Number
    }
  },
  methods: {
    onTapType (value) {
      this.type = value
    },
    onTapStatus (value) {
      this.status = value
    },
    onTapReset () {
      this.type = ''
      this.status = -1
      this.currencyIndex = this.currencyData.findIndex(item => item.id === this.currency_id)
    },
    onTapConfirm () {
      this.$emit('confirm', this.form)
    },
    onChangePicker (e) {
      this.currencyIndex = e.detail.value
    }
  },
  created () {
    this.type = this.defaultType
    this.status = this.defaultStatus
    this.currencyIndex = this.currencyData.findIndex(item => item.id === this.currency_id)
  }
}
</script>
<style lang='scss' scoped>
.legal-record-filter {
  background-color: #fff;

  .filter-option {
    padding: 28rpx;
  }

  .option-grop {
    @extend .d-flex, .mb-30, .fw-wrap;

    .option {
      @extend .mr-15, .ta-center, .fs-xxs;
      width: 196rpx;
      height: 54rpx;
      line-height: 54rpx;
      background-color: #eeeeee;

      &.active {
        @extend .c-white, .bgc-primary;
      }
    }
  }

  .filter-button {
    @extend .d-flex;
    height: 80rpx;
    background-color: #eeeeee;
  }
}
</style>