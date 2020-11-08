// pages/images/detail/index.js
const app = getApp();

const util = require("../../../utils/util.js");

var _api = require("../../../api/index.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var videoAd = null;

// var iscanpaly = app.globalData.iscanpaly;
Page({
    /**
   * 页面的初始数据
   */
    data: {
        rooturl: app.rooturl,
        statusBarHeight: app.globalData.statusBarHeight,
        font: "",
        img_id: "5",
        color: "#000000",
        fontid: "",
        colortop: "44",
        cousedis: "100",
        colorcousedis: "100",
        defaultbgcolor: "rgb(32, 17, 236)",
        hidden: false,
        fonturl: "",
        defaultlenth: "3",
        fonttishi: "请输入",
        scroll: true,
        lists: "",
        colorList: [ {
            title: "白色",
            color: "#FFFFFF"
        }, {
            title: "浅灰",
            color: "#EBEBEB"
        }, {
            title: "橙黄",
            color: "#FFFF00"
        }, {
            title: "洋红",
            color: "#FF0096"
        }, {
            title: "浅蓝",
            color: "#1E9FFF"
        }, {
            title: "青色",
            color: "#00FF01"
        }, {
            title: "紫色",
            color: "#9000FF"
        }, {
            title: "红色",
            color: "#FF0000"
        } ],
        fontList: [],
        colorData: {
            //基础色相，即左侧色盘右上顶点的颜色，由右侧的色相条控制
            hueData: {
                colorStopRed: 255,
                colorStopGreen: 0,
                colorStopBlue: 0
            },
            //选择点的信息（左侧色盘上的小圆点，即你选择的颜色）
            pickerData: {
                x: 0,
                //选择点x轴偏移量
                y: 480,
                //选择点y轴偏移量
                red: 0,
                green: 0,
                blue: 0,
                hex: "#000000"
            },
            //色相控制条的位置
            barY: 0
        },
        rpxRatio: 1,
        //此值为你的屏幕CSS像素宽度/750，单位rpx实际像素
        iscanpaly: false,
        replay: false,
        //再次编辑是否可以播放
        isclick: false,
        //是否已经播放过
        isopen: "1",
        videoAdunit: null,
        globalAdunit: null,
        chaAdunit: null,
        istab: true
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
        var _this = this;
        var siteInfo = app.globalData.siteInfo;
        this.setData({
            isopen: app.globalData.isopen,
            chaAdunit: siteInfo.chaAdunit,
            globalAdunit: siteInfo.globalAdunit,
            videoAdunit: siteInfo.videoAdunit
        });
        // 版本检测
                try {
            const res = wx.getSystemInfoSync();
            if (res.version < "2.6.0") {
                _this.setData({
                    isopen: "0"
                });
            }
        } catch (e) {
            // Do something when catch error
        }
        if (typeof options.id == "undefined") {
            wx.showToast({
                title: "参数错误！",
                icon: "none",
                duration: 2e3,
                complete: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 2e3);
                }
            });
            return;
        }
        //设置rpxRatio
                wx.getSystemInfo({
            success(res) {
                _this.setData({
                    rpxRatio: res.screenWidth / 750
                });
            }
        });
        wx.createSelectorQuery().selectAll(".text").boundingClientRect(function(rect) {
            _this.setData({
                colortop: rect[0].height + 7
            });
        }).exec();
        if (typeof options.demoimage == "undefined") {
            options.demoimage = "";
        }
        this.setData({
            img_id: options.id,
            demoimage: options.demoimage
        });
        app.func.req2("Touxiang/GetFontFileList", {
            id: 0
        }, res => {
            _this.setData({
                fontList: res.data.data
            });
            _this.requestTouxiangInfo();
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function() {
        this.createRewardedVideoAd('dea576be2610beeca421b8c2faba699f');
    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function() {
        util.createInterstitialAd();
    },
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function() {
        var _this = this;
        app.func.req2("Touxiang/GetFontFileList", {
            id: 0
        }, res => {
            _this.setData({
                fontList: res.data.data
            });
            _this.requestTouxiangInfo();
        });
        //设置rpxRatio
                wx.getSystemInfo({
            success(res) {
                _this.setData({
                    rpxRatio: res.screenWidth / 750
                });
            }
        });
        wx.createSelectorQuery().selectAll(".text").boundingClientRect(function(rect) {
            _this.setData({
                colortop: rect[0].height + 7
            });
        }).exec();
    },
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function() {
        return {
            title: "[@你]这个姓氏头像制作工具很棒,推荐给你",
            imageUrl: "/images/share.jpeg",
            path: "/pages/images/list/index"
        };
    },
    handleInputBlur: function(e) {
        this.setData({
            font: this.data.font
        });
    },
    myInput: function(e) {
        if (!e.detail.detail.value.length <= this.data.defaultlenth) {
            this.setData({
                istab: true,
                font: e.detail.detail.value.substring(0, this.data.defaultlenth)
            });
            return;
        }
        this.setData({
            istab: true,
            font: e.detail.detail.value
        });
    },
    colorTab: function() {
        this.setData({
            hidden: !this.data.hidden
        });
    },
    //选择改色时触发（在左侧色盘触摸或者切换右侧色相条）
    onChangeColor(e) {
        //返回的信息在e.detail.colorData中
        this.setData({
            colorData: e.detail.colorData,
            color: e.detail.colorData.pickerData.hex,
            colorcousedis: 100
        });
    },
    fontTab: function(e) {
        console.log(e);
        this.setData({
            cousedis: e.target.dataset.id,
            fontid: e.target.dataset.fontid,
            scrollLeft: e.currentTarget.offsetLeft - (wx.getSystemInfoSync().windowWidth * .45 - 30)
        });
    },
    colornameTab: function(e) {
        this.setData({
            colorcousedis: e.target.dataset.id,
            color: e.target.dataset.color,
            scrollLeft_color: e.currentTarget.offsetLeft - (wx.getSystemInfoSync().windowWidth * .45 - 30),
            hidden: false
        });
    },
    closetab: function(e) {
        if (this.data.hidden) {
            this.setData({
                hidden: false
            });
        }
    },
    goTab: util.throttle(function(e) {
        var _this = this;
        if (_this.data.font == "") {
            wx.showToast({
                title: "请填入文字",
                icon: "none"
            });
            return;
        }
        if (_this.data.fontid == "") {
            wx.showToast({
                title: "请选择字体",
                icon: "none"
            });
            return;
        }
        if (!_this.data.istab) {
            _this.qushengcheng();
            return;
        }
        try {
            _api2.default.check_info({
                action: "msg_sec_check",
                content: _this.data.font
            }).then(function(res) {
                if (JSON.parse(res).errcode == 87014) {
                    _this.setData({
                        font: ""
                    });
                    wx.showModal({
                        content: "文字存在敏感信息",
                        showCancel: false
                    });
                } else {
                    _this.qushengcheng();
                }
                _this.data.istab = false;
            });
        } catch (e) {
            console.log(e);
        }
    }, 1e3),
    qushengcheng: function() {
        if (wx.createRewardedVideoAd && !this.isVideoAdError) {
            this.setData({
                isShowVideoDialog: true,
                videoContent: '观看视频广告，才能生成头像哦',
                confirmText: '确定',
                videoType: 'save'
            })
        } else {
            this._qushengcheng()
        }
    },
    _qushengcheng: function() {
        this.data.lists.font = this.data.font;
        this.data.lists.fontcolor = this.data.color;
        this.data.lists.filepath = this.data.fontid;

        wx.navigateTo({
            url: "/pages/convas/index?data=" + JSON.stringify(this.data.lists)
        });
        // if (!this.data.replay && this.data.isclick) {
        //     wx.navigateTo({
        //         url: "/pages/convas/index?data=" + JSON.stringify(this.data.lists)
        //     });
        // } else if (this.data.iscanpaly && this.data.isopen === "1") {
        //     this.playad("/pages/convas/index?data=" + JSON.stringify(this.data.lists));
        // } else {
        //     wx.navigateTo({
        //         url: "/pages/convas/index?data=" + JSON.stringify(this.data.lists)
        //     });
        // }
    },
    requestTouxiangInfo: function() {
        var _this = this;
        if (typeof _this.data.img_id == "undefined" && _this.data.img_id == "" && _this.data.img_id == null) {
            wx.showToast({
                title: "头像不存在",
                icon: "none",
                duration: 2e3,
                complete: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 2e3);
                }
            });
            return;
        }
        app.func.req2("Touxiang/GetTouxiangInfo", {
            id: _this.data.img_id
        }, res => {
            if (res.data.code == 202) {
                _this.setData({
                    lists: res.data.data[0]
                });
                _this.defauldData();
            }
            if (_this.data.lists.length == 0) {
                wx.showToast({
                    title: "头像不存在",
                    icon: "none",
                    duration: 2e3,
                    complete: function() {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 2e3);
                    }
                });
            }
        });
    },
    // 初始化数据
    defauldData: function() {
        var _this = this;
        this.data.fontList.forEach(function(v, i) {
            if (v.fileid == _this.data.lists.filepath) {
                _this.setData({
                    cousedis: i,
                    fontid: v.fileid,
                    toView: "fontid_" + i
                });
            }
        });
        // 默认颜色
                if (typeof _this.data.lists.fontcolor != "undefined" && _this.data.lists.fontcolor != null && _this.data.lists.fontcolor != "") {
            this.setData({
                colorList: [ {
                    title: "默认",
                    color: _this.data.lists.fontcolor
                } ].concat(_this.data.colorList),
                color: _this.data.lists.fontcolor,
                colorcousedis: 0,
                toView_color: "colorid_0"
            });
        }
        // 默认姓氏
                if (typeof _this.data.lists.font != "undefined" && _this.data.lists.font != null && _this.data.lists.font != "") {
            this.setData({
                font: _this.data.lists.font,
                defaultlenth: _this.data.lists.font.length,
                fonttishi: "请输入" + _this.data.lists.font.length + "个字"
            });
        }
        this.closetab();
    },
    // 播放广告
    playad: function(url) {
        var _this = this;
        wx.showModal({
            title: "提示",
            content: "观看完视频即可下载头像",
            success(res) {
                if (res.confirm) {
                    console.log("用户点击确定");
                    //加载激励视频
                                        videoAd.show().catch(err => _this.tonextpage(url, 1));
                    videoAd.onClose(status => {
                        if (status && status.isEnded || status === undefined) {
                            _this.tonextpage(url, 0);
                        } else {
                            // 播放中途退出，进行提示
                            console.log("用户没看完就关闭");
                            wx.showToast({
                                title: "等待广告结束关闭就可以提交啦",
                                icon: "none",
                                duration: 3e3
                            }), setTimeout(function() {
                                wx.hideToast();
                            }, 1500);
                        }
                    });
                } else if (res.cancel) {
                    console.log("用户点击取消");
                    wx.showToast({
                        title: "观看后才可以生成哦！",
                        icon: "none",
                        duration: 3e3
                    }), setTimeout(function() {
                        wx.hideToast();
                    }, 1500);
                }
            }
        });
    },
    tonextpage: function(url, iserr) {
        // 正常播放结束，下发奖励
        this.setData({
            isclick: true
        });
        var msg = iserr == 1 ? "广告拉取失败，跳转中..." : "谢谢观看！跳转中...";
        wx.showToast({
            title: msg,
            icon: "none",
            duration: 1e3
        }), setTimeout(function() {
            wx.hideToast();
            wx.navigateTo({
                url: url
            });
        }, 1e3);
    },
    // 返回
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    toCategroy: function() {
        wx.navigateTo({
            url: "/pages/category/index"
        });
    },
    backHome: function() {
        wx.navigateTo({
            url: "/pages/index"
        });
    },
    toFaxian: function() {
        wx.navigateTo({
            url: "/pages/faxian/index"
        });
    },
    viewRewardedVideoAd: function () {
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 3000
        });
        this.videoAd.show().then(() => wx.hideToast()).catch(err => {
          this.videoAd.load().then(() => this.videoAd.show().then(() => wx.hideToast())).catch(err => {
            wx.hideToast();
            this._qushengcheng();
          });
        });
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
          });
          if (!this.videoAd) this.isVideoAdError = true;
          this.videoAd.load();
    
          this.videoAd.onLoad(() => {
            console.log('videoAd_onLoad');
          });
    
          this.videoAd.onError(res => {
            console.log('videoAd_erro', res);
            this.isVideoAdError = true;
          });
    
          this.videoAd.onClose(status => {
            console.log('videoAd_status', status);
            if (status && status.isEnded || status === undefined) {
                this._qushengcheng();
            } else {
                this.setData({
                  isShowVideoDialog: true,
                  videoContent: '观看完整视频广告，才能生成头像哦',
                  confirmText: '继续观看'
                });
            }
          });
        }
    },
});