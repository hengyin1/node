//app.js
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: 'biaoqing-2g73u0gn88edff24'
      })
    }
  },
  globalData: {
    userInfo: null
  }
})