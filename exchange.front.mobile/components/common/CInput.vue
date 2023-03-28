<template>
  <view class="m-input">
    <input :type="type" :password="password" class :placeholder="placeholder" @input="onInputValue" :value="value" />
    <text v-if="icon" :class="['icon','iconfont',`icon-${icon}`]" @click="onTapIcon"></text>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    }
  },
  methods: {
    onInputValue(e) {
      this.$emit('input', e.detail.value.trim())
    },
    onTapIcon() {
      this.$emit('tapIcon')
    }
  }
}
</script>
<style lang='scss' scoped>
.m-input {
  @include border('0', 'b');
  @extend .bb-1, .fs-lg;
  height: 90rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  input {
    @extend .py-10;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
  }

  .icon {
    @extend .fs-xxl, .px-5;
    @include f-center;
    height: 100%;
  }
}
</style>