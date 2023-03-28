// import Event from './event.js'

var socket = {
  url: socketUrl,
  socket: null, // websocket实例
  status: 0,
  _needReset: true,
  _subscriptions: {},

  /**
   * 创建连接
   */
  connect () {
    this.socket = new WebSocket(this.url)
    this.socket.onopen = this._handleOpen.bind(this)
    this.socket.onmessage = this._handleMessage.bind(this)
    this.socket.onerror = this._handleError.bind(this)
    this.socket.onclose = this.__handleClose.bind(this)
  },

  /**
   * 关闭连接
   */
  close () {
    this._needReset = false
  },

  /**
   * 用户调用订阅
   * @param {*} symbol 交易对
   * @param {*} period 周期
   */
  sub (symbol, callback) {
    if (this._subscriptions[symbol]) return
    this._subscriptions[symbol] = callback
    this._sendSub(symbol)
    Event.on(symbol, callback)
  },

  /**
   * 用户调用取消订阅
   */
  unsub (symbol) {
    if (!this._subscriptions[symbol]) return
    delete this._subscriptions[symbol]
    this._sendUnsub(symbol)
    Event.off(symbol)
  },

  /**
   * 发送订阅
   */
  _sendSub (symbol) {
    var data = JSON.stringify({
      sub: symbol,
      id: 'kLine'
    })
    this.socket && this.status === 1 && this.socket.send(data)
  },

  /**
   * 发送取消订阅
   */
  _sendUnsub (symbol) {
    var data = JSON.stringify({
      unsub: symbol,
      id: 'kLine'
    })
    this.socket && this.status === 1 && this.socket.send(data)
  },

  _handleOpen () {
    this.status = 1
    Object.keys(this._subscriptions).forEach(item => this._sendSub(item))
  },
  _handleMessage (message) {
    const data = JSON.parse(message.data)
    if (data.msg && data.msg === 'ping') {
      return this.socket.send(JSON.stringify({
        msg: 'pong'
      }))
    }
    Event.emit(data.ch, data.tick)
  },
  _handleError (err) {
    this.status = 2
  },
  __handleClose () {
    this.status = 3
    this.socket = null
    if (this._needReset) {
      this.connect()
    }
  }
}

// export default socket
