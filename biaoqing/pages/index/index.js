//index.js
//获取应用实例
import { tabs, templates, faces } from '../../utils/localdata.js'

const app = getApp()
const { windowWidth, windowHeight } = wx.getSystemInfoSync()

Page({
  data: {
    upTabs: [
      {
        value: 'tem',
        name: '选择形象'
      },
      {
        value: 'face',
        name: '选择表情'
      }
    ],
    selectedUpTab: 'tem',
    downTabs: tabs.tem,
    temTabIndex: 0,
    faceTabIndex: 0,
    list: []
  },
  onLoad: function () {
    this.getList();
    this.getSetting();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  getSetting: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum'] === false) {
          this.setData({
            authWritePhotosAlbum: true
          })
        }
      }
    })
  },
  openSetting: function (res) {
    if (res.detail.authSetting['scope.writePhotosAlbum']) {
      this.setData({
        authWritePhotosAlbum: false
      })

      this.saveImage();
    }
  },
  tapUpTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectedUpTab: index,
      downTabs: tabs[index]
    })
    this.getList();
  },
  tapDownTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      [`${this.data.selectedUpTab}TabIndex`]: index
    })
    this.getList();
  },
  getList: function () {
    let list = [];
    if (this.data.selectedUpTab == 'tem') {
      list = templates[`tem_${this.data.temTabIndex}`];
    } else if (this.data.selectedUpTab == 'face') {
      list = faces[`face_${this.data.faceTabIndex}`];
    }
    this.setData({
      list: list
    })
  },
  chooseItem: function (e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];
    if (this.data.selectedUpTab == 'tem') {
      this.getImageInfo(item.url).then(res => {
        const { width, height, path } = res;
        this.setTemSize({width, height, path}, item);
      }, () => {})
    } else {
      if (!this.data.temInfo || !this.data.temInfo.path) {
        wx.showToast({
          title: '请先选择形象',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      this.getImageInfo(item.url).then(res => {
        const { width, height, path } = res;
        this.setFaceSize({width, height, path});
      }, () => {})
    }
  },
  setTemSize: function (pic, item) {
    const { width, height } = pic;
    const ratio = width / height;
    if (ratio > windowWidth / 200) {
      pic.width = 0.9 * windowWidth;
      pic.height = pic.width / ratio;
    } else {
      pic.height = 200;
      pic.width = pic.height * ratio;
    }

    const scale = pic.width / width;
    pic.face_center_x = item.face_x * scale + pic.width * 0.5;
    pic.face_center_y = item.face_y * scale + pic.height * 0.5;
    pic.face_width = item.face_width * scale;
    pic.face_height = item.face_height * scale;
    this.setData({
      temInfo: pic
    })

    if (this.data.faceInfo) this.setFaceSize(this.data.faceInfo);
  },
  setFaceSize: function (pic) {
    const ratio = pic.width / pic.height;
    const { face_width, face_height } = this.data.temInfo;
    
    if (ratio > face_width / face_height) {
      pic.width = face_width;
      pic.height = pic.width / ratio;
    } else {
      pic.height = face_height;
      pic.width = pic.height * ratio;
    }
    
    this.setData({
      faceInfo: pic
    })
  },
  getImageInfo: function (src) {
    wx.showLoading({
      title: '加载图片中...',
      mask: true
    })
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: src,
        success: res => {
          wx.hideLoading();
          resolve(res);
        },
        fail: () => {
          wx.hideLoading();
          reject();
        }
      })
    })
  },
  saveImage: function () {
    if (!this.checkHasValue()) return;
    this.renderCanvas(res => {
      this.saveImageToPhotosAlbum(res);
    })
  },
  changeImage: function () {
    if (!this.checkHasValue()) return;
    this.renderCanvas(res => {
      wx.navigateTo({
        url: `/pages/addtext/addtext?src=${res}&width=${this.data.temInfo.width}&height=${this.data.temInfo.height}`
      })
    })
  },
  checkHasValue: function () {
    if (!this.data.temInfo || !this.data.temInfo.path) {
      wx.showToast({
        title: '请先选择形象',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.faceInfo || !this.data.faceInfo.path) {
      wx.showToast({
        title: '还没选择表情',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  renderCanvas: function (callBack) {
    const context = wx.createCanvasContext('drawer');
    const { path: tem_path, width: tem_width, height: tem_height, face_center_x, face_center_y } = this.data.temInfo;
    context.drawImage(tem_path, 0, 0, tem_width, tem_height);

    const { path, width, height } = this.data.faceInfo;
    context.drawImage(path, face_center_x - 0.5 * width, face_center_y - 0.5 * height, width, height);

    context.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'drawer',
        fileType: 'jpg',
        success: res => {
          callBack(res.tempFilePath);
        }
      }, this)
    })
  },
  saveImageToPhotosAlbum: function (pic) {
    wx.showLoading({
      title: '保存中...'
    })
    wx.saveImageToPhotosAlbum({
      filePath: pic,
      success: () => {
        wx.hideLoading();
        wx.showToast({
          title: '保存到相册啦',
          icon: 'success',
          duration: 1500
        })
      },
      fail: () => {
        wx.hideLoading();
        this.getSetting();
      }
    })
  },
  onShareAppMessage: function () {

  }
})
