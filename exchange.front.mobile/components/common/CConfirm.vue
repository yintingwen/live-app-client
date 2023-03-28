<template>
  <view class="c-confirm">
    <uni-popup ref="showtip" :mask-click="false" @change="onChangePop">
      <view class="uni-tip">
        <view class="title" v-if="hasTitle">
          <slot name="title">
            <view class="py-40 fs-lg">{{title}}</view>
          </slot>
        </view>
        <view :class="custom ?  '' : 'uni-tip-content'">
          <slot></slot>
        </view>
        <view class="button-group" v-if="hasBotton">
          <text class="first f-1 flex-center" @click="onTapCancel('tip')">{{ $t('common.cancel') }}</text>
          <text class="f-1 flex-center c-primary" @tap="onTapConfirm('tip')">{{ $t('common.confirm') }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import UniPopup from '../common/uni-popup'

export default {
  data () {
    return {
      status: false
    }
  },
  props: {
    hasTitle: {
      type: Boolean,
      default: true
    },
    hasBotton: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    custom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChangePop () { },
    onTapCancel () {
      this.$emit('cancel')
      this.close()
    },
    onTapConfirm () {
      this.$emit('confirm')
      this.close()
    },
    open () {
      this.$refs.showtip.open()
    },
    close () {
      this.$refs.showtip.close()
    },
    change (e) {
      this.status = e.show
    }
  },
  components: {
    UniPopup
  }
}
</script>
<style lang='scss' scoped>
.grace-dialog-buttons {
  width: 700rpx;
  line-height: 88rpx;
  height: 88rpx;
  display: block;
  overflow: hidden;
  text-align: center;
  font-size: 26rpx;
  color: #999999;
}
.uni-tip {
  display: flex;
  flex-direction: column;
  width: 694rpx;
  background-color: #fff;
  border-radius: 4rpx;

  .title {
    text-align: center;
    font-weight: bold;
    color: #333;
  }

  .uni-tip-content {
    padding: 0 30rpx;
    margin-bottom: 45rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    height: 81rpx;
    border-top: 1rpx solid #d0d0d0;
    background-color: #eaeaea;

    .first {
      border-right: 1rpx solid #d0d0d0;
    }
  }
}
</style>