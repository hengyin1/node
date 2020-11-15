import config from './config.js'
import cache from './globalcache.js'

const { platform } = wx.getSystemInfoSync()

export const myRequest = ({ url, data = {}, method = 'GET', contentType = 'application/json', key = '', time = 0 }) => {
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
            if (key) cache.set(key, res.data.data, time);

            resolve(res.data.data);
          } else {
            if (key) cache.set(key, res.data, time);

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
