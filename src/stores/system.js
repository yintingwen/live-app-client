import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userSystemStore = defineStore('system', () => {
  const systemInfo = ref(null)
  
  const devicePixelRatio = computed(() => getSystemInfo().devicePixelRatio)
  const screenHeight = computed(() => getSystemInfo().screenHeight)

  function getSystemInfo () {
    if (systemInfo.value === null) {
      systemInfo.value = uni.getSystemInfoSync()
    }
    return systemInfo.value
  }

  return {
    systemInfo,
    screenHeight,
    devicePixelRatio,
    getSystemInfo
  }
})