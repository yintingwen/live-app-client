<template>
  <view id="page-layout">
    <grace-page
      :customHeader="customHeader"
      :headerHeight="layoutHeaderHeight"
      :headerIndex="headerIndex"
      :headerBG="headerBG"
      :statusBarBG="statusBarBG"
      :footerIndex="footerIndex"
      :rbWdith="rbWdith"
      :rbBottom="rbBottom"
      :rbRight="rbRight"
      :footerBg="footerBg"
      :isSwitchPage="isSwitchPage"
    >
      <view v-if="header" class="page-header" slot="gHeader">
        <slot name="header"></slot>
      </view>
      <view class="page-body" slot="gBody">
        <slot></slot>
      </view>
      <view v-if="footer" class="page-footer" slot="gFooter">
        <slot name="footer"></slot>
      </view>
      <view v-if="suspended" class="page-suspended" slot="gRTArea">
        <slot name="suspended"></slot>
      </view>
    </grace-page>

    <!-- loading -->
    <!-- <w-loading class="bgc" text="加载中..." mask="false" click="true" ref="loading"></w-loading> -->

    <!-- <graceFullLoading
      class="bgc"
      :graceFullLoading="fullLoading"
      logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"
    ></graceFullLoading>-->
  </view>
</template>

<script>
import GracePage from '../../utils/graceUI/components/gracePage'
import wLoading from '../../components/common/w-loading'
import GraceFullLoading from '../../utils/graceUI/components/graceFullLoading'

import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['fullLoading']),
    layoutHeaderHeight() {
      return this.header ? this.headerHeight : 0
    }
  },
  props: {
    customHeader: { type: Boolean, default: false }, // 是否开启自定义导航
    statusBarBG: { type: String, default: '#ffffff' }, // 沉浸式导航颜色

    header: { type: Boolean, default: false }, // 是否显示头部
    headerHeight: { type: Number, default: 44 }, // 头部导航高度，单位 px
    headerIndex: { type: Number, default: 999 }, // 头部导航 层级
    headerBG: { type: String, default: 'none' }, // 头部导航背景颜色

    footer: { type: Boolean, default: false }, // 是否显示底部
    footerIndex: { type: Number, default: 999 },
    footerBg: { type: String, default: '' },

    suspended: { type: Boolean, default: false }, // 是否显示悬浮挂件
    rbWdith: { type: Number, default: 100 }, // 悬浮挂件宽度
    rbBottom: { type: Number, default: 100 }, // 悬浮挂件bottom值
    rbRight: { type: Number, default: 20 }, // 悬浮挂件right值

    isSwitchPage: { type: Boolean, default: false } // 页面是否为一个 入口页内包含的切换页面( 不需要进行 iphoneX 底部适配 )
  },
  methods: {},
  components: {
    GracePage,
    GraceFullLoading,
    'w-loading': wLoading
  },
  onReady() {}
}
</script>
<style lang='scss' scoped>
.bgc {
  background-color: rgba($color: #000000, $alpha: 0.5);
}

/deep/ .grace-full-loading {
  z-index: 9999;
}
</style>