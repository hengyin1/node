// pages/addtext/addtext.js
Page({
  data: {
    texts: [],
    isShow: !1
  },
  onLoad: function (options) {
    const { src, width, height } = options;
    this.textItem = {
      left: 0.5 * width,
      top: 0.5 * height,
      fontSize: 16,
      color: '#000000',
      value: ''
    }
    this.setData({
      src: src,
      width: width,
      height: height,
      texts: [JSON.parse(JSON.stringify(this.textItem))]
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  add: function () {
    const texts = this.data.texts;
    texts.push(JSON.parse(JSON.stringify(this.textItem)));
    this.setData({
      texts: texts
    })
  },
  del: function (e) {
    const { index } = e.currentTarget.dataset;
    const texts = this.data.texts;
    texts.splice(index, 1);
    this.setData({
      texts: texts
    })
  },
  changeVal: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      [`texts[${index}].value`]: e.detail.value
    })
  },
  toggle: function (e) {
    const { index } = e.currentTarget.dataset;
    if (!this.data.texts[index].value) {
      wx.showToast({
        title: '请先输入文字',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    this.setData({
      isShow: !0,
      toggleIndex: index
    })
  },
  hide: function () {
    this.setData({
      isShow: !1
    })
  },
  stop: function () {
    
  },
  touchColor: function (e) {
    const { r, g, b } = e.detail;
    if (r == undefined || g == undefined || b == undefined) return;
    const color = `rgb(${r}, ${g}, ${b})`;
    this.setData({
      [`texts[${this.data.toggleIndex}].color`]: color
    })
  },
  changeFontSize: function (e) {
    this.setData({
      [`texts[${this.data.toggleIndex}].fontSize`]: e.detail.value
    })
  },
  onShareAppMessage: function () {

  }
})