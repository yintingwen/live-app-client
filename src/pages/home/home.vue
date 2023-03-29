<template>
  <co-page>
    <home-header 
      :tabs="HOME_TABS" 
      :tabActive="tabActive"
      @tab-change="onTabChange"
    />
  </co-page>
</template>

<script setup>
import { ref } from 'vue'
import HomeHeader from './components/homeHeader'
import CoPage from '../../components/CoPage'
import { HOME_TABS } from '../../constants/home'

const tabActive = ref(1)

function onTabChange(id) {
  tabActive.value = id
}


</script>
<style lang='scss' scoped>
.t {
  background-color: red;
}
</style>