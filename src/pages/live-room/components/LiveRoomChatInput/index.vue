<template>
  <!-- <u-transition :show="show"> -->
    <view
      id="live-room-chat"
      class="live-room-chat-input-container"
      :style="containerStyle"
      @transitionend="onTransitionEnd"
      @tap.stop="() => {}"
    >
      <view class="live-room-chat-input">
        <input
          class="chat-input"
          :value="text"
          :cursor-spacing="liveInputCursor"
          placeholder="说点什么..."
          ref="input"
          :adjust-position="false"
          @blur="onInputBlur"
          @change="emits('update:text', $event.detail.value)"
        />
        <view class="send-btn" @tap.stop="onTapSend">
          <text class="send-btn-text">发送</text>
        </view>
      </view>
      <u-safe-bottom></u-safe-bottom>
    </view>
  <!-- </u-transition> -->
</template>
<script setup>
import { ref, defineEmits, computed, defineProps, watch, onBeforeUnmount } from 'vue'
import { userSystemStore } from '@stores/system'
const emits = defineEmits(['blur', 'send', 'update:text', 'undate:show'])
const props = defineProps({
  text: { type: String, default: '' },
  show: { type: Boolean, default: false },
})
const systemStore = userSystemStore()
const input = ref(null)
const inputTop = ref(systemStore.screenHeight)

const containerStyle = computed(() => ({
  padding: `${20 / systemStore.devicePixelRatio}px ${20 / systemStore.devicePixelRatio}px ${
    40 / systemStore.devicePixelRatio
  }px`,
  top: `${inputTop.value}px`,
}))
const liveInputCursor = 40 / systemStore.devicePixelRatio

watch(
  () => props.show,
  (val) => {
    if (val) {
      input.value.focus()
    } else {
      input.value.blur()
    }
  }
)

function onKeyboardHeightChange(res) {
  console.log(res);
  if (res.height) {
    uni
      .createSelectorQuery()
      .select('#live-room-chat')
      .boundingClientRect((searchBarBoundRect) => {
        console.log(searchBarBoundRect);
        inputTop.value = systemStore.screenHeight - res.height - searchBarBoundRect.height
      })
      .exec()
  } else {
    inputTop.value = systemStore.screenHeight
  }
}

function onInputBlur() {
  emits('blur')
}

function onTapSend() {
  emits('send')
}

uni.onKeyboardHeightChange(onKeyboardHeightChange)
onBeforeUnmount(() => uni.offKeyboardHeightChange(onKeyboardHeightChange))
</script>
<style lang="scss">
.live-room-chat-input-container {
  background-color: #fff;
  position: fixed;
  left: 0;
  width: 750rpx;
  transition: top 0.15s;

  .live-room-chat-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .chat-input {
      height: 60rpx;
      flex: 1;
      margin-right: 20rpx;
      font-size: 28rpx;
      background-color: #e4e4e4;
      border-radius: 20rpx;
      padding: 10rpx 20rpx;
    }

    .send-btn {
      font-size: 24rpx;
      border-radius: 50%;
      background-color: #f56c6c;
      height: 60rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &-text {
        font-size: 28rpx;
        color: #fff;
      }
    }
  }
}
</style>
