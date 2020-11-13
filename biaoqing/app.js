//app.js
import config from './utils/config.js'

App({
  onLaunch: function () {
    if (config.appPlatform == 'wechat' && wx.cloud) {
      wx.cloud.init({
        env: 'biaoqing-2g73u0gn88edff24'
      })
    }
  },
  globalData: {
    userInfo: null
  }
})