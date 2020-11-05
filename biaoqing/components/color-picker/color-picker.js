(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/color-picker" ], {
    "5ef8": function(t, e, n) {},
    "939f": function(t, e, n) {
        n.r(e);
        var o = n("b606"), c = n.n(o);
        for (var a in o) "default" !== a && function(t) {
            n.d(e, t, function() {
                return o[t];
            });
        }(a);
        e.default = c.a;
    },
    b606: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var o = n("e4f6"), c = {
            props: {
                hidden: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    canvasConfig: {
                        width: 750,
                        height: 55
                    }
                };
            },
            methods: {
                initStage: function() {
                    var t = this;
                    this.createSelectorQuery().select("#colorpicker").fields({
                        node: !0
                    }, function(e) {
                        var n = e.node;
                        n.width = n._width, n.height = n._height;
                        var c = n.createImage();
                        c.src = "https://img.bqbtool.com/assets/color.jpg", c.readyState = 2, t.stage = new o.createjs.Stage(n), 
                        c.onload = function() {
                            var e = new o.createjs.Bitmap(c);
                            e.sourceRect = {
                                x: 0,
                                y: 0,
                                width: n._width,
                                height: n._height
                            }, t.stage.addChild(e), t.stage.update();
                        };
                    }).exec();
                },
                touch: function(t) {
                    var e = t.touches[0];
                    if (e.x >= 0 && e.x <= this.stage.canvas.width && e.y >= 0 && e.y <= this.stage.canvas.height) {
                        var n = this.stage.ctx.getImageData(e.x, e.y, 1, 1).data;
                        this.$emit("touch", {
                            r: n[0],
                            g: n[1],
                            b: n[2]
                        });
                    }
                },
                touchend: function() {
                    this.$emit("touchend");
                }
            },
            mounted: function() {
                this.$store.state.pc || this.initStage();
            },
            beforeDestroy: function() {
                this.stage = null;
            }
        };
        e.default = c;
    },
    c29b: function(t, e, n) {
        n.r(e);
        var o = n("f165"), c = n("939f");
        for (var a in c) "default" !== a && function(t) {
            n.d(e, t, function() {
                return c[t];
            });
        }(a);
        n("ca99");
        var i = n("f0c5"), r = Object(i.a)(c.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = r.exports;
    },
    ca99: function(t, e, n) {
        var o = n("5ef8");
        n.n(o).a;
    },
    f165: function(t, e, n) {
        n.d(e, "b", function() {
            return o;
        }), n.d(e, "c", function() {
            return c;
        }), n.d(e, "a", function() {});
        var o = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, c = [];
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/color-picker-create-component", {
    "components/color-picker-create-component": function(t, e, n) {
        n("543d").createComponent(n("c29b"));
    }
}, [ [ "components/color-picker-create-component" ] ] ]);