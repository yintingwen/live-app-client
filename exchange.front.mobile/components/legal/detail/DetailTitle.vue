<template>
  <view class="d-flex ai-center jc-between px-15 mt-10">
    <view>
      <view class="fs-xxl mb-10">{{statusStr}}</view>
      <view class="fs-sm c-tip">{{describeStr}}</view>
    </view>
    <view @tap="onTapCall">
      <c-icon name="phone"></c-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    statusStr() {
      const string = ['代付款', '已完成', '已取消', '已付款']
      return string[this.status]
    },
    describeStr() {
      switch (this.status) {
        case 0:
          return '请等待买家付款'
        case 1:
          return '订单已完成'
        case 2:
          return '订单已取消'
        case 3:
          return '买家已付款,请核实后确认'
      }
    }
  },
  props: {
    status: {
      type: Number
    },
    mobile: {
      type: String
    }
  },
  methods: {
    /**
     * 联系tap事件
     */
    onTapCall() {
      this.call()
    },
    /**
     * 打电话
     */
    call() {
      uni.makePhoneCall({
        phoneNumber: this.mobile
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>