// ws发送的消息类型
export const LIVE_SEND_METHOD = {
  REGISTER: 'info', // 注册直播间
  CHAT: 'Chat', // 聊天
  SEND_GIFT: 'SendGift', // 发送礼物
  FOLLOW: 'Follow' // 关注
}

// ws接收的消息类型
export const LIVE_RECEIVE_TYPE = {
  CHAT_SUCCESS: 'chatsuccess', // 聊天成功
  CHAT_ERROR: 'chatError', // 聊天失败
  SEND_GIFT_SUCCESS: 'sendGiftSuccess', // 发送礼物成功
  SEND_GIFT_ERROR: 'sendgifterror', // 发送礼物失败
  FOLLOW_SUCCESS: 'followsuccess', // 关注成功
  FOLLOW_ERROR: 'followerror', // 关注失败
}