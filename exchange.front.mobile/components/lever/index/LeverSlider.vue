<template>
  <view class="lever-silder">
    <view class="uni-padding-wrap uni-common-mt">
      <view>
        <slider :value="value" @change="sliderChange" :max="silderLength" show-value />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    leverInfo: {
      default() {}
    },
    value: {
      default() {
        return 0
      }
    }
  },
  computed: {
    silderLength() {
      if (this.leverInfo.lever_share_limit) {
        return this.leverInfo.lever_share_limit.max
      }
    }
  },
  methods: {
    sliderChange(e) {
      this.$emit('onSliderChange', e.detail.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-silder {
  margin: 34rpx 0;
}
</style>