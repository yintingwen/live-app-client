<template>
  <co-page>
    <home-header :tabs="HOME_TABS" :tabActive="tabActive" @tab-change="onTabChange" />
    <view class="flex flex-wrap justify-between pl-13 pr-13">
      <home-live-card
        class="mb-12"
        v-for="(item, index) in liveStore.liveList"
        :key="item.id"
        :cover="item.titlePage"
        :label="item.label"
        :title="item.cardTitle"
        @tap="onTapLive(index)"
      ></home-live-card>
    </view>
  </co-page>
</template>

<script setup>
import CoPage from '@components/CoPage'
import HomeHeader from './components/HomeHeader/index.vue'
import HomeLiveCard from './components/HomeLiveCard/index.vue'
import { ref } from 'vue'
import { HOME_TABS } from '@constants/home'
import { useLiveStore } from '@stores/live'
import { onLoad } from '@dcloudio/uni-app'
import { useTabbarTheme } from '@hooks/tabbar'

useTabbarTheme('bright')
const liveStore = useLiveStore()
const tabActive = ref(1)

onLoad(() => {
  liveStore.getLiveList()
})

function onTabChange(id) {
  tabActive.value = id
}

function onTapLive (index) {
  liveStore.setLiveSlideList(index)
  uni.navigateTo({ url: '/pages/live-room/live-room'})
}

</script>
<style lang="scss" scoped>
</style>
