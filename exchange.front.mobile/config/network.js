// const devUrl = 'http://www.exchange.com'
// const proUrl = 'http://www.exchange.com'
const devUrl = 'http://api.zcccoin.com:81'
const proUrl = 'http://api.zcccoin.com:81'
const serverURL = process.env.NODE_ENV === "development" ? devUrl : proUrl
const timeout = '10000'

// websocket
const socketUrl = 'ws://api.zcccoin.com:2346'

export {
  devUrl,
  proUrl,
  timeout,
  serverURL,
  socketUrl
}