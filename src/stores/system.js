import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSystemStore = defineStore('system', () => {
  const systemInfo = ref(null)
  
  const devicePixelRatio = computed(() => getSystemInfo().devicePixelRatio)
  const screenHeight = computed(() => getSystemInfo().screenHeight)
  const screenWidth = computed(() => getSystemInfo().screenWidth)
  const windowHeight = computed(() => getSystemInfo().windowHeight)

  function getSystemInfo () {
    if (systemInfo.value === null) {
      systemInfo.value = uni.getSystemInfoSync()
    }
    return systemInfo.value
  }

  return {
    systemInfo,
    screenHeight,
    windowHeight,
    screenWidth,
    devicePixelRatio,
    getSystemInfo
  }
})