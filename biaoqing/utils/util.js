import config from './config.js'

export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = (n) => {
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
        if (interstitialAd) interstitialAd.destroy();
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

export const readFile = (filePath, encoding) => {
  return new Promise((resolve, reject) => {
    if (!wx.getFileSystemManager) reject('请升级版本');
    const fileManager = wx.getFileSystemManager();
    if (encoding) {
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
    } else {
      fileManager.readFile({
        filePath: filePath,
        success: res => {
          resolve(res.data);
        },
        fail: () => {
          reject('失败啦');
        }
      })
    }
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

export const chooseImage = (count = 1, sizeType = ['compressed'], sourceType = ['album','camera']) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      success: res => {
        resolve({ tempFilePaths: res.tempFilePaths, size: res.tempFiles[0].size });
      },
      fail: () => {
        reject();
      }
    }) 
  })
}

export const getImageInfo = (src) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: src,
      success: res => {
        resolve(res);
      },
      fail: () => {
        reject();
      }
    })
  })
}

export const render = (context) => {
  return new Promise((resolve, reject) => {
    context.draw(false, () => {
      resolve();
    })
  })
}

export const canvasToTempFilePath = (data) => {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath(Object.assign(data, {
      success: res => {
        resolve(res.tempFilePath);
      },
      fail: () => {
        reject();
      }
    }))
  })
}

export const compressImage = async (src, info) => {
  if (!info) info = await getImageInfo(src);
  const width = 100;
  const height = info.height / info.width * width;
  const context = wx.createCanvasContext('pixel');
  context.drawImage(src, 0, 0, width, height);
  await render(context);
  return await canvasToTempFilePath({
    width: width,
    height: height,
    destWidth: width,
    destHeight: height,
    canvasId: 'pixel'
  })
}

