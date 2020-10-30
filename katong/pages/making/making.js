import { stylelist } from '../../utils/localdata'
const t = require("../../utils/config");
const util = require("../../utils/util");

Page({
    data: {
        navData: [ {
            text: "盛夏光年"
        }, {
            text: "秘密花园"
        }, {
            text: "国风雅韵"
        }, {
            text: "白皙无暇"
        }, {
            text: "梦幻迷离"
        } ],
        currentTab: 0,
        navScrollLeft: 0,
        title: "温柔浪漫夏日祭",
        name: "盛夏光年"
    },
    onLoad: function(options) {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })
       
        const userImage = wx.getStorageSync("userImage");
        const key =  wx.getStorageSync("key");
        const cate =  wx.getStorageSync("cate") || 13;
        this.getNav(cate);
        this.getList(cate);
        this.setData({
            userImage: options.result_image,
            uploadImage: "https://image.faxingwu.com/" + userImage,
            key: key
        })
    },
    onShow: function () {
        util.createInterstitialAd();
    },
    getNav: function(e) {
        13 == e && this.setData({
            currentTab: 0
        }), 11 == e && this.setData({
            currentTab: 1
        }), 7 == e && this.setData({
            currentTab: 2
        }), 5 == e && this.setData({
            currentTab: 3
        }), 3 == e && this.setData({
            currentTab: 4
        });
    },
    switchNav: function(e) {
        var t = e.currentTarget.dataset.current, a = this.data.windowWidth / 5;
        if (this.setData({
            navScrollLeft: (t - 3) * a
        }), this.data.currentTab == t) return !1;
        this.setData({
            currentTab: t,
            key: 1e4
        });
        var n = e.currentTarget.dataset.current;
        if (0 == n && (i = 13, this.setData({
            title: "温柔浪漫夏日祭",
            name: "盛夏光年"
        })), 1 == n && (i = 11, this.setData({
            title: "虚幻缥缈的世界",
            name: "秘密花园"
        })), 2 == n && (i = 7, this.setData({
            title: "水墨丹青中国风",
            name: "国风韵雅"
        })), 3 == n && (i = 5, this.setData({
            title: "清新唯美牛奶肌",
            name: "白皙无暇  "
        })), 4 == n) {
            var i = 3;
            this.setData({
                title: "镜花水月琉璃梦",
                name: "梦幻迷离"
            });
        }
        this.getList(i);
    },
    getList: function(e) {
        const key = 'cat_' + e;
        const list = stylelist[key];
        this.setData({
            list: list
        })
        // var a = this, n = wx.getStorageSync("uid");
        // wx.request({
        //     url: t.API_HOST + "/huihua/index/get-image",
        //     data: {
        //         cate: e,
        //         uid: n
        //     },
        //     method: "POST",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     success: function(e) {
        //         101 == e.data.code ? a.setData({
        //             list: e.data.list
        //         }) : wx.showToast({
        //             title: e.data.msg,
        //             icon: "none",
        //             duration: 1e3
        //         });
        //     }
        // });
    },
    changeImage: function() {
        var a = this, i = wx.getStorageSync("uid"), o = wx.getStorageSync("image_id");
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var n = e.tempFilePaths[0];
                wx.showLoading({
                    title: "图片上传中..."
                }), wx.uploadFile({
                    url: "https://imgapi.faxingwu.com/api/upload",
                    filePath: n,
                    name: "image",
                    formData: {
                        image: n,
                        type: 1,
                        proname: "manhua"
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        var n = e.data, r = JSON.parse(n);
                        if (101 == r.code) {
                            wx.hideLoading();
                            var c = r.data[0];
                    
                            wx.showLoading({
                                title: "图片检测中..."
                            }), wx.request({
                                url: t.API_HOST + "/huihua/index/tencent-check",
                                data: {
                                    image: c
                                },
                                method: "POST",
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: function(t) {
                                    wx.hideLoading(), "检测成功" == t.data.msg ? (wx.setStorageSync("userImage", c), a.setData({
                                        uploadImage: "https://image.faxingwu.com/" + c
                                    }), a.makeInfo(o, i)) : wx.showToast({
                                        title: t.data.msg,
                                        icon: "none",
                                        duration: 1e3
                                    });
                                }
                            });
                        } else wx.showToast({
                            title: "图片上传失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    choose: function(e) {
        this._choose(e);
        // if (wx.createRewardedVideoAd && !this.isVideoAdError) {
        //     this.choose_event = e;
        //     this.viewRewardedVideoAd();
        // } else {
        //     this._choose(e);
        // }
    },
    _choose: function(t) {
        var a = this, n = t.currentTarget.dataset.id, i = t.currentTarget.dataset.key, o = wx.getStorageSync("user_id");
        a.setData({
            key: i
        }), wx.setStorage({
            key: "image_id",
            data: n
        }), a.makeInfo(n, o)
    },
    saveImage: function() {
        this.saveResult()
        // if (wx.createRewardedVideoAd && !this.isVideoAdError) {
        //     this.setData({
        //         isShowVideoDialog: true,
        //         videoContent: '观看视频广告，才能保存头像哦',
        //         confirmText: '确定',
        //         videoType: 'save'
        //     })
        // } else {
        //     this.saveResult()
        // }
    },
    saveResult: function() {
        wx.showLoading({
            title: "图片保存中..."
        });
        wx.getImageInfo({
            src: this.data.userImage,
            success: function(e) {
                var t = e.path;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "图片保存成功",
                            icon: "success",
                            duration: 2e3
                        })
                        setTimeout(() => {
                            util.createInterstitialAd();
                        }, 1500)
                    },
                    complete: function(e) {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    makeInfo: function(e, a) {
        wx.showLoading({
            title: "图片绘制中..."
        })
        var n = this;
        if ("" == a) var a = 0;
        var i = wx.getStorageSync("userImage");
        wx.request({
            url: t.API_HOST + "/huihua/result/new-create-image",
            data: {
                uid: a,
                image: i,
                image_id: e
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (101 == e.data.code) {
                    var t = e.data.result_img;
                    wx.hideLoading(), n.setData({
                        userImage: t
                    });
                } else wx.showToast({
                    title: "图片识别失败,请重新上传",
                    icon: "none",
                    duration: 1e3
                });
            }
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
          if (!this.videoAd) this.isVideoAdError = true;

          this.videoAd = wx.createRewardedVideoAd({
            adUnitId: adUnitId
          });
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
                if (this.data.videoType == 'save') {
                    this.saveResult();
                } else {
                    this._choose(this.choose_event);
                    const index = this.choose_event.currentTarget.dataset.key
                    this.setData({
                        [`list[${index}].vip`]: 0
                    })
                }
            } else {
                if (this.data.videoType == 'save') {
                    this.setData({
                      isShowVideoDialog: true,
                      videoContent: '观看完整视频广告，才能保存头像哦',
                      confirmText: '继续观看'
                    });
                } else {
                    this.setData({
                      isShowVideoDialog: true,
                      videoContent: '观看完整视频广告，才能使用该风格哦',
                      confirmText: '继续观看'
                    });
                }
            }
          });
        }
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
            this.saveResult();
          });
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一键制作卡通头像",
            path: "/pages/index/index",
            imageUrl: this.dat.userImage
        };
    }
});