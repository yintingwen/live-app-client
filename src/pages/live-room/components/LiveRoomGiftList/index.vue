<template>
  <view class="live-room-gift-list">
    <view class="live-room-gift-header">
      <view class="live-room-gift-tabs">
        <u-tabs
          :current="activeTab"
          :list="tabs"
          lineWidth="30rpx"
          lineHeight="8rpx"
          lineColor="linear-gradient(270deg, rgba(105, 80, 251, 1) 0%, rgba(184, 58, 243, 1) 100%);"
          :activeStyle="{
            fontSize: '32rpx',
            color: 'rgba(255, 255, 255, 1)',
          }"
          :inactiveStyle="{
            fontSize: '32rpx',
            color: 'rgba(166, 165, 163, 1)',
          }"
          itemStyle="height: 55rpx;padding: 0 17rpx 20rpx;"
          @change="onTabsChange"
        >
        </u-tabs>
      </view>
    </view>
    <view class="live-room-gift-swiper">
      <swiper :style="{ height: '520rpx' }" :current="activeTab" @change="onSwiperChange">
        <swiper-item v-for="list in renderGiftList" :key="list.id">
          <scroll-view scroll-y :style="{ height: '525rpx' }">
            <view class="live-room-gift-swiper-item">
              <view 
                v-for="gift in list" 
                :key="gift.id" 
                class="gift-item"
                @tap="emits('tapGift',gift)"
              >
                <image
                  class="gift-item-img"
                  :src="`/static/gifts/covers/${gift.name}.png`"
                  mode="scaleToFill"
                />
                <text class="gift-item-name">{{ gift.name }}</text>
                <view class="gift-item-price">
                  <co-icon name="diamond" size="22" />
                  <text class="gift-item-price-text">{{ gift.diamond }}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script setup>
const emits = defineEmits(['tapGift'])
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const activeTab = ref(0)

const tabs = computed(() =>
  props.list.map((item) => ({
    name: item.name,
    id: item.id,
  }))
)

const renderGiftList = computed(() => props.list.map((item) => item.giftList))

function onTabsChange (e) {
  activeTab.value = e.index
}

function onSwiperChange (e) {
  activeTab.value = e.detail.current
}
</script>
<style lang="scss">
.live-room-gift-list {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 40rpx 40rpx 0 0;

  .live-room-gift-tabs {
    padding: 24rpx 22rpx 0 17rpx;
  }

  .live-room-gift-swiper {
    width: 750rpx;
    margin-bottom: 32rpx;

    .live-room-gift-swiper-item {
      width: 750rpx;
      padding: 0 15rpx;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding-bottom: 42rpx;

      .gift-item {
        width: 110rpx;
        margin: 42rpx 35rpx 0;

        .gift-item-img {
          width: 110rpx;
          height: 110rpx;
          margin-bottom: 18rpx;
        }

        .gift-item-name {
          color: #ffffff;
          font-size: 22rpx;
          line-height: 32rpx;
          text-align: center;
          margin-bottom: 6rpx;
        }

        .gift-item-price {
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .gift-item-price-img {
            width: 28rpx;
            height: 22rpx;
          }
          .gift-item-price-text {
            margin-left: 10rpx;
            font-size: 24rpx;
            line-height: 36rpx;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
