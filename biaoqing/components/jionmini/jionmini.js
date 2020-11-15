import config from '../../utils/config.js'

Component({
  properties: {
    top: {
      type: Number,
      value: 0
    }
  },
  data: {
    appPlatform: config.appPlatform
  },
  attached: function () {
    const showJoinMini = () => {
      wx.getStorage({
        key: 'has_show_joinMini',
        complete: res => {
          let isShowJoinMini = false;
          let data;
          if (!res.data) {
            isShowJoinMini = true;
            data = 1;
          } else if (res.data < 5) {
            isShowJoinMini = true;
            data = res.data + 1;
          }
          this.setData({
            isShowJoinMini: isShowJoinMini
          })
          if (isShowJoinMini) {
            setTimeout(() => {
              this.setData({
                isShowJoinMini: false
              })
            }, 30000)
            wx.setStorage({
              key: 'has_show_joinMini',
              data: data
            })
            wx.setStorage({
              key: 'last_show_joinMini_time',
              data: new Date().getTime()
            })
          }
        }
      })
    }

    wx.getStorage({
      key: 'last_show_joinMini_time',
      complete: res => {
        if (res.data) {
          const currentTime = new Date().getTime();
          if (currentTime - res.data > 180000) {
            showJoinMini();
          }
        } else {
          showJoinMini();
        }
      }
    })
  },
  methods: {
    cancelJoinMini: function () {
      this.setData({
        isShowJoinMini: false
      })
    }
  }
})
