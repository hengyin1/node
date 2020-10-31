Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _utils = require("./../utils/index.js");

var _utils2 = _interopRequireDefault(_utils);

var _siteinfo = require("./../siteinfo.js");

var _siteinfo2 = _interopRequireDefault(_siteinfo);

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
        key: "login",
        // 登录
        value: function() {
            var _ref = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee() {
                var loginRes, sessionInfo, getSetting, getUserInfoRes;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _wepy2.default.login();

                          case 3:
                            loginRes = _context.sent;
                            _context.next = 6;
                            return _utils2.default.get("auth/session/openid", {
                                code: loginRes.code
                            });

                          case 6:
                            sessionInfo = _context.sent;
                            _context.next = 9;
                            return _utils2.default.setStorageSync("sessionid", sessionInfo.sessionid);

                          case 9:
                            if (!sessionInfo.userinfo.fanid) {
                                _context.next = 12;
                                break;
                            }
                            _context.next = 12;
                            return _utils2.default.setStorageSync("userId", sessionInfo.userinfo.fanid);

                          case 12:
                            _context.next = 14;
                            return _wepy2.default.getSetting();

                          case 14:
                            getSetting = _context.sent;
                            if (!getSetting.authSetting["scope.userInfo"]) {
                                _context.next = 23;
                                break;
                            }
                            _context.next = 18;
                            return _wepy2.default.getUserInfo({
                                lang: "zh_CN"
                            });

                          case 18:
                            getUserInfoRes = _context.sent;
                            _context.next = 21;
                            return _utils2.default.setStorageSync("wxUserInfo", getUserInfoRes.userInfo);

                          case 21:
                            _context.next = 24;
                            break;

                          case 23:
                            _utils2.default.navigateTo("/pages/user/login");

                          case 24:
                            _context.next = 29;
                            break;

                          case 26:
                            _context.prev = 26;
                            _context.t0 = _context["catch"](0);
                            Utils.showModal(_context.t0);

                          case 29:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this, [ [ 0, 26 ] ]);
            }));
            function login() {
                return _ref.apply(this, arguments);
            }
            return login;
        }()
    }, {
        key: "storeUserInfo",
        value: function() {
            var _ref2 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee2(getUserInfoRes) {
                var userInfo;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return this.login();

                          case 3:
                            _context2.next = 5;
                            return _utils2.default.post("auth/session/userinfo", {
                                signature: getUserInfoRes.signature,
                                rawData: getUserInfoRes.rawData,
                                iv: getUserInfoRes.iv,
                                encryptedData: getUserInfoRes.encryptedData
                            }, 0, true);

                          case 5:
                            _context2.next = 7;
                            return this.user({
                                action: "updateOrCreate",
                                nickName: getUserInfoRes.userInfo.nickName,
                                avatarUrl: getUserInfoRes.userInfo.avatarUrl
                            }, 0, true, "POST");

                          case 7:
                            userInfo = _context2.sent;
                            _context2.next = 10;
                            return _utils2.default.setStorageSync("userId", userInfo.uid);

                          case 10:
                            _context2.next = 12;
                            return _utils2.default.setStorageSync("isDefriend", userInfo.defriend);

                          case 12:
                            return _context2.abrupt("return", userInfo.uid);

                          case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2["catch"](0);
                            _utils2.default.showModal(_context2.t0);

                          case 18:
                          case "end":
                            return _context2.stop();
                        }
                    }
                }, _callee2, this, [ [ 0, 15 ] ]);
            }));
            function storeUserInfo(_x) {
                return _ref2.apply(this, arguments);
            }
            return storeUserInfo;
        }()
    }, {
        key: "siteInfo",
        value: function siteInfo() {
            return _utils2.default.get("entry/wxapp/site", {}, 7200);
        }
        // 用户相关
        }, {
        key: "user",
        value: function user(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/user";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        // 分享文案
        }, {
        key: "questionShare",
        value: function questionShare(data) {
            return _utils2.default.get("entry/wxapp/question_share", data, 0);
        }
        // 二维码
        }, {
        key: "qrcode",
        value: function qrcode(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/qrcode";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        // 更多发现
        }, {
        key: "moreGame",
        value: function moreGame() {
            return _utils2.default.get("entry/wxapp/more_game", {}, 7200);
        }
        // 投诉
        }, {
        key: "report",
        value: function report(data) {
            return _utils2.default.post("entry/wxapp/report", data, 0, true);
        }
        // 头像主题
        }, {
        key: "logoThemes",
        value: function logoThemes(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/logo_themes";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        // 九宫格
        }, {
        key: "jiugongge",
        value: function jiugongge(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/jiugongge";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        // 截图事件
        }, {
        key: "screen",
        value: function screen(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/screen";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        // 文章管理
        }, {
        key: "article",
        value: function article(data) {
            var cacheTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";
            var url = "entry/wxapp/article";
            return _utils2.default.request(url, data, state, cacheTime, method);
        }
        //检测输入文字
        }, {
        key: "check_info",
        value: function check_info(data) {
            return _utils2.default.get("entry/wxapp/check_info", data, 0);
        }
        //获取请求连接
        }, {
        key: "getSiteUrl",
        value: function getSiteUrl(action) {
            var url = _siteinfo2.default.siteroot + "?i=" + _siteinfo2.default.uniacid + "&t=" + _siteinfo2.default.multiid + "&v=" + _siteinfo2.default.version + "&from=wxapp&version=1.0.3";
            var actionParameter = action.split("/");
            if (actionParameter[0]) {
                url += "&c=" + actionParameter[0];
            }
            if (actionParameter[1]) {
                url += "&a=" + actionParameter[1];
            }
            if (actionParameter[2]) {
                url += "&do=" + actionParameter[2];
            }
            if (actionParameter[3]) {
                url += "&action=" + actionParameter[3];
            }
            url += "&m=touxiang_c";
            return url;
        }
    } ]);
    return Index;
}();

exports.default = Index;