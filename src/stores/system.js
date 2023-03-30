import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userSystemStore = defineStore('system', () => {
  const systemInfo = ref(null)
  const screenHeight = computed(() => {
    return getSystemInfo().screenHeight
  })

  function getSystemInfo () {
    if (systemInfo.value === null) {
      systemInfo.value = uni.getSystemInfoSync()
    }
    return systemInfo.value
  }

  return {
    systemInfo,
    screenHeight,
    getSystemInfo
  }
})