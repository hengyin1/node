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