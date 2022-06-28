var common = require('../../../../../common/common.js')
var appInstance = common.appInstance
var commitConf = common.commitConf
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cancelledWeeklyMeetings: {},
        confChanged: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cancelledWeeklyMeetings: appInstance.globalData["configurations"]["cancelled_weekly_meetings"]
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
            this.data.cancelledWeeklyMeetings = this.data.cancelledWeeklyMeetings.filter(item => {
                return item.cancelled_notification_date != ""
            })
            commitConf("cancelled_weekly_meetings", this.data.cancelledWeeklyMeetings, this.committed, this.rollback)
        }
    },
    committed: function () {
        this.data.confChanged = false
    },
    rollback: function () {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.confChanged) {
            this.data.cancelledWeeklyMeetings = this.data.cancelledWeeklyMeetings.filter(item => {
                return item.cancelled_notification_date != ""
            })
            commitConf("cancelled_weekly_meetings", this.data.cancelledWeeklyMeetings, this.committed, this.rollback)
        }
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
        //this.updateConf(e.target.dataset.elementType, e.target.id, e.detail.value)
        switch (e.currentTarget.dataset.elementType) {
            case 'cwm':
                this.data.cancelledWeeklyMeetings[e.currentTarget.id].cancelled_notification_date = e.detail.value
                this.setData({ cancelledWeeklyMeetings: this.data.cancelledWeeklyMeetings, confChanged: true })
                break
            case 'deleteCWM':
                this.data.cancelledWeeklyMeetings.splice(e.currentTarget.id, 1)
                this.setData({ cancelledWeeklyMeetings: this.data.cancelledWeeklyMeetings, confChanged: true })
                break
            case 'addCWM':
                this.data.cancelledWeeklyMeetings.push({ 'cancelled_notification_date': '' })
                this.setData({ cancelledWeeklyMeetings: this.data.cancelledWeeklyMeetings, confChanged: true })
                break
        }
    }

})