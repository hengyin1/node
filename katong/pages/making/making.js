var e = getApp(), t = require("../../utils/config"), a = null;

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
        none: "none",
        display: "",
        title: "温柔浪漫夏日祭",
        name: "盛夏光年",
        img_filter: "img-filter",
        poster: "none"
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    pixelRatio: e.pixelRatio,
                    windowHeight: e.windowHeight,
                    windowWidth: e.windowWidth
                });
            }
        });
        var n = this;
        var i = e.result_image;
        wx.setStorage({
            key: "result_image",
            data: i
        });
        var o = wx.getStorageSync("userImage"), s = wx.getStorageSync("key");
        if ("" == (r = wx.getStorageSync("cate"))) var r = 13;
        n.getNav(r), n.getList(r), n.setData({
            userImage: i,
            uploadImage: "https://image.faxingwu.com/" + o,
            key: s,
            display: "none"
        }), wx.createRewardedVideoAd && (a = wx.createRewardedVideoAd({
            adUnitId: "adunit-1a9a95904a8343c6"
        }));
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
        var a = this, n = wx.getStorageSync("uid");
        wx.request({
            url: t.API_HOST + "/huihua/index/get-image",
            data: {
                cate: e,
                uid: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                101 == e.data.code ? a.setData({
                    list: e.data.list
                }) : wx.showToast({
                    title: e.data.msg,
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    changeImage: function(e) {
        var a = this, n = e.currentTarget.dataset.type, i = wx.getStorageSync("uid"), o = wx.getStorageSync("image_id");
        if (1 == n) s = "none"; else var s = "";
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
                            a.makeInfo(o, i)

                            // wx.hideLoading();
                            // var c = r.data[0];
                            // wx.showLoading({
                            //     title: "图片检测中..."
                            // }), wx.request({
                            //     url: t.API_HOST + "/huihua/index/tencent-check",
                            //     data: {
                            //         image: c
                            //     },
                            //     method: "POST",
                            //     header: {
                            //         "Content-Type": "application/x-www-form-urlencoded"
                            //     },
                            //     success: function(t) {
                            //         wx.hideLoading(), "检测成功" == e.data.msg ? (wx.setStorageSync("userImage", c), a.setData({
                            //             display: "",
                            //             none: s,
                            //             uploadImage: "https://image.faxingwu.com/" + c
                            //         }), a.makeInfo(o, i)) : wx.showToast({
                            //             title: t.data.msg,
                            //             icon: "none",
                            //             duration: 1e3
                            //         });
                            //     }
                            // });
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
    choose: function(t) {
        var a = this, n = t.currentTarget.dataset.id, i = t.currentTarget.dataset.key, o = wx.getStorageSync("user_id");
        a.setData({
            key: i
        }), wx.setStorage({
            key: "image_id",
            data: n
        }), wx.getSystemInfo({
            success: function(t) {
                console.log(t.platform), "ios" == t.platform ? (a.makeInfo(n, o), a.setData({
                    display: "",
                    none: "none"
                })) : e._get("user.index/detail", {}, function(e) {
                    1 == e.data.userInfo.vip ? (a.makeInfo(n, o), a.setData({
                        display: ""
                    })) : (wx.showToast({
                        title: "素材需要开通VIP解锁",
                        icon: "none",
                        duration: 1e3
                    }), a.setData({
                        none: ""
                    }));
                });
            }
        });
    },
    saveImage: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(n) {
                "ios" == n.platform && a ? (a.show().catch(function() {
                    a.load().then(function() {
                        return a.show();
                    }).catch(function(e) {
                        console.log("视频广告显示失败");
                    });
                }), a.onClose(function(a) {
                    a && a.isEnded ? t.saveImageDow(e) : wx.showToast({
                        title: "视频未播放完毕，不可保存",
                        icon: "none",
                        duration: 2e3
                    });
                })) : t.saveImageDow(e);
            }
        });
    },
    saveImageDow: function(e) {
        wx.showLoading({
            title: "图片保存中..."
        });
        var a = this, n = e.currentTarget.dataset.image;
        console.log(112), console.log(n);
        var i = wx.getStorageSync("user_id");
        console.log(i), "" != n ? wx.request({
            url: t.API_HOST + "/huihua/image/check-is-water",
            data: {
                uid: i,
                result_image: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (console.log(e.data), 101 == e.data.code) t = e.data.saveImage, a.saveResult(t); else {
                    var t = n;
                    a.saveResult(t);
                }
            }
        }) : wx.showToast({
            title: "图片绘制失败，不可保存",
            icon: "none",
            duration: 2e3
        });
    },
    saveResult: function(e) {
        wx.getImageInfo({
            src: e,
            success: function(e) {
                var t = e.path;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "图片保存成功",
                            icon: "success",
                            duration: 2e3
                        }), wx.navigateTo({
                            url: "/pages/share/share"
                        });
                    },
                    complete: function(e) {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    makeInfo: function(e, a) {
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
                    wx.setStorage({
                        key: "result_image",
                        data: t
                    }), wx.hideLoading(), n.setData({
                        userImage: t,
                        display: "none"
                    });
                } else wx.showToast({
                    title: "图片识别失败,请重新上传",
                    icon: "none",
                    duration: 1e3
                }), n.setData({
                    display: "none"
                });
            }
        });
    },
    switchTab: function(e) {
        var t = e.detail.current, a = this.data.windowWidth / 6;
        this.setData({
            currentTab: t,
            navScrollLeft: (t - 3) * a
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "火爆全网的变脸神器，你的脸在漫画中是什么样子？一键制作漫画头像",
            path: "/pages/index/index",
            imageUrl: t,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});