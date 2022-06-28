var common = require('../../../../common/common.js')
var appInstance = common.appInstance
var commitConf = common.commitConf

Page({

    /**
     * 页面的初始数据
     */
    data: {
        groups: appInstance.globalData["configurations"].groups,
        confChanged: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("gourps:")
        console.log(this.data.groups)
        console.log(appInstance.globalData["configurations"].groups)
        this.setData({
            groups: appInstance.globalData["configurations"].groups
        })
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
        if (this.data.confChanged) {
            commitConf("groups", this.data.groups, this.committed, this.rollback)
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.confChanged) {
            commitConf("groups", this.data.groups, this.committed, this.rollback)
        }
    },
    committed: function () {
        this.data.confChanged = false
    },
    rollback: function () {

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
    eventHandler: function (e) {
        let that = this;
        tt.login({
            success: res => {
                console.log(JSON.stringify(res))
                if (res.code) {
                    tt.chooseChat({
                        selectType: 1,
                        ignoreSelf: true,
                        ignoreBot: true,
                        success: res4choose => {
                            console.log(res4choose)
                            if (res4choose.data[0].id != "") {
                                this.data.groups[e.currentTarget.id] = { "id": res4choose.data[0].id, "name": res4choose.data[0].name, "type": e.currentTarget.id }
                                this.setData({
                                    groups: this.data.groups,
                                    confChanged: true
                                })
                            }
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
    }

})