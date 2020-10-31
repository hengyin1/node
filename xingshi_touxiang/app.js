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

var _wepy = require("./npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _api = require("./api/index.js");

var _api2 = _interopRequireDefault(_api);

var _utils = require("./utils/index.js");

var _utils2 = _interopRequireDefault(_utils);

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

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _class = function(_wepy$app) {
    _inherits(_class, _wepy$app);
    _createClass(_class, [ {
        key: "onLaunch",
        value: function() {
            var _ref = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee(options) {
                var updateManager;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            // 场景值
                            this.globalData.scene = options.scene;
                            // 获取配置信息
                                                        _context.next = 3;
                            return _api2.default.siteInfo();

                          case 3:
                            this.globalData.siteInfo = _context.sent;
                            wx.onUserCaptureScreen(function(res) {
                                var user_id = _utils2.default.getStorageSync("userId");
                                if (user_id) {
                                    _api2.default.screen();
                                }
                            });
                            // 升级小程序
                                                        updateManager = wx.getUpdateManager();
                            updateManager.onCheckForUpdate(function(res) {
                                if (!res.hasUpdate) {
                                    return false;
                                }
                                updateManager.onUpdateReady(function() {
                                    wx.showModal({
                                        title: "更新提示",
                                        content: "新版本已经准备好，是否重启应用？",
                                        success: function success(res) {
                                            if (res.confirm) {
                                                updateManager.applyUpdate();
                                            }
                                        }
                                    });
                                });
                            });

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function onLaunch(_x) {
                return _ref.apply(this, arguments);
            }
            return onLaunch;
        }()
    } ]);
    function _class() {
        _classCallCheck(this, _class);
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
        _this.config = {
            pages: [ "pages/index", "pages/moreGame", "pages/answers/start", "pages/answers/questions", "pages/answers/finish", "pages/answers/detail", "pages/answers/show", "pages/answers/resolve", "pages/utils/report", "pages/article/index" ],
            subPackages: [ {
                root: "pages/user",
                name: "userSubpackages",
                pages: [ "index", "login", "topics", "withdrawals", "payments" ]
            }, {
                root: "pages/logo",
                name: "logoSubpackages",
                pages: [ "index", "themes", "addWords", "fans", "themeLogo", "cutInside", "list", "details" ]
            }, {
                root: "pages/chat",
                name: "chatSubpackages",
                pages: [ "index", "details" ]
            }, {
                root: "pages/jiugongge",
                name: "jiugonggeSubpackages",
                pages: [ "index", "addWords", "interest", "selectText", "success" ]
            }, {
                root: "pages/textDesign",
                name: "textDesignSubpackages",
                pages: [ "index", "htzChange", "fantizi", "huoxingwen", "letterChange", "nickname", "numberChange" ]
            }, {
                root: "pages/questions",
                name: "questionsSubpackages",
                pages: [ "index", "categories", "set-topic", "chooseRewardType", "set-topics-finish", "set-topics-reward", "set-topics-hobao", "rewardList" ]
            } ],
            preloadRule: {
                "pages/index": {
                    network: "all",
                    packages: [ "questionsSubpackages", "userSubpackages", "logoSubpackages", "jiugonggeSubpackages", "textDesignSubpackages", "chatSubpackages" ]
                },
                "pages/answers/start": {
                    network: "all",
                    packages: [ "questionsSubpackages", "userSubpackages" ]
                }
            },
            window: {
                navigationStyle: "custom",
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#36265A",
                navigationBarTitleText: "头像壁纸图片",
                navigationBarTextStyle: "white",
                backgroundColor: "#36265A",
                enablePullDownRefresh: false,
                onReachBottomDistance: 50
            },
            networkTimeout: {
                request: 1e4,
                downloadFile: 1e4
            }
        };
        _this.globalData = {
            siteInfo: null,
            shareUserId: false,
            seeVideoLogo: false,
            seeVideoChat: false,
            seeVideoAddWords: false,
            seeVideoInterest: false
        };
        _this.use("promisify");
        return _this;
    }
    return _class;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_class, {
    noPromiseAPI: [ "createSelectorQuery" ]
}));

var request = require("utils/request.js");

App({
    globalData: {
        userInfo: null,
        adlist: null,
        list_ad_max: "1",
        list_ad_row: "4",
        index_ad_max: "1",
        index_ad_row: "4",
        isopen: "1",
        statusBarHeight: "44",
        siteInfo: null
    },
    onLaunch: function() {
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log(res);
                _this.globalData.statusBarHeight = res.statusBarHeight;
            }
        });
        this.getad();
        _api2.default.siteInfo().then(function(result) {
            _this.globalData.siteInfo = result;
        });
    },
    getad: function() {
        var _this = this;
        this.func.req2("Touxiang/GetTouxiangAd", {}, res => {
            if (res.data.code == 202) {
                _this.globalData.adlist = res.data.data.list_ad;
                _this.globalData.list_ad_max = res.data.data.list_ad_max;
                _this.globalData.list_ad_row = res.data.data.list_ad_row;
                _this.globalData.index_ad_max = res.data.data.index_ad_max;
                _this.globalData.index_ad_row = res.data.data.index_ad_row;
                _this.globalData.isopen = res.data.data.isopen;
            }
        });
    },
    func: {
        //这里配置我们需要的方法
        req1: request.method1,
        req2: request.method2,
        req3: request.method3
    },
    rooturl: "https://touxiang.pptmb360.cn"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiZ2xvYmFsRGF0YSIsInNjZW5lIiwiYXBpIiwic2l0ZUluZm8iLCJ3eCIsIm9uVXNlckNhcHR1cmVTY3JlZW4iLCJyZXMiLCJ1c2VyX2lkIiwidXRpbHMiLCJnZXRTdG9yYWdlU3luYyIsInNjcmVlbiIsInVwZGF0ZU1hbmFnZXIiLCJnZXRVcGRhdGVNYW5hZ2VyIiwib25DaGVja0ZvclVwZGF0ZSIsImhhc1VwZGF0ZSIsIm9uVXBkYXRlUmVhZHkiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwiY29uZmlybSIsImFwcGx5VXBkYXRlIiwiY29uZmlnIiwicGFnZXMiLCJzdWJQYWNrYWdlcyIsInJvb3QiLCJuYW1lIiwicHJlbG9hZFJ1bGUiLCJuZXR3b3JrIiwicGFja2FnZXMiLCJ3aW5kb3ciLCJuYXZpZ2F0aW9uU3R5bGUiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbURpc3RhbmNlIiwibmV0d29ya1RpbWVvdXQiLCJyZXF1ZXN0IiwiZG93bmxvYWRGaWxlIiwic2hhcmVVc2VySWQiLCJzZWVWaWRlb0xvZ28iLCJzZWVWaWRlb0NoYXQiLCJzZWVWaWRlb0FkZFdvcmRzIiwic2VlVmlkZW9JbnRlcmVzdCIsInVzZSIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswRkEwRmlCQSxPOzs7Ozs7QUFDYjtBQUNBLHFCQUFLQyxVQUFMLENBQWdCQyxLQUFoQixHQUF3QkYsUUFBUUUsS0FBaEM7QUFDQTs7dUJBQ2lDQyxjQUFJQyxRQUFKLEU7OztB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d0IsT0FMbEI7QUFNTkMseUJBQWlCLFNBTlg7QUFPTkMsK0JBQXVCLEtBUGpCO0FBUU5DLCtCQUF1QjtBQVJqQixPQTlERDtBQXdFUEMsc0JBQWdCO0FBQ2RDLGlCQUFTLEtBREs7QUFFZEMsc0JBQWM7QUFGQTtBQXhFVCxLQXNISztBQUFBLFVBeENkekMsVUF3Q2MsR0F4Q0Q7QUFDWEcsZ0JBQVUsSUFEQztBQUVYdUMsbUJBQWEsS0FGRjtBQUdYQyxvQkFBYSxLQUhGO0FBSVhDLG9CQUFhLEtBSkY7QUFLWEMsd0JBQWlCLEtBTE47QUFNWEMsd0JBQWlCO0FBTk4sS0F3Q0M7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGWTtBQUdiOzs7RUExSDBCQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmltcG9ydCBhcGkgZnJvbSAnLi9hcGknXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9tb3JlR2FtZScsXG5cbiAgICAgICdwYWdlcy9hbnN3ZXJzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9hbnN3ZXJzL3F1ZXN0aW9ucycsXG4gICAgICAncGFnZXMvYW5zd2Vycy9maW5pc2gnLFxuICAgICAgJ3BhZ2VzL2Fuc3dlcnMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9hbnN3ZXJzL3Nob3cnLFxuICAgICAgJ3BhZ2VzL2Fuc3dlcnMvcmVzb2x2ZScsXG5cbiAgICAgICdwYWdlcy91dGlscy9yZXBvcnQnLFxuICAgICAgJ3BhZ2VzL2FydGljbGUvaW5kZXgnXG4gICAgXSxcbiAgICBzdWJQYWNrYWdlczogW3tcbiAgICAgIHJvb3Q6ICdwYWdlcy91c2VyJyxcbiAgICAgIG5hbWU6ICd1c2VyU3VicGFja2FnZXMnLFxuICAgICAgcGFnZXM6IFtcbiAgICAgICAgJ2luZGV4JywgJ2xvZ2luJywgJ3RvcGljcycsICd3aXRoZHJhd2FscycsICdwYXltZW50cydcbiAgICAgIF1cbiAgICB9LCB7XG4gICAgICByb290OiAncGFnZXMvbG9nbycsXG4gICAgICBuYW1lOiAnbG9nb1N1YnBhY2thZ2VzJyxcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdpbmRleCcsICd0aGVtZXMnLCAnYWRkV29yZHMnLCAnZmFucycsICd0aGVtZUxvZ28nLCAnY3V0SW5zaWRlJywgJ2xpc3QnLCAnZGV0YWlscydcbiAgICAgIF1cbiAgICB9LCB7XG4gICAgICByb290OiAncGFnZXMvY2hhdCcsXG4gICAgICBuYW1lOiAnY2hhdFN1YnBhY2thZ2VzJyxcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdpbmRleCcsICdkZXRhaWxzJ1xuICAgICAgXVxuICAgIH0sIHtcbiAgICAgIHJvb3Q6IFwicGFnZXMvaml1Z29uZ2dlXCIsXG4gICAgICBuYW1lOiBcImppdWdvbmdnZVN1YnBhY2thZ2VzXCIsXG4gICAgICBwYWdlczogW1xuICAgICAgICAnaW5kZXgnLCAnYWRkV29yZHMnLCAnaW50ZXJlc3QnLCAnc2VsZWN0VGV4dCcsICdzdWNjZXNzJ1xuICAgICAgXVxuICAgIH0sIHtcbiAgICAgIHJvb3Q6IFwicGFnZXMvdGV4dERlc2lnblwiLFxuICAgICAgbmFtZTogXCJ0ZXh0RGVzaWduU3VicGFja2FnZXNcIixcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdpbmRleCcsICdodHpDaGFuZ2UnLCAnZmFudGl6aScsICdodW94aW5nd2VuJywgJ2xldHRlckNoYW5nZScsICduaWNrbmFtZScsICdudW1iZXJDaGFuZ2UnXG4gICAgICBdXG4gICAgfSwge1xuICAgICAgcm9vdDogJ3BhZ2VzL3F1ZXN0aW9ucycsXG4gICAgICBuYW1lOiBcInF1ZXN0aW9uc1N1YnBhY2thZ2VzXCIsXG4gICAgICBwYWdlczogW1xuICAgICAgICAnaW5kZXgnLCAnY2F0ZWdvcmllcycsICdzZXQtdG9waWMnLCAnY2hvb3NlUmV3YXJkVHlwZScsICdzZXQtdG9waWNzLWZpbmlzaCcsICdzZXQtdG9waWNzLXJld2FyZCcsICdzZXQtdG9waWNzLWhvYmFvJywgJ3Jld2FyZExpc3QnXG4gICAgICBdXG4gICAgfV0sXG4gICAgcHJlbG9hZFJ1bGU6IHtcbiAgICAgICdwYWdlcy9pbmRleCc6IHtcbiAgICAgICAgbmV0d29yazogJ2FsbCcsXG4gICAgICAgIHBhY2thZ2VzOiBbJ3F1ZXN0aW9uc1N1YnBhY2thZ2VzJywgJ3VzZXJTdWJwYWNrYWdlcycsICdsb2dvU3VicGFja2FnZXMnLCAnaml1Z29uZ2dlU3VicGFja2FnZXMnLCAndGV4dERlc2lnblN1YnBhY2thZ2VzJywgJ2NoYXRTdWJwYWNrYWdlcyddXG4gICAgICB9LFxuICAgICAgJ3BhZ2VzL2Fuc3dlcnMvc3RhcnQnOiB7XG4gICAgICAgIG5ldHdvcms6ICdhbGwnLFxuICAgICAgICBwYWNrYWdlczogWydxdWVzdGlvbnNTdWJwYWNrYWdlcycsICd1c2VyU3VicGFja2FnZXMnXVxuICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93OiB7XG4gICAgICBuYXZpZ2F0aW9uU3R5bGU6IFwiY3VzdG9tXCIsXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiBcImxpZ2h0XCIsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMzNjI2NUFcIixcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5aS05YOP5aOB57q46K6+6K6hXCIsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIndoaXRlXCIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzM2MjY1QVwiLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcbiAgICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogNTBcbiAgICB9LFxuICAgIG5ldHdvcmtUaW1lb3V0OiB7XG4gICAgICByZXF1ZXN0OiAxMDAwMCxcbiAgICAgIGRvd25sb2FkRmlsZTogMTAwMDAsXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICBzaXRlSW5mbzogbnVsbCxcbiAgICBzaGFyZVVzZXJJZDogZmFsc2UsXG4gICAgc2VlVmlkZW9Mb2dvOmZhbHNlLFxuICAgIHNlZVZpZGVvQ2hhdDpmYWxzZSxcbiAgICBzZWVWaWRlb0FkZFdvcmRzOmZhbHNlLFxuICAgIHNlZVZpZGVvSW50ZXJlc3Q6ZmFsc2UsXG4gIH1cblxuICBhc3luYyBvbkxhdW5jaChvcHRpb25zKSB7XG4gICAgLy8g5Zy65pmv5YC8XG4gICAgdGhpcy5nbG9iYWxEYXRhLnNjZW5lID0gb3B0aW9ucy5zY2VuZTtcbiAgICAvLyDojrflj5bphY3nva7kv6Hmga9cbiAgICB0aGlzLmdsb2JhbERhdGEuc2l0ZUluZm8gPSBhd2FpdCBhcGkuc2l0ZUluZm8oKTtcbiAgICB3eC5vblVzZXJDYXB0dXJlU2NyZWVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgbGV0IHVzZXJfaWQgPSB1dGlscy5nZXRTdG9yYWdlU3luYygndXNlcklkJyk7XG4gICAgICBpZiAodXNlcl9pZCkge1xuICAgICAgICBhcGkuc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8g5Y2H57qn5bCP56iL5bqPXG4gICAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKTtcbiAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICBpZiAoIXJlcy5oYXNVcGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5pu05paw5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5paw54mI5pys5bey57uP5YeG5aSH5aW977yM5piv5ZCm6YeN5ZCv5bqU55So77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcbiAgfVxufVxuIl19