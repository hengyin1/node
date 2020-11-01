//index.js
//获取应用实例
import { tabs, templates, faces } from '../../utils/localdata.js'

const app = getApp()

Page({
  data: {
    upTabs: [
      {
        value: 0,
        name: '选择形象'
      },
      {
        value: 1,
        name: '选择表情'
      }
    ],
    selectedUpTab: 0,
    downTabs: tabs.tab_0,
    selectedDownTab: 0,
    selectedTemTab: 0,
    selectedFaceTab: 0
  },
  onLoad: function () {
    
  },
  tapUpTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectedUpTab: index,
      downTabs: tabs[`tab_${index}`]
    })
  },
  tapDownTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectedDownTab: index
    })
  },
  getList: function () {
    
  }
})
