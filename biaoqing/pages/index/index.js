//index.js
//获取应用实例
import { tabs, templates, faces } from '../../utils/localdata.js'

const app = getApp()

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
  }
})
