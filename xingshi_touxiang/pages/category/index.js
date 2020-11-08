// pages/category/index.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        rooturl: app.rooturl,
        statusBarHeight: app.globalData.statusBarHeight,
        list: [],
        index: 0,
        //默认全部
        page: 1,
        //当前页码
        num: 24,
        //默认一次取24条
        catid: 0,
        //当前要请求的分类id
        // list
        lists: [],
        f: 0,
        // type=1banner，2激励视频，3插屏，4视频广告，5前贴视频，6格子广告
        adlist: null,
        adrow: 4,
        maxrow: 1
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
        this.setData({
            boxheight: wx.getSystemInfoSync().windowWidth * .31,
            adlist: app.globalData.adlist,
            adrow: app.globalData.list_ad_row,
            maxrow: app.globalData.list_ad_max
        });
        console.log(options);
        if (typeof options.id != "undefined" && options.id != null && options.id != "") {
            this.setData({
                catid: options.id,
                f: 1
            });
            this.requestTouxiangCateInfo();
        } else {
            this.requestTouxiangCateInfo();
        }
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function() {},
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
    onPullDownRefresh: function(e) {
        this.requestTouxiangCateInfo();
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
    onPageScroll: function(e) {// 获取滚动条当前位置
    },
    // 点击切换
    onTabsChange(e) {
        const {index: index} = e.detail;
        // 当前项
                const item = this.data.list[index];
        this.setData({
            index: index
        });
    },
    // 滑动
    onSwitchTab(e) {
        console.log(e);
        if (this.data.f == 1) {
            this.setData({
                f: 0
            });
            return;
        }
        const {current: index} = e.detail;
        const item = this.data.list[index];
        this.setData({
            index: index
        });
        this.setData({
            catid: item.id,
            page: 1,
            lists: [],
            num: 24
        });
        this.requestTouxiangInfo();
    },
    // swiper触底
    bindscrolltolower: function(e) {
        console.log("触底", this.data.num);
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
    goto(e) {
        console.log(e.target.dataset.id);
        wx.navigateTo({
            url: "/pages/images/detail/index?id=" + e.target.dataset.id + "&demoimage=" + e.target.dataset.demoimage
        });
    },
    requestTouxiangCateInfo: function() {
        var _this = this;
        app.func.req2("Touxiang/GetTouxiangCateInfo", {}, res => {
            if (res.data.code == 202) {
                var num = 0;
                res.data.data.forEach(function(c) {
                    num += c.num;
                });
                _this.setData({
                    list: [ {
                        num: num,
                        id: 0,
                        title: "全部"
                    } ].concat(res.data.data)
                });
                _this.data.list.forEach(function(v, i) {
                    if (_this.data.catid > 0 && v.id == _this.data.catid) {
                        _this.setData({
                            index: i
                        });
                    }
                });
                console.log("正常");
                _this.requestTouxiangInfo();
            }
        });
    },
    requestTouxiangInfo: function() {
        var _this = this;
        app.func.req2("Touxiang/GetTouxiangInfo", {
            catid: _this.data.catid,
            page: _this.data.page
        }, res => {
            if (res.data.code == 202) {
                const ids = [376, 341, 304, 286, 278, 264, 263, 262, 261, 244, 214, 210, 209, 186, 147, 146, 145, 135, 133, 124, 123];
                const data = res.data.data.filter(item => !ids.includes(item.did));
                _this.setData({
                    lists: _this.data.lists.concat(data),
                    page: _this.data.page + 1,
                    num: data.length
                });
                console.log(_this.data.lists);
            }
            if (_this.data.lists.length == 0) {
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
    // 返回
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});