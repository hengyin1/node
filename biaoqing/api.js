import { myRequest } from './utils/request.js'

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
  return myRequest({
    url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/segment',
    data: {
      Image: base64
    },
    method: 'POST'
  })
}

export const getFace = (userId) => {
  return myRequest({
    url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/getface',
    data: {
      userId: userId
    }
  })
}

export const saveFace = (faces) => {
  return myRequest({
    url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/face/saveface',
    data: {
      faces: faces
    }
  })
}