//index.js
//获取应用实例
import user from '../../utils/user.js'
import { checkImage, segment, getFace, saveFace } from '../../api.js'
import { createInterstitialAd, getImageInfo, chooseImage, compressImage, readFile, writeFile, canvasToTempFilePath, saveImageToPhotosAlbum } from '../../utils/util.js'
import { uploadFile } from '../../utils/upload.js'
import { grayscale } from '../../utils/pixel.js'
import cache from '../../utils/globalcache.js'
import config from '../../utils/config.js'
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
  },
  onReady: function () {
    this.getSetting();

    if (config.appPlatform == 'qq') {
      this.createRewardedVideoAd('10a88f42f5b25e1cfe493af999df2d5f');
    }
  },
  onShow: function () {
    createInterstitialAd();
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

      this.beforeSaveImage();
    }
  },
  tapUpTab: function (e) {
    const { index } = e.currentTarget.dataset;
    const isSelfDefine = this.data[`${index}TabIndex`] == 10000;
    
    this.setData({
      selectedUpTab: index,
      downTabs: tabs[index],
      isSelfDefine: isSelfDefine
    })
    
    if (isSelfDefine) {
      this.getListServer();
    } else {
      this.getList();
    }
  },
  tapDownTab: function (e) {
    const { index } = e.currentTarget.dataset;
    const isSelfDefine = index == 10000;
    this.setData({
      isSelfDefine: isSelfDefine,
      [`${this.data.selectedUpTab}TabIndex`]: index
    })
    if (isSelfDefine) {
      this.getListServer();
    } else {
      this.getList();
    }
  },
  getListServer: function () {
    this.setData({
      list: []
    })

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    getFace(user.openid).then(res => {
      this.setData({
        list: res
      }, () => {
        wx.hideLoading();
      })
    }, () => {
      wx.hideLoading();
    })
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
      wx.showLoading({
        title: '加载图片中...',
        mask: true
      })
      getImageInfo(item.url).then(res => {
        wx.hideLoading();
        const { width, height, path } = res;
        this.setTemSize({width, height, path}, item);
      }, () => {
        wx.hideLoading();
      })
    } else {
      if (!this.data.temInfo || !this.data.temInfo.path) {
        wx.showToast({
          title: '请先选择形象',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      wx.showLoading({
        title: '加载图片中...',
        mask: true
      })
      getImageInfo(item.url).then(res => {
        wx.hideLoading();
        const { width, height, path } = res;
        this.setFaceSize({width, height, path});
      }, () => {
        wx.hideLoading();
      })
    }
  },
  chooseImage: async function () {
    try {
      const { tempFilePaths, size } = await chooseImage();
      const { width, height } = await getImageInfo(tempFilePaths[0]);
      if (size > 3100000 || width * height > 1600 * 1600) {
        wx.showToast({
          title: '图片太大啦',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      
      wx.showLoading({
        title: '抠脸中...',
        mask: true
      })
      const compressSrc = await compressImage(tempFilePaths[0]);
      await checkImage(compressSrc);

      const base64 = await readFile(tempFilePaths[0], 'base64');
      const res = await segment(base64);
      const { fileManager, filePath } = await writeFile(res.PortraitImage);
      let url = await uploadFile(filePath, 'biaoqing_user_face_');
      url += '?imageMogr2/scrop/200x200';
      
      let faces = [{
        userId: user.openid,
        url: url
      }]

      const next = async () => {
        let list = this.data.list;
        list = [...faces, ...list];
        this.setData({
          list: list
        }, () => {
          wx.hideLoading();
        })

        await saveFace(faces);
        cache.remove('face_list');
      }

      try {
        await grayscale(url);
        const tempFilePath = await canvasToTempFilePath({
          width: 200,
          height: 200,
          destWidth: 200,
          destHeight: 200,
          canvasId: 'pixel',
          fileType: 'png'
        })
        const grayurl = await uploadFile(tempFilePath, 'biaoqing_user_face_');

        faces.push({
          userId: user.openid,
          url: grayurl
        })

        next();
      } catch (error) {
        next();
      }

      fileManager.unlink({
        filePath: filePath
      })
    } catch (error) {
      console.log('error', error);
      wx.hideLoading();
      if (typeof(error) == 'string') {
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 1500
        })
      }
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
  touchstart: function (e) {
    let pageX, pageY;
    this.startPoint = { pageX, pageY } = e.touches[0];

    if(e.touches.length > 1) {
      const [touch0, touch1] = e.touches;
      const xMove = touch1.pageX - touch0.pageX;
      const yMove = touch1.pageY - touch0.pageY;
      this.oldDistance = Math.sqrt(xMove * xMove + yMove * yMove);
    }
  },
  touchmove: function (e) {
    if (e.touches.length > 1) {
      const [touch0, touch1] = e.touches;
      const xMove = touch1.pageX - touch0.pageX;
      const yMove = touch1.pageY - touch0.pageY;
      const newDistance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.scaleImage(newDistance / this.oldDistance);
      this.oldDistance = newDistance;
    } else {
      let { pageX, pageY } = e.touches[0];
      let { face_center_x, face_center_y } = this.data.temInfo;
      face_center_x += pageX - this.startPoint.pageX;
      face_center_y += pageY - this.startPoint.pageY;
      this.setData({
        [`temInfo.face_center_x`]: face_center_x,
        [`temInfo.face_center_y`]: face_center_y
      })
      this.startPoint = { pageX, pageY };
    }
  },
  scaleImage: function (scale) {
    const faceInfo = this.data.faceInfo;
    const { width, height } = faceInfo;
    faceInfo.width *= scale;
    faceInfo.height *= scale;

    const temInfo = this.data.temInfo;
    const ratio = (scale - 1) * 0.5;
    temInfo.face_center_x -= ratio * width;
    temInfo.face_center_y -= ratio * height;

    this.setData({
      temInfo: temInfo,
      faceInfo: faceInfo
    })
  },
  beforeSaveImage: function () {
    if (!this.checkHasValue()) return;
    if (wx.createRewardedVideoAd && !this.isVideoAdError) {
      this.setData({
        isShowVideoDialog: true,
        videoContent: '观看视频广告，才能保存哦',
        confirmText: '确定'
      })
    } else {
      this.saveImage();
    }
  },
  saveImage: function () {
    wx.showLoading({
      title: '保存中...'
    })
    this.renderCanvas(res => {
      saveImageToPhotosAlbum({
        pic: res,
        failCB: () => {
          this.getSetting();
        }
      })
    })
  },
  addText: function () {
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
        destWidth: tem_width,
        destHeight: tem_height,
        canvasId: 'drawer',
        fileType: 'jpg',
        success: res => {
          callBack(res.tempFilePath);
        }
      }, this)
    })
  },
  viewRewardedVideoAd: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 3000
    })
    this.videoAd.show().then(() => wx.hideToast()).catch(err => {
      this.videoAd.load().then(() => this.videoAd.show().then(() => wx.hideToast())).catch(err => {
        wx.hideToast();
        this.saveImage();
      })
    })
  },
  createRewardedVideoAd: function (adUnitId) {
    if (wx.createRewardedVideoAd) {
      if (this.videoAd) {
        this.videoAd.offLoad();
        this.videoAd.offError();
        this.videoAd.offClose();
        this.videoAd.destroy();
        this.videoAd = null;
      }

      this.videoAd = wx.createRewardedVideoAd({
        adUnitId: adUnitId
      })
      if (!this.videoAd) this.isVideoAdError = true;
      this.videoAd.load();

      this.videoAd.onLoad(() => {
        console.log('videoAd_onLoad');
      })

      this.videoAd.onError(res => {
        console.log('videoAd_erro', res);
        this.isVideoAdError = true;
      })

      this.videoAd.onClose(status => {
        console.log('videoAd_status', status);
        if (status && status.isEnded || status === undefined) {
          this.saveImage();
        } else {
          this.setData({
            isShowVideoDialog: true,
            videoContent: '观看完整视频广告，才能保存哦',
            confirmText: '继续观看'
          })
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '斗图必备神器！',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
