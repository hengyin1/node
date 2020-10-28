function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    var a = this, t = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: t,
        urls: a.data[i].imageUrls
    });
}

function t(e) {
    return !1;
}

function i(e, a, t, i) {
    var r = 0, n = 0, d = 0, s = 0, o = {};
    return wx.getSystemInfo({
        success: function(m) {
            var g = t.data[i].view.imagePadding;
            r = m.windowWidth - 2 * g, n = m.windowHeight, e > r ? (s = (d = r) * a / e, o.imageWidth = d, 
            o.imageheight = s) : (o.imageWidth = e, o.imageheight = a);
        }
    }), o;
}

var r = e(require("./showdown.js")), n = e(require("./html2json.js"));

module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', s = arguments[3], o = arguments[4], m = s, g = {};
        if ("html" == i) g = n.default.html2json(d, e); else if ("md" == i || "markdown" == i) {
            var l = new r.default.Converter().makeHtml(d);
            g = n.default.html2json(l, e);
        }
        g.view = {}, g.view.imagePadding = 0, void 0 !== o && (g.view.imagePadding = o);
        var u = {};
        u[e] = g, m.setData(u), m.wxParseImgLoad = t, m.wxParseImgTap = a;
    },
    wxParseTemArray: function(e, a, t, i) {
        for (var r = [], n = i.data, d = null, s = 0; s < t; s++) {
            var o = n[a + s].nodes;
            r.push(o);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", t = arguments[2];
        n.default.emojisInit(e, a, t);
    }
};