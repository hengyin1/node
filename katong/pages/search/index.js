getApp();

Page({
    data: {
        recentSearch: [],
        searchValue: ""
    },
    onLoad: function(e) {},
    onShow: function() {
        this.getRecentSearch();
    },
    getRecentSearch: function() {
        var e = wx.getStorageSync("recentSearch");
        this.setData({
            recentSearch: e
        });
    },
    getSearchContent: function(e) {
        this.data.searchValue = e.detail.value;
    },
    search: function() {
        if (this.data.searchValue) {
            var e = wx.getStorageSync("recentSearch") || [];
            e.unshift(this.data.searchValue), wx.setStorageSync("recentSearch", e), wx.navigateTo({
                url: "../category/list?search=" + this.data.searchValue
            });
        }
    },
    clearSearch: function() {
        wx.removeStorageSync("recentSearch"), this.getRecentSearch();
    },
    goSearch: function(e) {
        wx.navigateTo({
            url: "../category/list?search=" + e.target.dataset.text
        });
    }
});