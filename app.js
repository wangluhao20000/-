App({
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.globalData.StatusBar = a.statusBarHeight;
                var o = wx.getMenuButtonBoundingClientRect();
                o ? (t.globalData.Custom = o, t.globalData.CustomBar = o.bottom + o.top - a.statusBarHeight) : t.globalData.CustomBar = a.statusBarHeight + 50;
            }
        });
    },
    globalData: {
        userInfo: null
    }
});

var t = null;

wx.createInterstitialAd && ((t = wx.createInterstitialAd({
    adUnitId: "adunit-29e54dd5c16604fb"
})).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {})), 
t && t.show().catch(function(t) {
    console.error(t);
});