import config from './config.js'

const { platform } = wx.getSystemInfoSync()

export const myRequest = ({ url, data = {}, method = 'GET', contentType = 'application/json' }) => {
  data['app'] = config.appName;
  data['version'] = config.version;
  data['appPlatform'] = config.appPlatform;
  data['platform'] = platform;

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType
      },
      success: res => {
        console.log('myRequest', res);
        resolve(res);
      },
      fail: err => {
        console.log('myRequest_err', err);
        wx.showToast({
          title: '系统繁忙，请稍后再试',
          icon: 'none',
          duration: 1500
        })
        reject();
      }
    })
  })
}
