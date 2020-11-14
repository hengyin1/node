var CosAuth = require('./cos-auth.js');
var config = {
	Bucket: 'pic-1253504664',
	Region: 'ap-shanghai',
	stsUrl: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/credentials'
};

// 请求用到的参数
var prefix = 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com/';

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};

// 获取临时密钥
var stsCache;
var getCredentials = function (callback, reject) {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
        callback(stsCache.credentials);
        return;
    }
    wx.request({
        method: 'GET',
        url: config.stsUrl, // 服务端签名，参考 server 目录下的两个签名例子
        dataType: 'json',
        success: function (result) {
            var data = result.data;
            var credentials = data.credentials;
            if (credentials) {
                stsCache = data
            } else {
				reject('上传失败，请稍后再试');
            }
            callback(stsCache && stsCache.credentials);
        },
        error: function (err) {
			reject('上传失败，请稍后再试');
        }
    });
};

// 计算签名
var getAuthorization = function (options, callback, reject) {
    getCredentials(function (credentials) {
        callback({
            XCosSecurityToken: credentials.sessionToken,
            Authorization: CosAuth({
                SecretId: credentials.tmpSecretId,
                SecretKey: credentials.tmpSecretKey,
                Method: options.Method,
                Pathname: options.Pathname,
            })
        });
    }, reject);
};

// 上传文件
export var uploadFile = function (filePath, filePrefix) {
	return new Promise((resolve, reject) => {
        // var Key = filePrefix + filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
        var Key = filePrefix + randomString() + getExtand(filePath); // 这里指定上传的文件名
		getAuthorization({Method: 'POST', Pathname: '/'}, function (AuthData) {
			var requestTask = wx.uploadFile({
				url: prefix,
				name: 'file',
				filePath: filePath,
				formData: {
					'key': Key,
					'success_action_status': 200,
					'Signature': AuthData.Authorization,
					'x-cos-security-token': AuthData.XCosSecurityToken,
					'Content-Type': '',
				},
				success: function (res) {
					var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
					console.log(url);
					if (res.statusCode === 200) {
						resolve(url);
					} else {
						reject('上传失败，请稍后再试');
					}
				},
				fail: function (res) {
					reject('上传失败，请稍后再试');
				}
			});
			requestTask.onProgressUpdate(function (res) {
				console.log('正在进度:', res);
			});
		}, reject);
	});
};

/* 随机生产字符串 */
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 获取扩展名
function getExtand(path) {
    var index1 = path.lastIndexOf(".");
    var index2 = path.length;
    return path.substring(index1, index2);
}