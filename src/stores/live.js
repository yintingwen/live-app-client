import { defineStore } from 'pinia'
import * as liveApi from '@apis/live'
import { ref } from 'vue'

export const useLiveStore = defineStore('live', () => {
  const liveList = ref([]) // 直播列表
  const liveSlideList = ref([]) // 直播轮播列表
  const liveIndex = ref(0) // 当前直播间索引
  const giftList = ref([]) // 礼物列表

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
    // for (let i = 100; i > 0; i--) {
    //   const push = { ...list[0], id: list[0].id + 100 }
    //   list.push(push)
    // }
    liveSlideList.value = list
  }
  // 获取礼物列表
  async function getGiftList () {
    if (giftList.value.length) return giftList.value
    const data = await liveApi.getGiftList()
    giftList.value = data
  }

  return {
    liveList,
    liveSlideList,
    liveIndex,
    giftList,
    getLiveList,
    setLiveSlideList,
    getGiftList
  }
})