import eventemitter2 from "eventemitter2"
import { socketUrl } from '../../config/network'

class Market {
  _url = socketUrl // 连接地址
  _socket = null // 实例
  _subCollection = {} // 订阅列表
  _needReconnect = true // 是否需要重连
  status = 0 // 连接状态: 0 未初始化 1 已连接 2 连接错误 3 已断开连接
  reconnectInterval = 5000
  reconnectTimer = null

  emitter = new eventemitter2.EventEmitter2() // 触发者
  hooks = new WebsocketClientHooks()
  /**
  * 构造函数
  */
  constructor() { }

  on (name, callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function')
    }
    this.hooks.on(name, callback)
  }
  off (name, callback) {
    this.hooks.off(name, callback)
  }

  /**
   * 开启连接
   */
  connect () {
    if (this.status === 1 || this.status === 2) return
    this._socket = uni.connectSocket({
      url: this._url,
      success: () => {
        this.status = 1
      }
    });
    this._needReconnect = true
    this._socket.onOpen(this._handleOpen.bind(this))
    this._socket.onMessage(this._handelMessage.bind(this))
    this._socket.onError(this._handleError.bind(this))
    this._socket.onClose(this._handleClose.bind(this))
  }

  /**
   * 关闭连接
   */
  close () {
    this._needReconnect = false; // 禁止重连
    this._socket.close(); // 关闭
  }

  /**
   * 重新连接
   */
  reconnect () {
    this._socket.close(); // 关闭

    this.status = 3
    this.connect()
  }

  /**
   * 发送数据
   * @param {*} data 
   */
  send (data) {
    datg = runHooks('send', data)
    this._socket.send({ data})
  }

  /**
   * 订阅
   * @param {*} topic 订阅主题
   * @param {*} listener 监听函数
   */
  sub (topic, listener) {
    if (!this._subCollection[topic]) {
      this._subCollection[topic] = true
    }
    if (this._socket && this.status === 1) {
      this._sendSub(topic)
      this.emitter.on(topic, listener)
    }
  }

  /**
   * 取消订阅
   * @param {*} topic 订阅主题
   * @param {*} listener 监听函数
   */
  unsub (topic, listener) {
    if (!this._subCollection[topic]) return

    this.emitter.off(topic, listener)
    delete this._subCollection[topic]

    if (this._socket && this.status === 1) {
      this._sendUnsub(topic);
    }
  }

  /**
   * 发送订阅协议
   * @param topic 订阅主题
  */
  _sendSub (topic) {
    let params = {
      sub: topic,
      id: 'sub'
    }
    this.send(params)
  }

  /**
   * 发送取消订阅
   * @param {string} topic 订阅主题
   */
  _sendUnsub (topic) {
    let params = {
      unsub: topic,
      id: 'unsub'
    }
    this.send(params)
  }

  /**
   * 设置自动重连
   */
  _setAutoReconnect () {
    this.reconnectTimer && clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(this.reconnect.bind(this), this.reconnectInterval)
  }

  /**
 * socket连接成功, 会自动重新订阅
 */
  _handleOpen () {
    this.status = 1

    for (const key in this._subCollection) {
      this._sendSub(key)
    }
    this._setAutoReconnect()
  }

  /**
   * socket收到消息
   * @param {*} msg 数据
   */
  _handelMessage (msg) {
    this._setAutoReconnect()
    let data = JSON.parse(msg.data);

    if (data.msg === 'ping') {
      return this.send({ msg: 'pong' })
    }

    if (data.ch) {
      this.emitter.emit(data.ch, data);
    }
  }

  /**
   * socket错误
   * @param {*} err 错误对象
   */
  _handleError (err) {
    this.status = 2
  }

  /**
   * socket连接断开
   */
  _handleClose () {
    this.status = 3 // 设置状态
    this._socket = null; // 重置_socket
    this.reconnectTimer && clearTimeout(this.reconnectTimer)

    if (this._needReconnect) {
      this.connect();
    }
  }
}

class WebsocketClientHooks {
  open = []
  sub = []
  send = []
  message = []
  error = []
  close = []
  
  constructor() { }

  on (name, callback) {
    this[name].push(callback)
  }

  off (name, callback) {
    const index = this[name].indexOf(callback)
    if (index > -1) {
      this[name].splice(index, 1)
    }
  }
 
  async run (name, data) {
    const hooks = this[name]
    if (hooks.length) {
      for (const hook of hooks) {
        const result = await hook(data)
        if (result !== null && result !== undefined) {
          data = result
        }
      }
    }
    return data
  }
}


export default new Market()
