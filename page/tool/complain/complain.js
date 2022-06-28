var common = require('../../../common/common.js')
var appInstance = common.appInstance
var toolService = common.toolService
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orgInfo: {},
        content: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    chooseChat: function () {
        console.log("选择")
        let that = this;
        tt.login({
            success: res => {
                console.log(JSON.stringify(res))
                if (res.code) {
                    tt.chooseChat({
                        selectType: 1,
                        ignoreSelf: true,
                        ignoreBot: true,
                        success: res => {
                            that.setData({
                                orgInfo: res.data[0]
                            })
                        },
                        fail(res) {
                            console.log(JSON.stringify(res))
                        }
                    })
                } else {
                    tt.showModal({
                        title: 'local api call success, but login failed'
                    });
                }
            },
            fail: function () {
                console.log(JSON.stringify(res))
                tt.showModal({
                    title: 'login  failed'
                });
            }
        })
    },

    eventHandler: function (e) {
        var that = this
        switch (e.target.id) {
            case 'cancelledBtn':
                tt.navigateBack({
                    delta: 1,
                    success(res) {
                        console.log(JSON.stringify(res));
                    },
                    fail(res) {
                        console.log(`navigateBack fail: ${JSON.stringify(res)}`);
                    }
                })
                break
            case 'submitBtn':
                tt.login({
                    success: (res) => {
                        tt.request({
                            "url": toolService,
                            "header": {
                                "Authorization-Code": res.code
                            },
                            "data": {
                                "actions": { "complain": { "user_name": appInstance.globalData["userInfo"].name, "group_id": that.data.orgInfo.id, "content": that.data.content } }
                            },
                            "method": "POST",
                            "dataType": "json",
                            "responseType": "text",
                            success: function (result) {
                                tt.navigateBack({
                                    delta: 1,
                                    success(res) {
                                        console.log(JSON.stringify(res));
                                    },
                                    fail(res) {
                                        console.log(`navigateBack fail: ${JSON.stringify(res)}`);
                                    }
                                })
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
                break
            case 'chooseChat':
                that.chooseChat()
                break
            case 'contentChange':
                that.data.content = e.detail.value
                break

        }
    }
})