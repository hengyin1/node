function r(r, n) {
    r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
    for (var f = 1732584193, a = -271733879, i = -1732584194, h = 271733878, v = 0; v < r.length; v += 16) {
        var A = f, l = a, d = i, g = h;
        a = o(a = o(a = o(a = o(a = e(a = e(a = e(a = e(a = u(a = u(a = u(a = u(a = t(a = t(a = t(a = t(a, i = t(i, h = t(h, f = t(f, a, i, h, r[v + 0], 7, -680876936), a, i, r[v + 1], 12, -389564586), f, a, r[v + 2], 17, 606105819), h, f, r[v + 3], 22, -1044525330), i = t(i, h = t(h, f = t(f, a, i, h, r[v + 4], 7, -176418897), a, i, r[v + 5], 12, 1200080426), f, a, r[v + 6], 17, -1473231341), h, f, r[v + 7], 22, -45705983), i = t(i, h = t(h, f = t(f, a, i, h, r[v + 8], 7, 1770035416), a, i, r[v + 9], 12, -1958414417), f, a, r[v + 10], 17, -42063), h, f, r[v + 11], 22, -1990404162), i = t(i, h = t(h, f = t(f, a, i, h, r[v + 12], 7, 1804603682), a, i, r[v + 13], 12, -40341101), f, a, r[v + 14], 17, -1502002290), h, f, r[v + 15], 22, 1236535329), i = u(i, h = u(h, f = u(f, a, i, h, r[v + 1], 5, -165796510), a, i, r[v + 6], 9, -1069501632), f, a, r[v + 11], 14, 643717713), h, f, r[v + 0], 20, -373897302), i = u(i, h = u(h, f = u(f, a, i, h, r[v + 5], 5, -701558691), a, i, r[v + 10], 9, 38016083), f, a, r[v + 15], 14, -660478335), h, f, r[v + 4], 20, -405537848), i = u(i, h = u(h, f = u(f, a, i, h, r[v + 9], 5, 568446438), a, i, r[v + 14], 9, -1019803690), f, a, r[v + 3], 14, -187363961), h, f, r[v + 8], 20, 1163531501), i = u(i, h = u(h, f = u(f, a, i, h, r[v + 13], 5, -1444681467), a, i, r[v + 2], 9, -51403784), f, a, r[v + 7], 14, 1735328473), h, f, r[v + 12], 20, -1926607734), i = e(i, h = e(h, f = e(f, a, i, h, r[v + 5], 4, -378558), a, i, r[v + 8], 11, -2022574463), f, a, r[v + 11], 16, 1839030562), h, f, r[v + 14], 23, -35309556), i = e(i, h = e(h, f = e(f, a, i, h, r[v + 1], 4, -1530992060), a, i, r[v + 4], 11, 1272893353), f, a, r[v + 7], 16, -155497632), h, f, r[v + 10], 23, -1094730640), i = e(i, h = e(h, f = e(f, a, i, h, r[v + 13], 4, 681279174), a, i, r[v + 0], 11, -358537222), f, a, r[v + 3], 16, -722521979), h, f, r[v + 6], 23, 76029189), i = e(i, h = e(h, f = e(f, a, i, h, r[v + 9], 4, -640364487), a, i, r[v + 12], 11, -421815835), f, a, r[v + 15], 16, 530742520), h, f, r[v + 2], 23, -995338651), i = o(i, h = o(h, f = o(f, a, i, h, r[v + 0], 6, -198630844), a, i, r[v + 7], 10, 1126891415), f, a, r[v + 14], 15, -1416354905), h, f, r[v + 5], 21, -57434055), i = o(i, h = o(h, f = o(f, a, i, h, r[v + 12], 6, 1700485571), a, i, r[v + 3], 10, -1894986606), f, a, r[v + 10], 15, -1051523), h, f, r[v + 1], 21, -2054922799), i = o(i, h = o(h, f = o(f, a, i, h, r[v + 8], 6, 1873313359), a, i, r[v + 15], 10, -30611744), f, a, r[v + 6], 15, -1560198380), h, f, r[v + 13], 21, 1309151649), i = o(i, h = o(h, f = o(f, a, i, h, r[v + 4], 6, -145523070), a, i, r[v + 11], 10, -1120210379), f, a, r[v + 2], 15, 718787259), h, f, r[v + 9], 21, -343485551), 
        f = c(f, A), a = c(a, l), i = c(i, d), h = c(h, g);
    }
    return Array(f, a, i, h);
}

function n(r, n, t, u, e, o) {
    return c(f(c(c(n, r), c(u, o)), e), t);
}

function t(r, t, u, e, o, c, f) {
    return n(t & u | ~t & e, r, t, o, c, f);
}

function u(r, t, u, e, o, c, f) {
    return n(t & e | u & ~e, r, t, o, c, f);
}

function e(r, t, u, e, o, c, f) {
    return n(t ^ u ^ e, r, t, o, c, f);
}

function o(r, t, u, e, o, c, f) {
    return n(u ^ (t | ~e), r, t, o, c, f);
}

function c(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

function f(r, n) {
    return r << n | r >>> 32 - n;
}

function a(r) {
    for (var n = Array(), t = (1 << v) - 1, u = 0; u < r.length * v; u += v) n[u >> 5] |= (r.charCodeAt(u / v) & t) << u % 32;
    return n;
}

function i(r) {
    for (var n = h ? "0123456789ABCDEF" : "0123456789abcdef", t = "", u = 0; u < 4 * r.length; u++) t += n.charAt(r[u >> 2] >> u % 4 * 8 + 4 & 15) + n.charAt(r[u >> 2] >> u % 4 * 8 & 15);
    return t;
}

var h = 0, v = 8;

module.exports = {
    hex_md5: function(n) {
        return i(r(a(n), n.length * v));
    }
};