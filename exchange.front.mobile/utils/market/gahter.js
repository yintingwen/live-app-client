import { ee } from 'event-emitter'
import { hasListeners } from 'event-emitter/has-listeners'

export class Gather {
  /**
 * 构造函数
 */
  constructor() {
    this._url = 'wss://api.hadax.com/ws';
    this._socket = null;
    this._emitter = ee();
    this._subCollection = {};
    this._needReconnect = true;

    this._start();
  }

  /**
 * 订阅
   * * @param topic 订阅主题
   * * @param listener 监听函数
 */
  subscribe (topic, listener) {
    if (!this._subCollection[topic]) {
      this._subCollection[topic] = true;
    }

    if (this._socket && this._socket.OPEN && !hasListeners(this._emitter, topic)) {
      this._subscribe(topic);
    }

    this._emitter.on(topic, listener);
  }

  /**
 * 取消订阅
   * * @param topic 订阅主题
   * * @param listener 监听函数
 */
  unsubscribe (topic, listener) {
    this._emitter.off(topic, listener);
    if (!hasListeners(this._emitter, topic)) {
      delete this._subCollection[topic];

      if (this._socket && this._socket.OPEN) {
        this._unsubcribe(topic);
      }
    }
  }

  /**
 * 关闭采集
 */
  close () {
    this._needReconnect = false;
    this._socket.close();
    this._socket = null;
  }

  /**
 * 发送订阅协议
   * * @param topic 订阅主题
 */
  _subscribe (topic) {
    let params = {
      sub: topic,
      id: 'sub'
    };
    this._socket.send(JSON.stringify(params));
  }

  /**
 * 发送取消订阅协议
   * * @param topic 订阅主题
 */
  _unsubcribe (topic) {
    let params = {
      unsub: topic,
      id: 'unsub'
    };
    this._socket.send(JSON.stringify(params));
  }

  /**
 * 连接服务器
 */
  _start () {
    this._socket = new WebSocket(this._url);

    this._socket.onopen = this._handleOpen.bind(this);
    this._socket.onmessage = this._handelMessage.bind(this);
    this._socket.onclose = this._handleClose.bind(this);
    this._socket.onerror = this._handleError.bind(this);
  }

  /**
 * socket连接成功
 */
  _handleOpen () {
    for (key in this._subCollection) {
      this._subscribe(key);
    }
  }

  /**
 * socket收到消息
   * * @param data 网络数据
 */
  _handelMessage (data) {
    let msg = JSON.parse(data);
    if (msg.ping) {
      this._socket.send(JSON.stringify({ pong: 'pong' }));
      return;
    }

    if (msg.ch) {
      this._emitter.emit(msg.ch, msg);
    }
  }

  /**
 * socket连接断开
 */
  _handleClose () {
    if (this._needReconnect) {
      this._restart();
    }
  }

  /**
 * socket错误
   * * @param err 错误
 */
  _handleError (err) {
    if (this._needReconnect) {
      this._restart();
    }
  }

  /**
 * 重连
 */
  _restart () {
    this._start();
  }
}
