import axios from 'axios'

function localRequest (config) {
  // 创建axios实例

  const instance = axios.create({

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
