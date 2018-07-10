import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
// import router from '@/router'
// import qs from 'qs'
/**
 * 处理UTL截取和添加app
 * @param url
 * @returns {*}
 */
const getUrl = function(url) {
  if (url.startsWith('/api')) {
    url = url.slice(0, 1);
  } else if (url.startsWith('api')) {
    // 此处不需要处理 确定为正确的url
  } else if (url.startsWith('/')) {
    url = 'api' + url
  } else {
    url = 'api/' + url
  }
  return url;
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  responseType: 'json',
  timeout: 30000, // request timeout 默认30秒
  withCredentials: true // 是否允许带cookie这些
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (config.method === 'post') {
    // qs.stringify(config.data)
    // service.post(config.url, config.params)
  }
  config.url = getUrl(config.url);

  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          // 404退出登录去 将token清除
          removeToken()
          err.message = `请求地址出错: ${err.response.config.url}`
          setTimeout(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
          })
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  })

export default service
