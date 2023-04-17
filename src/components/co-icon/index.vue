<template>
  <image class="co-icon" :src="imgPath" :style="imageStyle" mode="heightFix"/>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  name: { type: String, default: '' },
  size: { type: [Number, String], default: 0 },
})
const imgPath = computed(() => {
  return `/static/icons/${props.name}.png`
})

const imageStyle = computed(() => {
  const height = isNaN(Number(props.size)) ? props.size : `${props.size}rpx`
  return {
    height
  }
})
</script>

<style lang="scss">
.co-icon {
  vertical-align: top;
}
</style>