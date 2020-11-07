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
  toggle: function () {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onShareAppMessage: function () {

  }
})