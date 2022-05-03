getApp();

Page({
    data: {
        currentIndex: 0,
        TabCur: 0,
        TabData: [ "视频解析", "操作步骤", "平台支持" ],
        loading: !0,
        tmpFileUrl: "null",
        parseUrl: "null",
        showUrl: "null",
        showTip: "show",
        showAction: "null",
        showAd: "show",
        showParse: "null",
        showStep: "null",
        showSupport: "null",
        isCustom: 0,
        isBack: 1,
        gridCol: 4
    },
    onLoad: function(t) {
        var s = t.theme;
        this.setData({
            theme: s || "blue"
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getLaunchOptionsSync();
        1007 != t.scene && 1008 != t.scene && 1011 != t.scene && 1012 != t.scene && 1013 != t.scene && 1014 != t.scene && 1017 != t.scene && 1025 != t.scene && 1031 != t.scene && 1032 != t.scene && 1036 != t.scene && 1044 != t.scene || this.setData({
            isCustom: 1,
            isBack: 0
        });
    },
    doParse: function() {
        var t = this;
        if (null != this.data.parseUrl && this.regUrl(this.data.placeHolder)) {
            if (this.data.parseUrl == this.data.parseUrl2) return;
            wx.showLoading({
                title: "正在解析视频"
            }), wx.request({
                url: "https://hkjys.5ids.vip/juhe.php",
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    url: this.data.parseUrl
                },
                success: function(s) {
                    console.log(s), 200 == s.data.status ? (t.setData({
                        successData: s,
                        okUrl: s.data.data.data.video,
                        showAd: "null",
                        showParse: "show",
                        parseUrl2: t.data.parseUrl,
                        precent: "null",
                        tmpFileUrl: "null"
                    }), wx.showToast({
                        title: "解析成功！！",
                        icon: "none",
                        duration: 2e3
                    })) : wx.showToast({
                        title: "抱歉！解析失败 (●ﾟωﾟ●)",
                        icon: "none",
                        duration: 2e3
                    });
                },
                fail: function() {
                    console.log("jx失败");
                }
            });
        } else wx.showToast({
            title: "输入框无有效链接",
            icon: "none",
            duration: 1e3
        });
    },
    clickUrl: function(t) {
        this.setData({
            showAction: "show",
            showUrl: "null",
            showTip: "null"
        });
    },
    clickTip: function(t) {
        var s = this;
        wx.getClipboardData({
            success: function(t) {
                var e = t.data;
                e.indexOf("http:") >= 0 || e.indexOf("https:") >= 0 ? wx.showModal({
                    title: "是否解析剪切板中的链接地址",
                    content: e,
                    success: function(t) {
                        t.confirm && (s.setData({
                            placeHolder: e,
                            showUrl: "show",
                            showTip: "null"
                        }), s.onInput());
                    }
                }) : wx.showToast({
                    title: "剪贴板无有效链接",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    delUrl: function(t) {
        this.setData({
            showAction: "null",
            showUrl: "null",
            showTip: "show"
        });
    },
    copyUrl1: function(t) {
        var s = this;
        wx.setClipboardData({
            data: t.currentTarget.dataset.begin_url,
            success: function(t) {
                s.setData({
                    showAction: "null",
                    showUrl: "show",
                    showTip: "null"
                }), wx.showToast({
                    title: "复制成功",
                    icon: "sucess",
                    duration: 1e3
                });
            }
        });
    },
    onInput: function() {
        var t = this.data.placeHolder;
        this.regUrl(t) && this.replaceReg(t);
    },
    tabSelect: function(t) {
        if ("navTag" == t.currentTarget.dataset.tag) s = t.currentTarget.dataset.id; else var s = t.detail.current;
        0 == s && (this.data.okUrl ? this.setData({
            showAd: "null",
            showParse: "show",
            showStep: "null",
            showSupport: "null"
        }) : this.setData({
            showAd: "show",
            showParse: "null",
            showStep: "null",
            showSupport: "null"
        })), 1 == s && this.setData({
            showAd: "null",
            showParse: "null",
            showStep: "show",
            showSupport: "null"
        }), 2 == s && this.setData({
            showAd: "null",
            showParse: "null",
            showStep: "null",
            showSupport: "show"
        }), this.setData({
            currentIndex: s,
            TabCur: s,
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1)
        });
    },
    replaceReg: function(t) {
        var s = this, e = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return t.replace(e, function(t) {
            s.setData({
                parseUrl: t
            });
        });
    },
    regUrl: function(t) {
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(t);
    },
    CopyUrl: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.ok_url,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 1e3
                });
            }
        });
    },
    postSave: function(t) {
        var s = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? s.download() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        s.download();
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "视频保存到相册需获取相册权限请允许开启权限",
                            confirmText: "确认",
                            cancelText: "取消",
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    download: function() {
        if ("null" != this.data.tmpFileUrl) this.saveFile(); else {
            wx.showToast({
                title: "开始下载",
                icon: "success",
                duration: 1e3
            });
            var t = this, s = "https://hkjys.5ids.vip/down.php?url=" + this.data.okUrl;
            wx.downloadFile({
                url: s,
                success: function(s) {
                    t.setData({
                        tmpFileUrl: s.tempFilePath
                    }), wx.saveVideoToPhotosAlbum({
                        filePath: s.tempFilePath,
                        success: function(s) {
                            t.setData({
                                precent: "100%"
                            }), wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 1e3
                            });
                        },
                        fail: function(t) {
                            console.log("保存失败", t);
                        }
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "文件过大",
                        icon: "none",
                        duration: 1e3
                    });
                }
            }).onProgressUpdate(function(s) {
                100 != s.progress && t.setData({
                    precent: s.progress + "%"
                });
            });
        }
    },
    saveFile: function() {
        wx.saveVideoToPhotosAlbum({
            filePath: this.data.tmpFileUrl,
            success: function(t) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 1e3
                });
            },
            fail: function(t) {
                console.log("保存失败", t);
            }
        });
    },
    faq: function(t) {
        this.setData({
            modalName: t.currentTarget.dataset.target
        });
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});