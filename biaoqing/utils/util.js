const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const saveImageToPhotosAlbum = ({pic, successCB, failCB}) => {
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
      if (failCB) failCB;
    }
  })
}

module.exports = {
  formatTime: formatTime,
  saveImageToPhotosAlbum: saveImageToPhotosAlbum
}
