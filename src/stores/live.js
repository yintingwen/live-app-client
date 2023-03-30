import { defineStore } from 'pinia'
import * as liveApi from '@apis/live'
import { ref } from 'vue'

export const useLiveStore = defineStore('live', () => {
  const liveList = ref([]) // 直播列表
  const liveIndex = ref(0) // 当前直播间索引

  // 获取直播列表
  async function getLiveList () {
    const data = await liveApi.getLiveList()
    liveList.value = data
  }

  return {
    liveList,
    liveIndex,
    getLiveList
  }
})