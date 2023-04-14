<template>
  <co-page class="mime-page" :pageFill="true">
    <u-status-bar />
    <MimeUserInfo />
  </co-page>
</template>

<script setup>
import CoPage from '@components/CoPage'
import MimeUserInfo from './components/MimeUserInfo'
import { useTabbarTheme } from '@hooks/tabbar'

useTabbarTheme('bright')

</script>
<style lang='scss' scoped>
.mime-page {
  background-color: rgba(246, 246, 246, 1);
}
</style>