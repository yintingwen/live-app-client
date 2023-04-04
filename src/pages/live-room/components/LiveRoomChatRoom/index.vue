<template>
  <list 
    class="live-room-chat-room" 
    ref="listRef"
  >
    <cell v-for="item in list" class="chat-item">
      <image
        src="/static/images/live-room/chat_room_level.png"
        mode="scaleToFill"
      />
    </cell>
  </list>

</template>
<script setup>
import { ref, onMounted } from 'vue'

const listRef = ref(null)
// const props = defineProps({
//   list: { type: Array, default: () => [
//     { text:'撒带教案数据库', level: 1 },
//     { text: '12312312233', level: 2 }
//   ]}
// })

const list = ref([
    { text:'撒带教案数据库', level: 1 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 },
    { text: '12312312233', level: 2 }
])
onMounted(() => {
  listRef.value.setSpecialEffects({
    id:"list",
    headerHeight: 200
  })
})

</script>
<style lang="scss">
.live-room-chat-room {
  background-color: #fff;
  width: 536rpx;
  height: 520rpx;
  position: absolute;
  bottom: 168rpx;
  left: 24rpx;
  z-index: 1;
  display: flex;
  flex-direction: row;

  .chat-item {
		width: 200rpx;
		text-align: center;
		font-size: 36rpx;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>