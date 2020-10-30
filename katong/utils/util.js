const config = require('./config.js')

function createInterstitialAd () {
    if (wx.createInterstitialAd && config.config.adUnitId) {
        const interstitialAd = wx.createInterstitialAd({
            adUnitId: config.config.adUnitId
        })
        if (!interstitialAd) return;
        interstitialAd.onLoad(() => {
            interstitialAd.show(() => {
                if (interstitialAd.destroy) interstitialAd.destroy();
            }).catch(err => {
                console.log("interstitialAd_err", err);
                if (interstitialAd.destroy) interstitialAd.destroy();
            })
        })
    }
}

module.exports = {
    createInterstitialAd: createInterstitialAd
};