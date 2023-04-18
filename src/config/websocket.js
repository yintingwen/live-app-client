import { USER_TOKEN_STORAGE } from '@/constants/user';
import { WS_ROOM_SHAKE_HANDS, WS_SEND_METHOD_INFO } from '@/constants/websocket';
import WebsocketClient from '@/utils/websocketClient/WebsocketClient';

// 握手模板
WebsocketClient.template.add(WS_ROOM_SHAKE_HANDS, (room) => {
  let token = null
  if (import.meta.env.DEV) {
    token = import.meta.env.VITE_TOKEN_TEST
  } else {
    token = uni.getStorageInfoSync(USER_TOKEN_STORAGE)
  }
  return {
    method: WS_SEND_METHOD_INFO,
    room,
    token
  }  
})