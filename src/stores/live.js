import { defineStore } from 'pinia'
import * as liveApi from '@apis/live'
import { ref } from 'vue'

export const useLiveStore = defineStore('live', () => {
  const liveList = ref([]) // 直播列表
  const liveSlideList = ref([]) // 直播轮播列表
  const liveIndex = ref(0) // 当前直播间索引

  // 获取直播列表
  async function getLiveList () {
    const data = await liveApi.getLiveList()
    liveList.value = data
    liveSlideList.value = data
  }
  // 获取直播滑动列表
  async function setLiveSlideList (index) {
  	const list = [...liveList.value]
    const target = liveList.value[index]
    liveIndex.value.splice(index, 1)
    list.unshift(target)
    liveSlideList.value = list
  }

  return {
    liveList,
    liveSlideList,
    liveIndex,
    getLiveList,
    setLiveSlideList,
  }
})