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
        if (res.statusCode == 200 && res.data) {
          if (res.data.data) {
            resolve(res.data.data);
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.data && res.data.msg || '');
        }
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
