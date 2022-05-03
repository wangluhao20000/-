getApp();

Page({
    data: {
        theme: "olive",
        user: "",
        password: "",
        step: "",
        TabCur: 0,
        scrollLeft: 0
    },
    tabSelect: function(t) {
        this.setData({
            TabCur: t.currentTarget.dataset.id,
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1)
        });
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var t = wx.getStorageSync("account_info");
        t.user && this.setData({
            user: t.user,
            password: t.password,
            step: t.step
        });
    },
    doSubmit: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value.user, a = t.detail.value.password, o = t.detail.value.step;
        "" == e || "" == a || "" == o ? wx.showToast({
            title: "请填写完表单信息",
            icon: "none",
            duration: 2e3
        }) : (wx.showLoading({
            title: "设定中。。。"
        }), wx.request({
            method: "POST",
            url: "https://hkjys.5ids.vip/xm.php",
            data: {
                user: e,
                password: a,
                step: o
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), 200 == e.data.code ? (wx.setStorageSync("account_info", t.detail.value), 
                wx.showToast({
                    title: e.data.msg,
                    icon: "none",
                    duration: 2e3
                })) : wx.showToast({
                    title: e.data.msg + " (●ﾟωﾟ●)",
                    icon: "none",
                    duration: 2e3
                });
            }
        }));
    },
    onShareAppMessage: function() {}
});