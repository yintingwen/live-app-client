<template>
  <image @tap="onTapIcon" v-if="useImg" :src="imgPath" :mode="imgMode" :style="iconStyle" @error="error" />
  <text @tap="onTapIcon" v-else class="iconfont" :class="iconName" :style="iconStyle"></text>
</template>

<script>
import { serverURL } from '../../config/network'
import { mapGetters } from 'vuex'

export default {
  props: {
    // 使用类型, img：图片、font：字体图标
    type: { type: String, default: 'font' },
    // 图标尺寸
    size: { type: String },
    // 图标高度 (仅图片生效)
    imgHeight: { type: String },
    // 图标名
    name: { type: String, default: '', required: true },
    // 颜色
    color: { type: String },
    // 自定义样式
    styles: { type: String }
  },
  data () {
    return {
      msg: 'Invalid icon'
    }
  },
  computed: {
    ...mapGetters('currency', ['logoObject']),
    useFont () {
      return this.type === 'font'
    },
    useImg () {
      return this.type === 'img'
    },
    imgPath () {
      const currency = this.logoObject[this.name]
      return currency ? `${serverURL}/${currency.img}` : `/static/icons/${this.iconName}.png`
    },
    imgMode () {
      return this.imgHeight ? 'scaleToFill' : 'widthFix'
    },
    iconName () {
      const symbol = this.useImg ? '' : 'icon-'
      return `${symbol}${this.name}`
    },
    iconStyle () {
      if (this.styles) {
        return this.styles
      }
      return this[`${this.type}Style`]
    },
    // 字体的样式
    fontStyle () {
      const color = this.color ? `color:${this.color};` : ''
      const size = this.size ? `font-size:${this.size}rpx` : ''
      return color + size
    },
    // 图片的样式
    imgStyle () {
      let style = ''
      const height = this.imgHeight ? `height:${this.imgHeight}rpx;` : ''
      const width = `width:${this.size}rpx;`
      return height + width
    }
  },
  methods: {
    error (e) {
      console.log(this.msg)
    },
    onTapIcon () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
image {
  width: 1em;
  vertical-align: middle;
}
</style>
