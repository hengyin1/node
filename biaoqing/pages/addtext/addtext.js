// pages/addtext/addtext.js
Page({
  data: {
    texts: []
  },
  onLoad: function (options) {
    const { src, width, height } = options;
    this.textItem = {
      left: 0.5 * width,
      top: 0.5 * height,
      fontSize: 14,
      color: '#000000',
      value: ''
    }
    this.setData({
      src: src,
      width: width,
      height: height,
      texts: [this.textItem]
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  add: function () {
    const texts = this.data.texts;
    texts.push(this.textItem);
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
  onShareAppMessage: function () {

  }
})