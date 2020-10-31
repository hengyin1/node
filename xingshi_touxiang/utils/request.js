//封装接口post  from表单类型
let appid = "wxe1f5b6685a2b7a52";

function way1(url, data, cb) {
    wx.showLoading({
        title: "加载中"
    });
    //加载动画  
        wx.request({
        url: "https://touxiang.pptmb360.cn/api/" + url,
        //域名 （据情况而定）  url为地址
        data: data,
        //所需要传的参数
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            // 处理form表单的请求头
            "cache-control": "no-cache"
        },
        method: "POST",
        //方式为post
        dataType: "json",
        responseType: "text",
        success: function(res) {
            // 请求成功后
            wx.hideLoading();
            //请求成功后加载动画结束
                        return typeof cb == "function" && cb(res);
            // 用来判断返回的是否是函数
                },
        fail: function(res) {
            //请求失败
            wx.hideLoading();
            wx.showModal({
                title: "网络错误",
                content: "网络出错，请刷新重试",
                showCancel: false
            });
            return typeof cb == "function" && cb(false);
        }
    });
}

//封装接口post    json类型
function way2(url, data, cb) {
    wx.showLoading({});
    if (typeof data !== "object") {
        wx.hideLoading();
        console.log("参数错误");
    }
    var data = getToken(data);
    wx.request({
        url: "https://touxiang.pptmb360.cn/api/" + url,
        data: data,
        header: {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res);
        },
        fail: function(res) {
            wx.hideLoading();
            wx.showModal({
                title: "网络错误",
                content: "网络出错，请刷新重试",
                showCancel: false
            });
            return typeof cb == "function" && cb(false);
        }
    });
}

//封装接口get 基本都是json类型的
function way3(url, data, cb) {
    wx.showLoading({});
    wx.request({
        url: "https://touxiang.pptmb360.cn/api/" + url,
        data: data,
        header: {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res);
        },
        fail: function(res) {
            wx.hideLoading();
            wx.showModal({
                title: "网络错误",
                content: "网络出错，请刷新重试",
                showCancel: false
            });
            return typeof cb == "function" && cb(false);
        }
    });
}

// 生成token
function getToken(data) {
    var md5 = require("md5.js");
    var time = timest();
    data["time"] = time;
    data["form"] = appid;
    var str = "";
    for (var key in data) {
        str += md5.hexMD5(data[key].toString());
    }
    var token = md5.hexMD5(("api_" + str + "_api").toString());
    //生成的token
        data["token"] = token.toLowerCase();
    return data;
}

/**
 * 时间戳转时间(10位时间戳)
 * @param time
 * @return
 */
//从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
function timest() {
    var tmp = Date.parse(new Date()).toString();
    tmp = tmp.substr(0, 10);
    return tmp;
}

//将方法暴露
module.exports = {
    method1: way1,
    method2: way2,
    method3: way3
};