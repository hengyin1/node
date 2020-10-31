Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _md = require("./../npm/md5/md5.js");

var _md2 = _interopRequireDefault(_md);

var _siteinfo = require("./../siteinfo.js");

var _siteinfo2 = _interopRequireDefault(_siteinfo);

var _api = require("./../api/index.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function(value) {
                        step("next", value);
                    }, function(err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Index = function() {
    function Index() {
        _classCallCheck(this, Index);
    }
    _createClass(Index, null, [ {
        key: "switchTab",
        // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        value: function switchTab(url) {
            return new Promise(function(resolve, reject) {
                wx.switchTab({
                    url: url,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 关闭所有页面，打开到应用内的某个页面
        }, {
        key: "reLaunch",
        value: function reLaunch(url) {
            return new Promise(function(resolve, reject) {
                wx.reLaunch({
                    url: url,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 关闭当前页面，跳转到应用内的某个页面
        }, {
        key: "redirectTo",
        value: function redirectTo(url) {
            return new Promise(function(resolve, reject) {
                wx.redirectTo({
                    url: url,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 保留当前页面，跳转到应用内的某个页面
        }, {
        key: "navigateTo",
        value: function navigateTo(url) {
            return new Promise(function(resolve, reject) {
                wx.navigateTo({
                    url: url,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 关闭当前页面，返回上一页面或多级页面
        }, {
        key: "navigateBack",
        value: function navigateBack() {
            var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            return new Promise(function(resolve, reject) {
                wx.navigateBack({
                    delta: delta,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 显示成功消息提示框
        }, {
        key: "showToastSuccess",
        value: function showToastSuccess() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e3;
            wx.showToast({
                title: title,
                icon: "success",
                mask: true
            });
            if (duration > 0) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve();
                    }, duration);
                });
            }
        }
        // 显示无icon消息提示框
        }, {
        key: "showToastNone",
        value: function showToastNone() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e3;
            wx.showToast({
                title: title,
                icon: "none",
                mask: true
            });
            if (duration > 0) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve();
                    }, duration);
                });
            }
        }
        // 显示模态对话框
        }, {
        key: "showModal",
        value: function showModal() {
            var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "系统提示";
            return new Promise(function(resolve, reject) {
                wx.showModal({
                    title: title,
                    content: content,
                    showCancel: false,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 显示确定对话框
        }, {
        key: "showConfirm",
        value: function showConfirm() {
            var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "系统提示";
            return new Promise(function(resolve, reject) {
                wx.showModal({
                    title: title,
                    content: content,
                    showCancel: true,
                    success: function success(res) {
                        if (res.confirm) {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 显示Loading
        }, {
        key: "showLoading",
        value: function showLoading() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中...";
            if (this.isLoading) {
                return false;
            }
            this.isLoading = true;
            wx.showLoading({
                title: title,
                mask: true
            });
        }
        // 关闭Loading
        }, {
        key: "hideLoading",
        value: function hideLoading() {
            this.isLoading = false;
            wx.hideLoading();
        }
        // 设置Loading
        }, {
        key: "setLoading",
        value: function setLoading() {
            this.isLoading = true;
        }
        // 设置缓存
        }, {
        key: "setStorageSync",
        value: function setStorageSync(cacheKey, cacheData) {
            var cacheTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            return new Promise(function(resolve, reject) {
                try {
                    var timestamp = Date.parse(new Date());
                    if (cacheTime > 0) {
                        cacheData = {
                            data: cacheData,
                            expire: timestamp + cacheTime * 1e3
                        };
                    }
                    wx.setStorageSync(cacheKey, cacheData);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            });
        }
        // 删除缓存
        }, {
        key: "removeStorageSync",
        value: function removeStorageSync(key) {
            return new Promise(function(resolve, reject) {
                try {
                    wx.removeStorageSync(key);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            });
        }
        // 获取缓存
        }, {
        key: "getStorageSync",
        value: function getStorageSync(key) {
            try {
                var cacheData = wx.getStorageSync(key);
                // 判断是否有缓存时间
                                if (cacheData.hasOwnProperty("expire") && cacheData.hasOwnProperty("data")) {
                    // 判断是否过期
                    var timestamp = Date.parse(new Date());
                    if (cacheData.expire <= timestamp) {
                        // 删除缓存
                        this.removeStorageSync(key);
                        return null;
                    }
                    // 返回缓存数据
                                        return cacheData.data;
                }
                return cacheData;
            } catch (e) {
                return null;
            }
        }
        // 支付
        }, {
        key: "requestPayment",
        value: function requestPayment(res) {
            return new Promise(function(resolve, reject) {
                wx.requestPayment({
                    timeStamp: res.timeStamp,
                    nonceStr: res.nonceStr,
                    package: res.package,
                    signType: res.signType,
                    paySign: res.paySign,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 查看图片
        }, {
        key: "previewImage",
        value: function previewImage(detail) {
            wx.previewImage({
                current: detail,
                urls: [ detail ]
            });
        }
        // 保存图片
        }, {
        key: "saveImageToPhotosAlbum",
        value: function saveImageToPhotosAlbum(filePath) {
            return new Promise(function(resolve, reject) {
                wx.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success: function success(res) {
                        resolve(res);
                    },
                    fail: function fail(res) {
                        reject(res);
                    }
                });
            });
        }
        // 判断是否有权限
        }, {
        key: "setUserAuthScopes",
        value: function setUserAuthScopes(key) {
            return new Promise(function(resolve, reject) {
                wx.getSetting({
                    success: function success(res) {
                        var authSetting = res.authSetting;
                        if (authSetting[key]) {
                            resolve();
                        } else {
                            if (0 == authSetting[key]) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: "需要打开微信相关设置",
                                    success: function success(e) {
                                        e.confirm && wx.openSetting();
                                    }
                                });
                            } else {
                                resolve();
                            }
                        }
                    },
                    fail: function fail(res) {
                        reject();
                    }
                });
            });
        }
        // 下载文件
        }, {
        key: "downloadFile",
        value: function downloadFile(imageUrl) {
            return new Promise(function(resolve, reject) {
                if (/^http/.test(imageUrl) && !new RegExp(wx.env.USER_DATA_PATH).test(imageUrl) && !new RegExp("http://tmp").test(imageUrl)) {
                    wx.downloadFile({
                        url: imageUrl,
                        success: function success(res) {
                            resolve(res.tempFilePath);
                        },
                        fail: function fail(res) {
                            reject(res);
                        }
                    });
                } else {
                    resolve(imageUrl);
                }
            });
        }
        // Base64 转换路径
        }, {
        key: "base64src",
        value: function base64src(base64data) {
            var file_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "file_name";
            var fsm = wx.getFileSystemManager();
            var FILE_BASE_NAME = file_name;
            return new Promise(function(resolve, reject) {
                var _ref = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [], _ref2 = _slicedToArray(_ref, 3), format = _ref2[1], bodyData = _ref2[2];
                if (!format) {
                    reject("不是Base64数据");
                }
                var filePath = wx.env.USER_DATA_PATH + "/" + FILE_BASE_NAME + "." + format;
                var buffer = wx.base64ToArrayBuffer(bodyData);
                fsm.writeFile({
                    filePath: filePath,
                    data: buffer,
                    encoding: "binary",
                    success: function success(res) {
                        resolve(filePath);
                    },
                    fail: function fail(res) {
                        reject("ERROR_BASE64SRC_WRITE");
                    }
                });
            });
        }
        // 检测是否登录
        }, {
        key: "checkLogin",
        value: function checkLogin() {
            var _this = this;
            return new Promise(function(resolve, reject) {
                var userId = _this.getStorageSync("userId");
                if (userId) {
                    resolve(userId);
                } else {
                    _this.navigateTo("/pages/user/login");
                }
            });
        }
        // 其他请求
        }, {
        key: "otherRequest",
        value: function() {
            var _ref3 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee(url, data) {
                var cacheTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
                var cacheKey, _cacheData, responds, cacheData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            this.showLoading();
                            cacheKey = (0, _md2.default)(url + JSON.stringify(data));
                            if (!(cacheTime > 0)) {
                                _context.next = 7;
                                break;
                            }
                            _cacheData = this.getStorageSync(cacheKey);
                            // 有缓存数据
                                                        if (!_cacheData) {
                                _context.next = 7;
                                break;
                            }
                            this.hideLoading();
                            return _context.abrupt("return", _cacheData);

                          case 7:
                            _context.next = 9;
                            return _wepy2.default.request({
                                url: url,
                                data: data ? data : {},
                                method: method,
                                header: {
                                    "content-type": "application/x-www-form-urlencoded",
                                    deviceinfo: "CH=1&Height=640&Lang=zh_CN&Model=VKY-AL00&Net=unknown&PID=1&PixelRatio=3&SignatureStamp=1551661086367&Ver=6&Version=7.0.3&Width=360&SignatureMD5=81e4974661f3143829d95066f31ef021"
                                }
                            });

                          case 9:
                            responds = _context.sent;
                            // 隐藏Loading
                                                        this.hideLoading();
                            // 判断请求状态码
                                                        if (!(responds.statusCode !== 200)) {
                                _context.next = 13;
                                break;
                            }
                            throw "网络错误代码：" + responds.statusCode;

                          case 13:
                            // 获取数据
                            cacheData = responds.data.Data;
                            // 缓存请求数据
                                                        if (cacheTime > 0 && cacheData.length > 0) {
                                // 缓存数据
                                this.setStorageSync(cacheKey, cacheData, cacheTime);
                            }
                            return _context.abrupt("return", cacheData);

                          case 16:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function otherRequest(_x15, _x16) {
                return _ref3.apply(this, arguments);
            }
            return otherRequest;
        }()
    }, {
        key: "request",
        value: function() {
            var _ref4 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee2(action, data) {
                var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var cacheTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
                var method = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "GET";
                var url, actionParameter, sessionid, cacheKey, _cacheData2, responds, cacheData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            url = _siteinfo2.default.siteroot + "?i=" + _siteinfo2.default.uniacid + "&t=" + _siteinfo2.default.multiid + "&v=" + _siteinfo2.default.version + "&from=wxapp&version=1.0.3";
                            actionParameter = action.split("/");
                            if (actionParameter[0]) {
                                url += "&c=" + actionParameter[0];
                            }
                            if (actionParameter[1]) {
                                url += "&a=" + actionParameter[1];
                            }
                            if (actionParameter[2]) {
                                url += "&do=" + actionParameter[2];
                            }
                            if (!(state === true)) {
                                _context2.next = 10;
                                break;
                            }
                            _context2.next = 8;
                            return this.getStorageSync("sessionid");

                          case 8:
                            sessionid = _context2.sent;
                            url = url + "&state=we7sid-" + sessionid;

                          case 10:
                            url += "&m=touxiang_c";
                            this.showLoading();
                            cacheKey = (0, _md2.default)(url + JSON.stringify(data));
                            if (!(cacheTime > 0)) {
                                _context2.next = 18;
                                break;
                            }
                            _cacheData2 = this.getStorageSync(cacheKey);
                            // 有缓存数据
                                                        if (!_cacheData2) {
                                _context2.next = 18;
                                break;
                            }
                            this.hideLoading();
                            return _context2.abrupt("return", _cacheData2);

                          case 18:
                            _context2.next = 20;
                            return _wepy2.default.request({
                                url: url,
                                data: data ? data : {},
                                method: method,
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                }
                            });

                          case 20:
                            responds = _context2.sent;
                            // 隐藏Loading
                                                        this.hideLoading();
                            // 判断请求状态码
                                                        if (!(responds.statusCode !== 200)) {
                                _context2.next = 24;
                                break;
                            }
                            throw "网络错误代码：" + responds.statusCode;

                          case 24:
                            if (!(action != "auth/session/userinfo" && !responds.data.hasOwnProperty("errno"))) {
                                _context2.next = 26;
                                break;
                            }
                            throw "返回数据格式错误";

                          case 26:
                            if (!(responds.data.errno === 41009)) {
                                _context2.next = 31;
                                break;
                            }
                            this.removeStorageSync("sessionid");
                            // 请求登录
                                                        _context2.next = 30;
                            return _api2.default.login();

                          case 30:
                            return _context2.abrupt("return", this.request(action, data, state, cacheTime, method));

                          case 31:
                            if (!(responds.data.errno !== 0)) {
                                _context2.next = 34;
                                break;
                            }
                            if (!(responds.data.message != "签名错误")) {
                                _context2.next = 34;
                                break;
                            }
                            throw responds.data.message;

                          case 34:
                            // 获取数据
                            cacheData = responds.data.data;
                            // 缓存请求数据
                                                        if (cacheTime > 0 && cacheData) {
                                // 缓存数据
                                this.setStorageSync(cacheKey, cacheData, cacheTime);
                            }
                            return _context2.abrupt("return", cacheData);

                          case 37:
                          case "end":
                            return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
            function request(_x20, _x21) {
                return _ref4.apply(this, arguments);
            }
            return request;
        }()
    }, {
        key: "get",
        value: function get(action, data) {
            var cacheTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return this.request(action, data, state, cacheTime);
        }
        // Post 请求
        }, {
        key: "post",
        value: function post(action, data) {
            var cacheTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return this.request(action, data, state, cacheTime, "POST");
        }
        // 排序
        }, {
        key: "sortReverse",
        value: function sortReverse(arrayData) {
            var e = [];
            for (var a in arrayData) {
                e.push(a);
            }
            return e.sort().reverse(), e;
        }
        // 壁纸签名
        }, {
        key: "sign",
        value: function sign(params) {
            var a = "053ef899Af294A36bB5ae1730c7995E8";
            for (var n = params, o = this.sortReverse(n), c = [], h = {}, u = o.length; u--; ) {
                c.push(o[u] + "=" + n[o[u]]), h[o[u]] = n[o[u]];
            }
            var i = (0, _md2.default)(c.join("&").toLocaleLowerCase().concat(a));
            return h.SignatureMD5 = i, h;
        }
    }, {
        key: "toMum",
        value: function toMum(e) {
            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1161, t = "", o = String.fromCharCode(n), r = 0; r < e.length; r++) {
                t += e.charAt(r) + o;
            }
            return t;
        }
    } ]);
    return Index;
}();

Index.isLoading = false;

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsInN3aXRjaFRhYiIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwicmVMYXVuY2giLCJyZWRpcmVjdFRvIiwibmF2aWdhdGVUbyIsImRlbHRhIiwibmF2aWdhdGVCYWNrIiwidGl0bGUiLCJkdXJhdGlvbiIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwic2V0VGltZW91dCIsImNvbnRlbnQiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwiY29uZmlybSIsImlzTG9hZGluZyIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJjYWNoZUtleSIsImNhY2hlRGF0YSIsImNhY2hlVGltZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJwYXJzZSIsImRhdGEiLCJleHBpcmUiLCJzZXRTdG9yYWdlU3luYyIsImVyciIsImtleSIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiZ2V0U3RvcmFnZVN5bmMiLCJoYXNPd25Qcm9wZXJ0eSIsImUiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwicGF5U2lnbiIsImRldGFpbCIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwiZmlsZVBhdGgiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZ2V0U2V0dGluZyIsImF1dGhTZXR0aW5nIiwib3BlblNldHRpbmciLCJpbWFnZVVybCIsInRlc3QiLCJSZWdFeHAiLCJlbnYiLCJVU0VSX0RBVEFfUEFUSCIsImRvd25sb2FkRmlsZSIsInRlbXBGaWxlUGF0aCIsImJhc2U2NGRhdGEiLCJmaWxlX25hbWUiLCJmc20iLCJnZXRGaWxlU3lzdGVtTWFuYWdlciIsIkZJTEVfQkFTRV9OQU1FIiwiZXhlYyIsImZvcm1hdCIsImJvZHlEYXRhIiwiYnVmZmVyIiwiYmFzZTY0VG9BcnJheUJ1ZmZlciIsIndyaXRlRmlsZSIsImVuY29kaW5nIiwidXNlcklkIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsIndlcHkiLCJyZXF1ZXN0IiwiaGVhZGVyIiwicmVzcG9uZHMiLCJzdGF0dXNDb2RlIiwiRGF0YSIsImxlbmd0aCIsImFjdGlvbiIsInN0YXRlIiwic2l0ZUluZm8iLCJzaXRlcm9vdCIsInVuaWFjaWQiLCJtdWx0aWlkIiwidmVyc2lvbiIsImFjdGlvblBhcmFtZXRlciIsInNwbGl0Iiwic2Vzc2lvbmlkIiwiZXJybm8iLCJhcGkiLCJsb2dpbiIsIm1lc3NhZ2UiLCJhcnJheURhdGEiLCJhIiwicHVzaCIsInNvcnQiLCJyZXZlcnNlIiwicGFyYW1zIiwibiIsIm8iLCJzb3J0UmV2ZXJzZSIsImMiLCJoIiwidSIsImkiLCJqb2luIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJjb25jYXQiLCJTaWduYXR1cmVNRDUiLCJhcmd1bWVudHMiLCJ0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiciIsImNoYXJBdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7QUFJbkI7OEJBQ2lCQyxHLEVBQUs7QUFDcEIsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxXQUFHQyxTQUFILENBQWE7QUFDWEwsZUFBS0EsR0FETTtBQUVYTSxtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCTCxvQkFBUUssR0FBUjtBQUNELFdBSlU7QUFLWEMsZ0JBQU0sY0FBU0QsR0FBVCxFQUFjO0FBQ2xCSixtQkFBT0ksR0FBUDtBQUNEO0FBUFUsU0FBYjtBQVNELE9BVk0sQ0FBUDtBQVdEOztBQUVEOzs7OzZCQUNnQlAsRyxFQUFLO0FBQ25CLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsV0FBR0ssUUFBSCxDQUFZO0FBQ1ZULGVBQUtBLEdB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QVUsQ0FBVixDQUFsRCxHQUFpRSxJQUF6RSxFQUErRUMsSUFBSSxFQUFuRixFQUF1RlgsSUFBSVksT0FBT0MsWUFBUCxDQUFvQmQsQ0FBcEIsQ0FBM0YsRUFBbUhlLElBQUksQ0FBNUgsRUFBK0hBLElBQUlqRixFQUFFNkMsTUFBckksRUFBNklvQyxHQUE3STtBQUFrSkgsYUFBSzlFLEVBQUVrRixNQUFGLENBQVNELENBQVQsSUFBY2QsQ0FBbkI7QUFBbEosT0FDQSxPQUFPVyxDQUFQO0FBQ0Q7Ozs7OztBQTFla0J4SCxLLENBRVp5QixTLEdBQVksSztrQkFGQXpCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IG1kNSBmcm9tICdtZDUnXG5pbXBvcnQgc2l0ZUluZm8gZnJvbSAnLi4vc2l0ZWluZm8nXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXgge1xuXG4gIHN0YXRpYyBpc0xvYWRpbmcgPSBmYWxzZTtcblxuICAvLyDot7PovazliLAgdGFiQmFyIOmhtemdou+8jOW5tuWFs+mXreWFtuS7luaJgOaciemdniB0YWJCYXIg6aG16Z2iXG4gIHN0YXRpYyBzd2l0Y2hUYWIodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWFs+mXreaJgOaciemhtemdou+8jOaJk+W8gOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdolxuICBzdGF0aWMgcmVMYXVuY2godXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5YWz6Zet5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qE5p+Q5Liq6aG16Z2iXG4gIHN0YXRpYyByZWRpcmVjdFRvKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5L+d55WZ5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qE5p+Q5Liq6aG16Z2iXG4gIHN0YXRpYyBuYXZpZ2F0ZVRvKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5YWz6Zet5b2T5YmN6aG16Z2i77yM6L+U5Zue5LiK5LiA6aG16Z2i5oiW5aSa57qn6aG16Z2iXG4gIHN0YXRpYyBuYXZpZ2F0ZUJhY2soZGVsdGEgPSAxKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDmmL7npLrmiJDlip/mtojmga/mj5DnpLrmoYZcbiAgc3RhdGljIHNob3dUb2FzdFN1Y2Nlc3ModGl0bGUgPSAnJywgZHVyYXRpb24gPSAxMDAwKSB7XG4gICAgd3guc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgIG1hc2s6IHRydWUsXG4gICAgfSk7XG4gICAgaWYgKGR1cmF0aW9uID4gMCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyDmmL7npLrml6BpY29u5raI5oGv5o+Q56S65qGGXG4gIHN0YXRpYyBzaG93VG9hc3ROb25lKHRpdGxlID0gJycsIGR1cmF0aW9uID0gMTAwMCkge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBtYXNrOiB0cnVlLFxuICAgIH0pO1xuICAgIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8g5pi+56S65qih5oCB5a+56K+d5qGGXG4gIHN0YXRpYyBzaG93TW9kYWwoY29udGVudCA9ICcnLCB0aXRsZSA9ICfns7vnu5/mj5DnpLonKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICAvLyDmmL7npLrnoa7lrprlr7nor53moYZcbiAgc3RhdGljIHNob3dDb25maXJtKGNvbnRlbnQgPSAnJywgdGl0bGUgPSAn57O757uf5o+Q56S6Jykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgIHNob3dDYW5jZWw6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgLy8g5pi+56S6TG9hZGluZ1xuICBzdGF0aWMgc2hvd0xvYWRpbmcodGl0bGUgPSAn5Yqg6L295LitLi4uJykge1xuICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgbWFzazogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8g5YWz6ZetTG9hZGluZ1xuICBzdGF0aWMgaGlkZUxvYWRpbmcoKSB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB3eC5oaWRlTG9hZGluZygpO1xuICB9XG5cbiAgLy8g6K6+572uTG9hZGluZ1xuICBzdGF0aWMgc2V0TG9hZGluZygpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gIH1cblxuICAvLyDorr7nva7nvJPlrZhcbiAgc3RhdGljIHNldFN0b3JhZ2VTeW5jKGNhY2hlS2V5LCBjYWNoZURhdGEsIGNhY2hlVGltZSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IERhdGUucGFyc2UobmV3IERhdGUoKSk7XG4gICAgICAgIGlmIChjYWNoZVRpbWUgPiAwKSB7XG4gICAgICAgICAgY2FjaGVEYXRhID0ge1xuICAgICAgICAgICAgZGF0YTogY2FjaGVEYXRhLFxuICAgICAgICAgICAgZXhwaXJlOiB0aW1lc3RhbXAgKyBjYWNoZVRpbWUgKiAxMDAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhjYWNoZUtleSwgY2FjaGVEYXRhKTtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWIoOmZpOe8k+WtmFxuICBzdGF0aWMgcmVtb3ZlU3RvcmFnZVN5bmMoa2V5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKGtleSk7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyDojrflj5bnvJPlrZhcbiAgc3RhdGljIGdldFN0b3JhZ2VTeW5jKGtleSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgY2FjaGVEYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcbiAgICAgIC8vIOWIpOaWreaYr+WQpuaciee8k+WtmOaXtumXtFxuICAgICAgaWYgKGNhY2hlRGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXhwaXJlJykgJiYgY2FjaGVEYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm6L+H5pyfXG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xuICAgICAgICBpZiAoY2FjaGVEYXRhLmV4cGlyZSA8PSB0aW1lc3RhbXApIHtcbiAgICAgICAgICAvLyDliKDpmaTnvJPlrZhcbiAgICAgICAgICB0aGlzLnJlbW92ZVN0b3JhZ2VTeW5jKGtleSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6L+U5Zue57yT5a2Y5pWw5o2uXG4gICAgICAgIHJldHVybiBjYWNoZURhdGEuZGF0YTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYWNoZURhdGE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8g5pSv5LuYXG4gIHN0YXRpYyByZXF1ZXN0UGF5bWVudChyZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICB0aW1lU3RhbXA6IHJlcy50aW1lU3RhbXAsXG4gICAgICAgIG5vbmNlU3RyOiByZXMubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IHJlcy5wYWNrYWdlLFxuICAgICAgICBzaWduVHlwZTogcmVzLnNpZ25UeXBlLFxuICAgICAgICBwYXlTaWduOiByZXMucGF5U2lnbixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIOafpeeci+WbvueJh1xuICBzdGF0aWMgcHJldmlld0ltYWdlKGRldGFpbCkge1xuICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICBjdXJyZW50OiBkZXRhaWwsXG4gICAgICB1cmxzOiBbZGV0YWlsXVxuICAgIH0pO1xuICB9XG5cbiAgLy8g5L+d5a2Y5Zu+54mHXG4gIHN0YXRpYyBzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKGZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5Yik5pat5piv5ZCm5pyJ5p2D6ZmQXG4gIHN0YXRpYyBzZXRVc2VyQXV0aFNjb3BlcyhrZXkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgbGV0IGF1dGhTZXR0aW5nID0gcmVzLmF1dGhTZXR0aW5nO1xuICAgICAgICAgIGlmIChhdXRoU2V0dGluZ1trZXldKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgwID09IGF1dGhTZXR0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLns7vnu5/mj5DnpLpcIixcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIumcgOimgeaJk+W8gOW+ruS/oeebuOWFs+iuvue9rlwiLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZSkge1xuICAgICAgICAgICAgICAgICAgZS5jb25maXJtICYmIHd4Lm9wZW5TZXR0aW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5LiL6L295paH5Lu2XG4gIHN0YXRpYyBkb3dubG9hZEZpbGUoaW1hZ2VVcmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKC9eaHR0cC8udGVzdChpbWFnZVVybCkgJiYgIW5ldyBSZWdFeHAod3guZW52LlVTRVJfREFUQV9QQVRIKS50ZXN0KGltYWdlVXJsKSAmJiAhbmV3IFJlZ0V4cCgnaHR0cDovL3RtcCcpLnRlc3QoaW1hZ2VVcmwpKSB7XG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOiBpbWFnZVVybCxcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMudGVtcEZpbGVQYXRoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShpbWFnZVVybCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBCYXNlNjQg6L2s5o2i6Lev5b6EXG4gIHN0YXRpYyBiYXNlNjRzcmMoYmFzZTY0ZGF0YSwgZmlsZV9uYW1lID0gJ2ZpbGVfbmFtZScpIHtcbiAgICBjb25zdCBmc20gPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpO1xuICAgIGNvbnN0IEZJTEVfQkFTRV9OQU1FID0gZmlsZV9uYW1lO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBbLCBmb3JtYXQsIGJvZHlEYXRhXSA9IC9kYXRhOmltYWdlXFwvKFxcdyspO2Jhc2U2NCwoLiopLy5leGVjKGJhc2U2NGRhdGEpIHx8IFtdO1xuICAgICAgaWYgKCFmb3JtYXQpIHtcbiAgICAgICAgcmVqZWN0KCfkuI3mmK9CYXNlNjTmlbDmja4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gYCR7d3guZW52LlVTRVJfREFUQV9QQVRIfS8ke0ZJTEVfQkFTRV9OQU1FfS4ke2Zvcm1hdH1gO1xuICAgICAgY29uc3QgYnVmZmVyID0gd3guYmFzZTY0VG9BcnJheUJ1ZmZlcihib2R5RGF0YSk7XG4gICAgICBmc20ud3JpdGVGaWxlKHtcbiAgICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoLFxuICAgICAgICBkYXRhOiBidWZmZXIsXG4gICAgICAgIGVuY29kaW5nOiAnYmluYXJ5JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmVzb2x2ZShmaWxlUGF0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJlamVjdCgnRVJST1JfQkFTRTY0U1JDX1dSSVRFJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5qOA5rWL5piv5ZCm55m75b2VXG4gIHN0YXRpYyBjaGVja0xvZ2luKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgdXNlcklkID0gdGhpcy5nZXRTdG9yYWdlU3luYygndXNlcklkJyk7XG4gICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgIHJlc29sdmUodXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUbygnL3BhZ2VzL3VzZXIvbG9naW4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWFtuS7luivt+axglxuICBzdGF0aWMgYXN5bmMgb3RoZXJSZXF1ZXN0KHVybCwgZGF0YSwgY2FjaGVUaW1lID0gMCwgbWV0aG9kID0gJ0dFVCcpIHtcbiAgICB0aGlzLnNob3dMb2FkaW5nKCk7XG4gICAgbGV0IGNhY2hlS2V5ID0gbWQ1KHVybCArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICBpZiAoY2FjaGVUaW1lID4gMCkge1xuICAgICAgbGV0IGNhY2hlRGF0YSA9IHRoaXMuZ2V0U3RvcmFnZVN5bmMoY2FjaGVLZXkpO1xuICAgICAgLy8g5pyJ57yT5a2Y5pWw5o2uXG4gICAgICBpZiAoY2FjaGVEYXRhKSB7XG4gICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g572R57uc6K+35rGCXG4gICAgbGV0IHJlc3BvbmRzID0gYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YSA/IGRhdGEgOiB7fSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgJ2RldmljZWluZm8nOiAnQ0g9MSZIZWlnaHQ9NjQwJkxhbmc9emhfQ04mTW9kZWw9VktZLUFMMDAmTmV0PXVua25vd24mUElEPTEmUGl4ZWxSYXRpbz0zJlNpZ25hdHVyZVN0YW1wPTE1NTE2NjEwODYzNjcmVmVyPTYmVmVyc2lvbj03LjAuMyZXaWR0aD0zNjAmU2lnbmF0dXJlTUQ1PTgxZTQ5NzQ2NjFmMzE0MzgyOWQ5NTA2NmYzMWVmMDIxJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOmakOiXj0xvYWRpbmdcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgLy8g5Yik5pat6K+35rGC54q25oCB56CBXG4gICAgaWYgKHJlc3BvbmRzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgdGhyb3cgJ+e9kee7nOmUmeivr+S7o+egge+8micgKyByZXNwb25kcy5zdGF0dXNDb2RlO1xuICAgIH1cbiAgICAvLyDojrflj5bmlbDmja5cbiAgICBsZXQgY2FjaGVEYXRhID0gcmVzcG9uZHMuZGF0YS5EYXRhO1xuICAgIC8vIOe8k+WtmOivt+axguaVsOaNrlxuICAgIGlmIChjYWNoZVRpbWUgPiAwICYmIGNhY2hlRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyDnvJPlrZjmlbDmja5cbiAgICAgIHRoaXMuc2V0U3RvcmFnZVN5bmMoY2FjaGVLZXksIGNhY2hlRGF0YSwgY2FjaGVUaW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlRGF0YTtcbiAgfVxuXG4gIC8vIOe9kee7nOivt+axglxuICBzdGF0aWMgYXN5bmMgcmVxdWVzdChhY3Rpb24sIGRhdGEsIHN0YXRlID0gZmFsc2UsIGNhY2hlVGltZSA9IDAsIG1ldGhvZCA9ICdHRVQnKSB7XG4gICAgbGV0IHVybCA9IHNpdGVJbmZvLnNpdGVyb290ICsgJz9pPScgKyBzaXRlSW5mby51bmlhY2lkICsgJyZ0PScgKyBzaXRlSW5mby5tdWx0aWlkICsgJyZ2PScgKyBzaXRlSW5mby52ZXJzaW9uICsgJyZmcm9tPXd4YXBwJnZlcnNpb249MS4wLjMnO1xuICAgIGxldCBhY3Rpb25QYXJhbWV0ZXIgPSBhY3Rpb24uc3BsaXQoJy8nKTtcbiAgICBpZiAoYWN0aW9uUGFyYW1ldGVyWzBdKSB7XG4gICAgICB1cmwgKz0gJyZjPScgKyBhY3Rpb25QYXJhbWV0ZXJbMF07XG4gICAgfVxuICAgIGlmIChhY3Rpb25QYXJhbWV0ZXJbMV0pIHtcbiAgICAgIHVybCArPSAnJmE9JyArIGFjdGlvblBhcmFtZXRlclsxXTtcbiAgICB9XG4gICAgaWYgKGFjdGlvblBhcmFtZXRlclsyXSkge1xuICAgICAgdXJsICs9ICcmZG89JyArIGFjdGlvblBhcmFtZXRlclsyXTtcbiAgICB9XG4gICAgaWYgKHN0YXRlID09PSB0cnVlKSB7XG4gICAgICBsZXQgc2Vzc2lvbmlkID0gYXdhaXQgdGhpcy5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbmlkJyk7XG4gICAgICB1cmwgPSB1cmwgKyAnJnN0YXRlPXdlN3NpZC0nICsgc2Vzc2lvbmlkO1xuICAgIH1cbiAgICB1cmwgKz0gJyZtPXp1bnl1ZV96aGl4aW4nO1xuICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcbiAgICBsZXQgY2FjaGVLZXkgPSBtZDUodXJsICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIGlmIChjYWNoZVRpbWUgPiAwKSB7XG4gICAgICBsZXQgY2FjaGVEYXRhID0gdGhpcy5nZXRTdG9yYWdlU3luYyhjYWNoZUtleSk7XG4gICAgICAvLyDmnInnvJPlrZjmlbDmja5cbiAgICAgIGlmIChjYWNoZURhdGEpIHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICByZXR1cm4gY2FjaGVEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyDnvZHnu5zor7fmsYJcbiAgICBsZXQgcmVzcG9uZHMgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhID8gZGF0YSA6IHt9LFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8g6ZqQ6JePTG9hZGluZ1xuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAvLyDliKTmlq3or7fmsYLnirbmgIHnoIFcbiAgICBpZiAocmVzcG9uZHMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyAn572R57uc6ZSZ6K+v5Luj56CB77yaJyArIHJlc3BvbmRzLnN0YXR1c0NvZGU7XG4gICAgfVxuICAgIC8vIOWIpOaWreivt+axgui/lOWbnuagvOW8j1xuICAgIGlmIChhY3Rpb24gIT0gJ2F1dGgvc2Vzc2lvbi91c2VyaW5mbycgJiYgIXJlc3BvbmRzLmRhdGEuaGFzT3duUHJvcGVydHkoJ2Vycm5vJykpIHtcbiAgICAgIHRocm93ICfov5Tlm57mlbDmja7moLzlvI/plJnor68nO1xuICAgIH1cbiAgICAvLyDliKTmlq3nmbvlvZXouqvku73mmK/lkKbov4fmnJ9cbiAgICBpZiAocmVzcG9uZHMuZGF0YS5lcnJubyA9PT0gNDEwMDkpIHtcbiAgICAgIHRoaXMucmVtb3ZlU3RvcmFnZVN5bmMoJ3Nlc3Npb25pZCcpO1xuICAgICAgLy8g6K+35rGC55m75b2VXG4gICAgICBhd2FpdCBhcGkubG9naW4oKTtcbiAgICAgIC8vIOmHjeaWsOivt+axglxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHN0YXRlLCBjYWNoZVRpbWUsIG1ldGhvZCk7XG4gICAgfVxuICAgIC8vIOWIpOaWrei/lOWbnuaVsOaNruaYr+WQpumUmeivr1xuICAgIGlmIChyZXNwb25kcy5kYXRhLmVycm5vICE9PSAwKSB7XG4gICAgICBpZiAocmVzcG9uZHMuZGF0YS5tZXNzYWdlICE9ICfnrb7lkI3plJnor68nKSB7XG4gICAgICAgIHRocm93IHJlc3BvbmRzLmRhdGEubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g6I635Y+W5pWw5o2uXG4gICAgbGV0IGNhY2hlRGF0YSA9IHJlc3BvbmRzLmRhdGEuZGF0YTtcbiAgICAvLyDnvJPlrZjor7fmsYLmlbDmja5cbiAgICBpZiAoY2FjaGVUaW1lID4gMCAmJiBjYWNoZURhdGEpIHtcbiAgICAgIC8vIOe8k+WtmOaVsOaNrlxuICAgICAgdGhpcy5zZXRTdG9yYWdlU3luYyhjYWNoZUtleSwgY2FjaGVEYXRhLCBjYWNoZVRpbWUpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVEYXRhO1xuICB9XG5cbiAgLy8gR2V06K+35rGCXG4gIHN0YXRpYyBnZXQoYWN0aW9uLCBkYXRhLCBjYWNoZVRpbWUgPSAwLCBzdGF0ZSA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHN0YXRlLCBjYWNoZVRpbWUpO1xuICB9XG5cbiAgLy8gUG9zdCDor7fmsYJcbiAgc3RhdGljIHBvc3QoYWN0aW9uLCBkYXRhLCBjYWNoZVRpbWUgPSAwLCBzdGF0ZSA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHN0YXRlLCBjYWNoZVRpbWUsICdQT1NUJyk7XG4gIH1cblxuICAvLyDmjpLluo9cbiAgc3RhdGljIHNvcnRSZXZlcnNlKGFycmF5RGF0YSkge1xuICAgIHZhciBlID0gW107XG4gICAgZm9yICh2YXIgYSBpbiBhcnJheURhdGEpIGUucHVzaChhKTtcbiAgICByZXR1cm4gZS5zb3J0KCkucmV2ZXJzZSgpLCBlO1xuICB9XG5cbiAgLy8g5aOB57q4562+5ZCNXG4gIHN0YXRpYyBzaWduKHBhcmFtcykge1xuICAgIGxldCBhID0gXCIwNTNlZjg5OUFmMjk0QTM2YkI1YWUxNzMwYzc5OTVFOFwiO1xuICAgIGZvciAodmFyIG4gPSBwYXJhbXMsIG8gPSB0aGlzLnNvcnRSZXZlcnNlKG4pLCBjID0gW10sIGggPSB7fSwgdSA9IG8ubGVuZ3RoOyB1LS07KSBjLnB1c2gob1t1XSArIFwiPVwiICsgbltvW3VdXSksXG4gICAgICBoW29bdV1dID0gbltvW3VdXTtcbiAgICB2YXIgaSA9IG1kNShjLmpvaW4oXCImXCIpLnRvTG9jYWxlTG93ZXJDYXNlKCkuY29uY2F0KGEpKTtcbiAgICByZXR1cm4gaC5TaWduYXR1cmVNRDUgPSBpLCBoO1xuICB9XG5cbiAgc3RhdGljIHRvTXVtKGUpIHtcbiAgICBmb3IgKHZhciBuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMV0gPyBhcmd1bWVudHNbMV0gOiAxMTYxLCB0ID0gXCJcIiwgbyA9IFN0cmluZy5mcm9tQ2hhckNvZGUobiksIHIgPSAwOyByIDwgZS5sZW5ndGg7IHIrKykgdCArPSBlLmNoYXJBdChyKSArIG87XG4gICAgcmV0dXJuIHQ7XG4gIH1cbn0iXX0=