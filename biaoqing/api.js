import { myRequest } from './utils/request.js'
import cache from './utils/globalcache.js'
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

export const segment = (base64) => {
  return new Promise((resolve, reject) => {
    myRequest({
      url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/segment',
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
      url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/getface',
      data: {
        userId: userId
      },
      key: key
    })
  }
}

export const saveFace = (faces) => {
  return myRequest({
    url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/saveface',
    data: {
      faces: faces
    }
  })
}