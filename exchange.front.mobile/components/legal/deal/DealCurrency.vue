<template>
  <view class="legal-currency">
    <grace-nav-bar
      isCenter
      :currentIndex="value"
      @change="onChangeTab"
      :items="currencyList"
      lineHeight="46rpx"
      activeDirection="center"
      activeLineWidth="94rpx"
      activeLineHeight="4rpx"
      activeColor="#4f5cd1"
      activeLineBg="#4f5cd1"
    ></grace-nav-bar>
  </view>
</template>

<script>
import GraceNavBar from '../../../utils/graceUI/components/graceNavBar'
export default {
  data() {
    return {}
  },
  computed: {
    currencyList() {
      return this.items.map(item => item.name)
    }
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Number
    }
  },
  methods: {
    onChangeTab(e) {
      this.$emit('change', e)
    }
  },
  components: {
    GraceNavBar
  }
}
</script>
<style lang='scss' scoped>
.legal-currency {
  @extend .bb-g1, .mt-30;
}
</style>