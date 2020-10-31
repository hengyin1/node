// pages/convas/index.js
const app = getApp();

Page({
    /**
   * 页面的初始数据font=%E9%B9%8F&fontsize=40&fontcolor=ff0303&fontleft=155&fonttop=335&fontangle=0&filepath=7&bgimage=115&fontpostion=5&line=1
   */
    data: {
        defaultWidth: 200,
        rooturl: app.rooturl,
        statusBarHeight: app.globalData.statusBarHeight,
        imgurl: "",
        globalAdunit: null
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
        this.requestTouxiangIndex(JSON.parse(options.data));
        var siteInfo = app.globalData.siteInfo;
        this.setData({
            globalAdunit: siteInfo.globalAdunit
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function() {},
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
        this.requestTouxiangIndex(JSON.parse(options.data));
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
            imageUrl: this.data.imgurl,
            path: "/pages/images/list/index"
        };
    },
    //点击保存图片
    save() {
        if (this.data.imgurl == "") {
            wx.showToast({
                title: "图片不能空",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        let that = this;
        //若二维码未加载完毕，加个动画提高用户体验
                wx.showToast({
            icon: "loading",
            title: "正在保存图片",
            duration: 1e3
        });
        //判断用户是否授权"保存到相册"
                wx.getSetting({
            success(res) {
                //没有权限，发起授权
                if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success() {
                            //用户允许授权，保存图片到相册
                            that.savePhoto();
                        },
                        fail() {
                            //用户点击拒绝授权，跳转到设置页，引导用户授权
                            wx.openSetting({
                                success() {
                                    wx.authorize({
                                        scope: "scope.writePhotosAlbum",
                                        success() {
                                            that.savePhoto();
                                        },
                                        fail() {
                                            //这里是用户拒绝授权后的回调
                                            wx.hideLoading();
                                            that.setData({
                                                isShowToast: true,
                                                textToast: "需要授权相册保存图片"
                                            });
                                        }
                                    });
                                },
                                fail() {
                                    //再次唤醒进来
                                    wx.hideLoading();
                                    that.setData({
                                        isShowToast: true,
                                        textToast: "需要授权相册保存图片"
                                    });
                                }
                            });
                        }
                    });
                } else {
                    //用户已授权，保存到相册
                    that.savePhoto();
                }
            }
        });
    },
    handleSetting: function(e) {
        let that = this;
        that.setData({
            isShowToast: false
        });
        // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
                if (!e.detail.authSetting["scope.writePhotosAlbum"]) {
            wx.showModal({
                title: "提示",
                content: "若不打开授权，则无法将图片保存在相册中！",
                showCancel: false
            });
            that.setData({
                isShowToast: false
            });
        } else {
            wx.showModal({
                title: "提示",
                content: "您已授权，赶紧将图片保存在相册中吧！",
                showCancel: false,
                success(res) {
                    that.save();
                }
            });
        }
    },
    //保存图片到相册，提示保存成功
    savePhoto() {
        let that = this;
        console.log(that.data.imgurl);
        wx.downloadFile({
            url: that.data.imgurl,
            success: function(res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(res) {
                console.log(res);
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    // 返回
    back_2: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    requestTouxiangIndex: function(e) {
        var _this = this;
        e.issave = 1;
        app.func.req2("Getcanvas/yulan", e, res => {
            console.log(res);
            if (res.data.code == 202) {
                _this.setData({
                    imgurl: _this.data.rooturl + res.data.data
                });
                console.log(_this.data.imgurl);
            } else {
                wx.showToast({
                    title: "生成失败",
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
    }
});