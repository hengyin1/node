//index.js
//获取应用实例
const app = getApp();

const tmparray = [];

const util = require("../../utils/util.js");

Page({
    data: {
        rooturl: app.rooturl,
        statusBarHeight: app.globalData.statusBarHeight,
        userInfo: {},
        hasUserInfo: true,
        // 轮播
        imagearray: [],
        images: {},
        //轮播默认高  
        banerindex: 0,
        // 宫格
        tabarray: [],
        // 每行宫格
        tabindexarray: [],
        tabindex: 3,
        // tabs
        current: "tab1",
        page: 1,
        num: 24,
        // list
        list: [],
        hidden: "none",
        // type=1banner，2激励视频，3插屏，4视频广告，5前贴视频，6格子广告 { 'id': 'adunit-73d1d15907495c41', 'status': '1', 'type': '1' },
        adlist: app.globalData.adlist,
        adrow: app.globalData.index_ad_row,
        maxrow: app.globalData.index_ad_max,
        videoAdunit: null,
        globalAdunit: null,
        chaAdunit: null
    },
    onLoad: function() {
        var siteInfo = app.globalData.siteInfo;
        var adlist = app.globalData;
        console.log(adlist);
        this.setData({
            adrow: app.globalData.index_ad_row,
            maxrow: app.globalData.index_ad_max,
            chaAdunit: siteInfo.chaAdunit,
            globalAdunit: siteInfo.globalAdunit,
            videoAdunit: siteInfo.videoAdunit
        });
        this.adindex(siteInfo.chaAdunit);
        this.requestTouxiangBannerInfo();
        this.requestTouxiangGonggeInfo();
        this.requestTouxiangInfo();
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        }
    },
    onReady: function() {
        console.log(app.globalData.siteInfo);
    },
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh");
        this.requestTouxiangBannerInfo();
        this.requestTouxiangGonggeInfo();
        this.requestTouxiangInfo();
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        }
    },
    onReachBottom: function() {
        console.log("上拉加载");
        if (this.data.num < 24) {
            wx.showToast({
                title: "已经最底了！",
                icon: "none",
                duration: 1e3,
                mask: true
            });
            return;
        }
        this.requestTouxiangInfo();
    },
    handleClickItem(e) {
        var key = e.target.dataset.key;
        if (key == this.data.current) return;
        this.setData({
            current: key,
            page: 1,
            list: []
        });
        this.requestTouxiangInfo();
    },
    imageLoad: function(e) {
        var $width = e.detail.width, //获取图片真实宽度
        $height = e.detail.height, ratio = $width / $height;
        //图片的真实宽高比例
                var viewWidth = 718, //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 718 / ratio;
        //计算的高度值
                var image = this.data.images;
        //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
                image[e.target.dataset.index] = {
            width: viewWidth,
            height: viewHeight
        };
        this.setData({
            images: image
        });
    },
    bindchange: function(e) {
        this.setData({
            banerindex: e.detail.current
        });
    },
    handleChangeScroll({detail: detail}) {
        this.setData({
            current_scroll: detail.key
        });
    },
    tabnum: function() {
        var res = Math.ceil(this.data.tabarray.length / this.data.tabindex);
        for (var i = 1; i <= res; i++) {
            tmparray[i - 1] = i * this.data.tabindex;
        }
        this.setData({
            tabindexarray: tmparray
        });
    },
    requestTouxiangBannerInfo: function() {
        var _this = this;
        app.func.req2("Touxiang/GetTouxiangBannerInfo", {}, res => {
            if (res.data.code == 202) {
                _this.setData({
                    imagearray: res.data.data
                });
            }
        });
    },
    requestTouxiangGonggeInfo: function() {
        var _this = this;
        app.func.req2("Touxiang/GetTouxiangGonggeInfo", {}, res => {
            if (res.data.code == 202) {
                _this.setData({
                    tabarray: res.data.data
                });
                _this.tabnum();
            }
        });
    },
    requestTouxiangInfo: function() {
        var _this = this;
        app.func.req2("Touxiang/GetTouxiangInfo", {
            tab: _this.data.current,
            page: _this.data.page
        }, res => {
            if (res.data.code == 202) {
                const ids = [376, 341, 304, 286, 278, 264, 263, 262, 261, 244, 214, 210, 209, 186, 147, 146, 145, 135, 133, 124, 123];
                const data = res.data.data.filter(item => !ids.includes(item.did));
                _this.setData({
                    list: _this.data.list.concat(data),
                    page: _this.data.page + 1,
                    num: data.length
                });
            }
            if (_this.data.list.length == 0) {
                _this.setData({
                    hidden: ""
                });
            } else {
                _this.setData({
                    hidden: "none"
                });
            }
        });
    },
    tabTo: util.throttle(function(e) {
        var url = e.target.dataset.url;
        var _this = this;
        wx.navigateTo({
            url: url,
            success: function(res) {
                _this.setData({
                    isrequester: 0
                });
            },
            fail: function(res) {
                console.log(res);
                _this.setData({
                    isrequester: 0
                });
            },
            complete: function(res) {
                console.log(res);
                _this.setData({
                    isrequester: 0
                });
            }
        });
    }, 1e3),
    goto(e) {
        wx.navigateTo({
            url: "/pages/images/detail/index?id=" + e.target.dataset.id + "&demoimage=" + e.target.dataset.demoimage
        });
    },
    // 返回
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function() {
        return {
            title: "[@你]我在做姓氏头像,推荐给你",
            imageUrl: "",
            path: "/pages/touxiang/index"
        };
    },
    adindex(chaAdunit) {
        // 在页面中定义插屏广告
        let interstitialAd = null;
        // 在页面onLoad回调事件中创建插屏广告实例
                if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: chaAdunit
            });
            interstitialAd.onLoad(() => {});
            interstitialAd.onError(err => {});
            interstitialAd.onClose(() => {});
        }
        // 在适合的场景显示插屏广告
                if (interstitialAd) {
            interstitialAd.show().catch(err => {
                console.error(err);
            });
        }
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
    }
});