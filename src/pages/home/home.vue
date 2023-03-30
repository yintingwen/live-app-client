<template>
  <co-page>
    <home-header 
      :tabs="HOME_TABS" 
      :tabActive="tabActive"
      @tab-change="onTabChange"
    />
    <view class="flex flex-wrap justify-between pl-13 pr-13">
      <home-live-card 
        v-for="item in liveStore.liveList" 
        :key="item.id"
        :cover="item.titlePage"
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

const liveStore = useLiveStore()
const tabActive = ref(1)

function onTabChange(id) {
  tabActive.value = id
}

onLoad(() => {
  liveStore.getLiveList()
})

</script>
<style lang='scss' scoped>
.live-card-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>