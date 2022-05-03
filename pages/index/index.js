getApp();

Page({
    data: {
        theme: "green",
        list: [ {
            title: "🏃运动目标",
            img: "https://s3.bmp.ovh/imgs/2021/10/233bf7f747dba166.jpg",
            url: "/pages/sport/index"
        }, {
            title: "🥤去除水印",
            img: "https://s3.bmp.ovh/imgs/2021/10/9b36bf5f9f4ad240.jpg",
            url: "/pages/parse/index"
        }, {
            title: "🥤点外卖先领券",
            img: "https://1.s91i.faiusr.com/4/AFsIkK06EAQYACDI1bD0BSiwz5SSBjDuBTigAg!800x800.png?_tm=3&v=1586244299523",
            url: "/pages/ele2/index"
        }]
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {},
    doSubmit: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value.user, o = t.detail.value.password, a = t.detail.value.step;
        "" == e || "" == o || "" == a ? wx.showToast({
            title: "请填写完表单信息",
            icon: "none",
            duration: 2e3
        }) : (wx.showLoading({
            title: "提交中。。。"
        }), wx.request({
            method: "POST",
            url: "https://hkjys.5ids.vip/xm.php",
            data: {
                user: e,
                password: o,
                step: a
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
    toChild: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: e
        });
    },
    onShareAppMessage: function() {}
});