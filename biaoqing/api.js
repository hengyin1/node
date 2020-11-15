import { myRequest } from './utils/request.js'
import cache from './utils/globalcache.js'
import { readFile } from './utils/util.js'
import { segmentErrorCode } from './utils/localdata.js'

export const checkText = (text, successCB, failCB) => {
  if (wx.cloud) {
    wx.cloud.callFunction({
      name: 'textcheck',
      data: {
        content: text
      },
    })
    .then(res => {
      console.log('checkText', res);
      if (res.result.errCode === 87014) {
        failCB();
      } else {
        successCB();
      }
    })
    .catch(err => successCB())
  } else {
    successCB();
  }
}

export const checkImage = (image) => {
  return new Promise((resolve, reject) => {
    if (wx.cloud) {
      readFile(image).then(data => {
        const extendArr = image.split('.');
        const extend = extendArr[extendArr.length - 1];

        wx.cloud.callFunction({
          name: 'imagecheck',
          data: {
            contentType: `image/${extend}`,
            buffer: data
          }
        }).then(res => {
          console.log('checkImage', res);
          if (res.result.errCode == 87014) {
            reject('图片违规，请替换一张');
          } else {
            resolve();
          }
        }).catch(err => {
          console.log('checkImage_err', err);
          resolve();
        })
      }, () => {
        resolve();
      })
    } else {
      resolve();
    }
  })
}

export const segment = (base64) => {
  return new Promise((resolve, reject) => {
    myRequest({
      url: 'https://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/segment',
      data: {
        Image: base64
      },
      method: 'POST'
    }).then(res => {
      resolve(res);
    }, err => {
      reject(segmentErrorCode[err] || err);
    })
  })
}

export const getFace = (userId) => {
  const key = 'face_list';
  if (cache.get(key)) {
    return Promise.resolve(cache.get(key));
  } else {
    return myRequest({
      url: 'https://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/getface',
      data: {
        userId: userId
      },
      key: key
    })
  }
}

export const saveFace = (faces) => {
  return myRequest({
    url: 'https://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/saveface',
    data: {
      faces: faces
    }
  })
}