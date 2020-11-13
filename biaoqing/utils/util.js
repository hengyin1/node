import config from './config.js'

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export const createInterstitialAd = () => {
  if (wx.createInterstitialAd && config.adUnitId) {
    const interstitialAd = wx.createInterstitialAd({
      adUnitId: config.adUnitId
    })
    if (!interstitialAd) return;
    interstitialAd.onLoad(() => {
      interstitialAd.show(() => {
        if (interstitialAd) interstitialAd.destroy();
      }).catch(err => {
        console.log('interstitialAd_err', err);
        if (interstitialAd.destroy) interstitialAd.destroy();
      })
    })
  }
}

export const saveImageToPhotosAlbum = ({ pic, successCB, failCB }) => {
  wx.saveImageToPhotosAlbum({
    filePath: pic,
    success: () => {
      wx.hideLoading();
      wx.showToast({
        title: '保存到相册啦',
        icon: 'success',
        duration: 1500
      })
      if (successCB) successCB();
    },
    fail: () => {
      wx.hideLoading();
      if (failCB) failCB();
    }
  })
}

export const readFile = (filePath, encoding = 'base64') => {
  return new Promise((resolve, reject) => {
    if (!wx.getFileSystemManager) reject('请升级版本');
    const fileManager = wx.getFileSystemManager();
    fileManager.readFile({
      filePath: filePath,
      encoding: encoding,
      success: res => {
        resolve(res.data);
      },
      fail: () => {
        reject('失败啦');
      }
    })
  })
}

export const writeFile = (base64, extend = '.png') => {
  return new Promise((resolve, reject) => {
    if (!wx.getFileSystemManager) reject('请升级版本');
    const fileManager = wx.getFileSystemManager();
    const filePath = wx.env.USER_DATA_PATH + '/'+ new Date().getTime() + extend;
    fileManager.writeFile({
      filePath: filePath,
      data: base64,
      encoding: 'base64',
      success: () => {
        resolve({ fileManager, filePath });
      },
      fail: () => {
        reject('失败啦');
      }
    })
  })
}
