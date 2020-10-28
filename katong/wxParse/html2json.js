function e(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

function t(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
}

function r(e) {
    var t = [];
    if (0 == s.length || !o) return (d = {}).node = "text", d.text = e, n = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var r = new RegExp("[:]"), n = e.split(r), i = 0; i < n.length; i++) {
        var l = n[i], d = {};
        o[l] ? (d.node = "element", d.tag = "emoji", d.text = o[l], d.baseSrc = a) : (d.node = "text", 
        d.text = l), t.push(d);
    }
    return t;
}

var s = "", a = "", o = {}, n = require("./wxDiscode.js"), i = require("./htmlparser.js"), l = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), d = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), c = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block"), module.exports = {
    html2json: function(e, s) {
        e = t(e), e = n.strDiscode(e);
        var a = [], o = {
            node: s,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return i(e, {
            start: function(e, t, r) {
                var i = {
                    node: "element",
                    tag: e
                };
                if (l[e] ? i.tagType = "block" : d[e] ? i.tagType = "inline" : c[e] && (i.tagType = "closeSelf"), 
                0 !== t.length && (i.attr = t.reduce(function(e, t) {
                    var r = t.name, s = t.value;
                    return "class" == r && (console.log(s), i.classStr = s), "style" == r && (console.log(s), 
                    i.styleStr = s), s.match(/ /) && (s = s.split(" ")), e[r] ? Array.isArray(e[r]) ? e[r].push(s) : e[r] = [ e[r], s ] : e[r] = s, 
                    e;
                }, {})), "img" === i.tag) {
                    i.imgIndex = o.images.length;
                    var u = i.attr.src;
                    u = n.urlToHttpUrl(u, "https"), i.attr.src = u, i.from = s, o.images.push(i), o.imageUrls.push(u);
                }
                if ("font" === i.tag) {
                    var p = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], m = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    i.attr.style || (i.attr.style = []), i.styleStr || (i.styleStr = "");
                    for (var f in m) if (i.attr[f]) {
                        var h = "size" === f ? p[i.attr[f] - 1] : i.attr[f];
                        i.attr.style.push(m[f]), i.attr.style.push(h), i.styleStr += m[f] + ": " + h + ";";
                    }
                }
                if ("source" === i.tag && (o.source = i.attr.src), r) {
                    var g = a[0] || o;
                    void 0 === g.nodes && (g.nodes = []), g.nodes.push(i);
                } else a.unshift(i);
            },
            end: function(e) {
                var t = a.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && o.source && (t.attr.src = o.source, 
                delete result.source), 0 === a.length) o.nodes.push(t); else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: r(e)
                };
                if (0 === a.length) o.nodes.push(t); else {
                    var s = a[0];
                    void 0 === s.nodes && (s.nodes = []), s.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), o;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", r = arguments[2];
        s = e, a = t, o = r;
    }
};