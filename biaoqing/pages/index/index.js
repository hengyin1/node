//index.js
//获取应用实例
import { tabs, templates, faces } from '../../utils/localdata.js'

const app = getApp()
const { windowWidth, windowHeight } = wx.getSystemInfoSync();

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
    this.getImageInfo(item.url).then(res => {
      const { width, height, path } = res;
      if (this.data.selectedUpTab == 'tem') {
        this.setTemSize({width, height, path}, item);
      } else {
        this.setFaceSize({width, height, path});
      }
    }, () => {

    })
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
  },
  saveImage: function () {
    
  },
  changeImage: function () {
    
  }
})
