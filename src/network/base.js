import axios from 'axios'

function localRequest (config) {
  // 创建axios实例

  const instance = axios.create({
    baseURL: 'http://rambuild.cn:8888/api/private/v1/'
  })
  // 请求拦截
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })
  // 实例的回应拦截
  instance.interceptors.response.use((res) => {
    if (res.status === 200) {
      return res.data
    }
  })
  // 返回实例进行请求的结果
  return instance(config)
}

export {
  localRequest
}
