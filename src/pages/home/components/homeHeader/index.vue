<template>
  <view class="home-header">
    <u-status-bar />
    <view class="home-header-operation">
      <view class="home-header-tab">
        <view
          v-for="item in tabs"
          :key="item.id"
          :class="{ 'home-header-tab-item': true, active: tabActive === item.id }"
          @tap="onTapItem(item.id)"
        >
          {{ item.name }}
          <image
            v-if="tabActive === item.id"
            class="tab-active-bar"
            src="/static/images/home/tab_active.png"
          />
        </view>
      </view>
      <view class="home-header-other">
        <image class="search" src="/static/images/home/search.png"></image>
        <image class="search" src="/static/images/home/ranking.png"></image>
      </view>
    </view>
    <!-- <scroll-view scroll-x class="home-header-category">
      <view 
        :class="{'home-header-category-item': true, 'active': categoryActive === item.id }" 
        v-for="item in categories" 
        :key="item.id"
        @tap="onTapCategory(item.id)"
      >
        {{ item.name }}
      </view>
    </scroll-view> -->
  </view>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
defineProps({
  tabActive: { type: Number, default: 1 },
  categoryActive: { type: Number, default: 0 },
  tabs: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
})
const emits = defineEmits(['tab-change', 'category-change'])


function onTapItem(id) {
  emits('tab-change', id)
}
function onTapCategory (id) {
  emits('category-change', id)
}
</script>
<style lang="scss" scoped>
.home-header {
  background-image: url('/static/images/home/header_bg.png');
  background-size: 100%;

  .home-header-operation {
    display: flex;
    justify-content: space-between;
    padding: 1rpx 19rpx 24rpx 26rpx;

    .home-header-tab {
      display: flex;
      align-items: flex-end;
      line-height: 70rpx;

      .home-header-tab-item {
        line-height: 1;
        font-size: 36rpx;
        color: rgba(0, 0, 0, 1);
        margin-right: 36rpx;
        padding: 13rpx 0;
        position: relative;

        &.active {
          font-size: 44rpx;
        }

        .tab-active-bar {
          position: absolute;
          bottom: -6rpx;
          left: 50%;
          transform: translate(-50%);

          height: 13rpx;
          width: 68rpx;
        }
      }
    }

    .home-header-other {
      padding-top: 19rpx;

      .search {
        height: 47rpx;
        width: 45rpx;
        margin-right: 25rpx;
      }
      .ranking {
        width: 54rpx;
        height: 47rpx;
      }
    }
  }

  .home-header-category {
    width: 100%;
    white-space: nowrap;
    padding-bottom: 19rpx;

    .home-header-category-item {
      display: inline-block;
      padding: 6rpx 18rpx;
      color: #333333;
      font-size: 28rpx;
      line-height: 42rpx;
      background-color: #ededed;
      border-radius: 212rpx;
      margin-right: 12rpx;

      &.active {
        background: linear-gradient(90deg, #EF3B78 1.39%, #B467D1 100%);
        color: #fff;
      }

      &:first-child {
        margin-left: 16rpx;
      }

      &:last-child {
        margin-right: 16rpx;
      }
    }
  }
}
</style>
