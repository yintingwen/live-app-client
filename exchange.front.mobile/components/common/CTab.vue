<template>
  <view class="c-tab">
    <!-- 滑动容器 -->
    <scroll-view :scroll-x="true" :show-scrollbar="false">
      <!-- tab容器 -->
      <view class="tab-container" :class="{'jc-center': isCenter}" :style="tabStyle">
        <block v-for="(item,index) in items" :key="index">
          <!-- tab单项 未激活-->
          <view v-if="index !== value" class="tab-item" :style="itemBaseStyle" @tap="onTapItem(index)">
            <!-- tab的内容 -->
            <view :class="{'ellipsis': isFlex}">{{item}}</view>
          </view>
          <!-- tab单项 激活-->
          <view v-else class="tab-item" :style="itemActiveStyle" @tap="onTapItem(index)">
            <!-- tab的内容 -->
            <view :class="{'ellipsis': isFlex}">{{item}}</view>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    // 是否居中
    isCenter() {
      return this.type === 'center'
    },
    // 是否平分
    isFlex() {
      return this.type === 'flex'
    },
    // tab整体的样式
    tabStyle() {
      const height = `height:${this.height}rpx;`
      return `${height}`
    },
    // item基础的样式
    itemBaseStyle() {
      const top = `border-top: ${this.lineHeight}rpx solid transparent;` // 基础的上边框
      const bottom = `border-bottom: ${this.lineHeight}rpx solid transparent;` // 基础的下边框
      return `${top}${bottom}${this.itemWidth}`
    },
    // item激活的样式
    itemActiveStyle() {
      const color = `color: ${this.activeColor};` // 激活的文字
      const top = `border-top: ${this.lineHeight}rpx solid transparent;` // 基础的上边框
      const bottom = `border-bottom: ${this.lineHeight}rpx solid ${this.activeColor};` // 激活的线
      return `${color}${top}${bottom}${this.itemWidth}`
    },
    // 平分时的宽度
    itemWidth() {
      return this.isFlex ? `width:${100 / this.items.length}%;` : 'auto'
    }
  },
  props: {
    // 激活的下标
    value: {
      type: Number
    },
    // tab数组
    items: {
      type: Array,
      default() {
        return []
      }
    },
    // tabs类型
    type: {
      type: String,
      default: 'left'
    },
    // tabs整体高度
    height: {
      type: String,
      default: '68'
    },
    // 线宽度
    lineHeight: {
      type: String,
      default: '2'
    },
    // 当前项激活颜色
    activeColor: {
      type: String,
      default: '#2468c2'
    }
  },
  methods: {
    onTapItem(index) {
      this.$emit('input', index)
      this.$emit('change', index)
    }
  }
}
</script>
<style lang='scss' scoped>
.c-tab {
  .tab-container {
    display: flex;
  }
  .tab-item {
    @extend .flex-center, .mx-5, .px-10, .ta-center;
    height: 100%;
  }
}
</style>