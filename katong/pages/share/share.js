getApp();

var e = require("../../utils/config");

Page({
    data: {
        poster: "none"
    },
    onLoad: function(e) {
        var t = this, o = wx.getStorageSync("result_image");
        console.log(o), t.setData({
            result_image: o
        }), wx.showToast({
            title: "图片保存成功",
            icon: "none",
            duration: 1e3
        });
    },
    makePoster: function(t) {
        var o = this, n = t.currentTarget.dataset.image;
        console.log(n), wx.showLoading({
            title: "海报生成中..."
        }), wx.request({
            url: e.API_HOST + "/huihua/image/make-new-poster",
            data: {
                image: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (console.log(e.data), 101 == e.data.code) {
                    var t = e.data.poster;
                    o.setData({
                        posterImg: t,
                        poster: ""
                    }), o.savePoster(t), wx.hideLoading();
                } else wx.showToast({
                    title: "海报生成失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    hiddenPoster: function() {
        this.setData({
            poster: "none"
        });
    },
    savePoster: function(e) {
        wx.getImageInfo({
            src: e,
            success: function(e) {
                var t = e.path;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(e) {},
                    fail: function(e) {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        if ("button" === e.from) {
            if (console.log(e.target.dataset.image), "" == (t = e.target.dataset.image)) var t = "../../images/share.jpg";
            return {
                title: "火爆全网的变脸神器，你的脸在漫画中是什么样子？一键制作漫画头像",
                path: "/pages/index/index",
                imageUrl: t,
                success: function(e) {},
                fail: function(e) {}
            };
        }
        return {
            title: "火爆全网的变脸神器，你的脸在漫画中是什么样子？一键制作漫画头像",
            path: "/pages/index/index",
            imageUrl: "../../images/share.jpg",
            success: function(e) {},
            fail: function(e) {}
        };
    }
});