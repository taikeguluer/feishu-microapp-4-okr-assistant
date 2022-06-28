var common = require('../../common/common.js')
var navigateTo = common.navigateTo
var appInstance = common.appInstance
var configurationService = common.configurationService

Page({

    data: {
        userInfo: appInstance.globalData["userInfo"],
        userName: appInstance.globalData["userInfo"].name,//.slice(0, appInstance.globalData["userInfo"].name.search("\\("))        
        jobTitle: ''
    },

    onLoad: function (options) {
        this.initUser()
    },

    initUser: function () {
        var self = this
        console.log(self.data.userInfo)
        /*if (self.data.userInfo.job_title != "") {
            self.setData({
                jobTitle: self.data.userInfo.job_title
            })
            self.data.jobTitle = self.data.userInfo.job_title
        } else {
            for (var i = 0; i < self.data.userInfo.custom_attrs.length; i++) {
                if (self.data.userInfo.custom_attrs[i].id == "C-6798392334057750530") {
                    self.setData({
                        jobTitle: self.data.userInfo.custom_attrs[i].value.text
                    })
                    break
                }
            }

        }*/
        self.initConf()
    },
    initConf: function () {
        var that = this
        tt.login({
            success: (res) => {
                tt.request({
                    "url": configurationService,
                    "header": {
                        "Authorization-Code": res.code,
                        "Content-Type": "text/plain"
                    },
                    "method": "GET",
                    success: function (result) {
                        console.log(result.data)
                        if (result.data.errno == 1) {
                            appInstance.globalData["configurations"] = result.data.configurations
                        } else if (result.data.errno == 2) {
                            that.initConf()
                        }
                    },
                    fail: function ({ errMsg }) {
                        console.log('request fail', errMsg)
                    },
                    complete(res) {
                        console.log("complete:" + res)
                    }
                })
            },
            fail(res) {
                console.log(`login fail`);
            }
        })
    },
    eventHandler: function (e) {
        var that = this
        console.log(e)
        console.log(e.target)
        switch (e.currentTarget.id) {
            case 'goConf':
                navigateTo("/page/me/configuration/index")
                break
            case 'cancelAccount':
                tt.showModal({
                    "content": "永久性注销您的OKR助理，注销成功后该账号将无法使用，账号下的所有设置数据将被删除",
                    "confirmText": "注销",
                    "cancelText": "取消",
                    "showCancel": true,
                    success(res) {
                        console.log(JSON.stringify(res));
                        if (res.confirm) {
                            tt.login({
                                success: (res) => {
                                    tt.request({
                                        "url": configurationService,
                                        "header": {
                                            "Authorization-Code": res.code,
                                            "Content-Type": "text/plain"
                                        },
                                        "method": "DELETE",
                                        "dataType": "json",
                                        "responseType": "text",
                                        success: function (result) {
                                            console.log(result.data)
                                        },
                                        fail: function ({ errMsg }) {
                                            console.log('request fail', errMsg)
                                        },
                                        complete(res) {
                                            console.log("complete:" + res)
                                        }
                                    })
                                    tt.redirectTo({
                                        "url": "/page/activation",
                                        success(res) {
                                            console.log(JSON.stringify(res));
                                        },
                                        fail(res) {
                                            console.log(`redirectTo fail: ${JSON.stringify(res)}`);
                                        }
                                    });
                                },
                                fail(res) {
                                    console.log(`login fail`);
                                }
                            })
                        }
                    },
                    fail(res) {
                        console.log(`showModal fail: ${JSON.stringify(res)}`);
                    }
                });
                break
        }
    },

    goConf: function () {
        tt.navigateTo({
            "url": "/page/me/configuration/index",
            success(res) {
                console.log(JSON.stringify(res));
            },
            fail(res) {
                console.log(`navigateTo fail: ${JSON.stringify(res)}`);
            }
        });
    },

    cancelAccount: function () {
        console.log("to be done")
    }

})