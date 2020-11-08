function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return [ year, month, day ].map(formatNumber).join("/") + " " + [ hour, minute, second ].map(formatNumber).join(":");
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : "0" + n;
}

function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
			gapTime = 1500;
	}
	var _lastTime = null;
	// 返回新的函数
			return function() {
			var _nowTime = +new Date();
			if (_nowTime - _lastTime > gapTime || !_lastTime) {
					fn.apply(this, arguments);
					//将this和参数传给原函数
											_lastTime = _nowTime;
			}
	};
}

function createInterstitialAd () {
  if (wx.createInterstitialAd) {
    const interstitialAd = wx.createInterstitialAd({
      adUnitId: '694734d7be8c703dd7e8833d1c167138'
    })
    if (!interstitialAd) return;
    interstitialAd.onLoad(() => {
      interstitialAd.show(() => {
        // if (interstitialAd.destroy) interstitialAd.destroy();
      }).catch(err => {
        console.log("interstitialAd_err", err);
        // if (interstitialAd.destroy) interstitialAd.destroy();
      })
    })
  }
}

module.exports = {
	formatTime: formatTime,
	throttle: throttle,
	createInterstitialAd: createInterstitialAd
}