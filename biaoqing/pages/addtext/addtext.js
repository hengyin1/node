// pages/addtext/addtext.js
const util = require('../../utils/util.js')

Page({
  data: {
    texts: [],
    tapIndex: 0,
    isShow: !1
  },
  onLoad: function (options) {
    const { src, width, height } = options;
    this.textItem = {
      left: 0.5 * width,
      top: 0.5 * height,
      fontSize: 20,
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
    this.getSetting();
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
  tapText: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      tapIndex: index
    })
  },
  touchstart: function (e) {
    let pageX, pageY;
    this.startPoint = { pageX, pageY } = e.touches[0];
  },
  touchmove: function (e) {
    let { pageX, pageY } = e.touches[0];
    const text = this.data.texts[this.data.tapIndex];
    text.left += pageX - this.startPoint.pageX;
    text.top += pageY - this.startPoint.pageY;
    this.setData({
      [`texts[${this.data.tapIndex}]`]: text
    })
    this.startPoint = { pageX, pageY };
  },
  saveImage: function () {
    wx.showLoading({
      title: '保存中...'
    })
    this.renderCanvas(res => {
      util.saveImageToPhotosAlbum({
        pic: res,
        failCB: () => {
          this.getSetting();
        }
      })
    })
  },
  renderCanvas: function (callBack) {
    const context = wx.createCanvasContext('drawer');
    context.drawImage(this.data.src, 0, 0, this.data.width, this.data.height);

    this.data.texts.filter(item => item.value).forEach(element => {
      const { left, top, fontSize, color, value } = element;
      context.save();
      context.setFontSize(fontSize);
      context.setFillStyle(color);
      context.setTextAlign('center');
      context.setTextBaseline('middle');
      context.fillText(value, left, top);
      context.restore();
    })

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
  onShareAppMessage: function () {

  }
})