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
        this.tem_item = item;
        this.setTemSize({width, height, path});
      } else {
        this.setFaceSize({width, height, path});
      }
    }, () => {

    })
  },
  setTemSize: function (pic) {
    const ratio = pic.width / pic.height;
    if (ratio > windowWidth / 200) {
      pic.width = 0.9 * windowWidth;
      pic.height = pic.width / ratio;
    } else {
      pic.height = 200;
      pic.width = pic.height * ratio;
    }
    this.setData({
      temInfo: pic
    })
  },
  setFaceSize: function (pic) {
    const ratio = pic.width / pic.height;
    const { face_x, face_y, face_width, face_height } = this.tem_item;
    console.log(face_x, face_y, face_width, face_height);
    
    if (ratio > face_width / face_height) {
      pic.width = face_width;
      pic.height = pic.width / ratio;
    } else {
      pic.height = face_height;
      pic.width = pic.height * ratio;
    }
    pic.left = face_x;
    pic.top = face_y;
    
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
  }
})
