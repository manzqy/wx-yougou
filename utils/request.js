/**
 * 基于wx.request封装
 * config {Object}
 */
const request = (config = {}) => {
  const validUrl = /^http/.test(config.url)
  if (!validUrl) {
    config.url = request.defaults.baseURL + config.url
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success: result => {
        resolve(result)
      },
      fail: error => {
        reject(error)
      },
      complete: res => {
        request.error(res)
      }
    })
  })
}
/**
 * request默认配置
 */
request.defaults = {
  baseURL: ''
}
request.error = () => {}
request.onError = callback => {
  if (typeof callback === 'function') {
    request.error = callback
  }
}
export default request
