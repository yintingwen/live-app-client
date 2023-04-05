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

  async function setLiveSlideList (index) {
    // const list = [...liveList.value]
	const list = []
    const target = liveList.value[index]
    // list.splice(index, 1)
    list.unshift(target)
	list.unshift(liveList.value[0])
    // for (let i = 100; i > 0; i--) {
    //   const push = { ...list[0], id: list[0].id + 100 }
    //   list.push(push)
    // }
    liveSlideList.value = list
  }

  return {
    liveList,
    liveSlideList,
    liveIndex,
    getLiveList,
    setLiveSlideList
  }
})