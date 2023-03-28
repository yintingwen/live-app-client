import Fly from 'flyio/dist/npm/wx'
import {
  timeout,
  serverURL
} from '../../config/network'
import store from "../../store";
import router from '../router';
// import { i18n } from "./i18n";

const http = new Fly();

// 全局配置
http.config.baseURL = serverURL + '/api' // 基础url
http.config.timeout = timeout // 超时时间

// // 全局处理请求拦截
http.interceptors.request.use(request => {
  request.headers["Authorization"] = uni.getStorageSync('token') || ''
  return request
});

// 全局处理响应拦截
http.interceptors.response.use(
  ({ data }) => {
    const { type, message } = data
    switch (type) {
      case '999': { // 未登录
        uni.removeStorageSync('token'); // 删除本地token
        store.commit('user/loginStatus', false) // 修改全局登录状态
        router.reLaunch('/pages/login/index') // 跳转到登录页面
        return Promise.reject(message) // 返回reject
      }
      case 'ok': { // 请求成功
        return message // 返回请求内容
      }
      default: { // 请求参数出现问题
        uni.showToast({ // 提示信息
          title: message,
          duration: 1500,
          icon: 'none'
        });
        return Promise.reject(message)
      }
    }
  },
  e => {
    switch (true) {
      // 超时，不提示信息
      case (e.message.indexOf('timeout') !== 1): {
        break
      }
      default: {
        uni.showToast({
          title: e.message,
          duration: 1500
        });
      }
    }
    return new Error(e.message)
  }
)

export default http

function upload () {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      success (data) {
        resolve(data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
