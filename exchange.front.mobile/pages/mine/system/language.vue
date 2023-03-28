<template>
  <view class="language-page">
    <page-layout>
      <view class="language-body">
        <block v-for="(value,key) in languageInfo" :key="key">
          <view @tap="onTapLang(key)" class="language-item">{{$t(`language.${key}`)}}</view>
        </block>
      </view>
    </page-layout>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      pageTitle: 'mine.system.switchLang'
    }
  },
  computed: {
    ...mapState(['languageInfo'])
  },
  methods: {
    ...mapActions(['setLanguage']),
    onTapLang(lang) {
      this.setLanguage(lang)
      this.setPageTitle()
      this.setTabBar()
    }
  }
}
</script>

<style lang="scss" sc>
.language-page {
  .language-body {
    view {
      @extend .bb-g0, .px-28;
      height: 94rpx;
      line-height: 94rpx;
    }
  }
}
</style>
