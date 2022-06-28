var common = require('../../../../../common/common.js')
var appInstance = common.appInstance
var openSchema = common.openSchema
var commitConf = common.commitConf
Page({

    /**
     * 页面的初始数据
     */
    data: {
        schedule: {},
        month: '',
        confChanged: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            month: options.month,
            schedule: appInstance.globalData["configurations"]["schedules"][options.month]
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
            schedules = appInstance.globalData["configurations"]["schedules"]
            schedules[this.data.month] = this.data.schedule
            commitConf("schedules", schedules, this.committed, this.rollback)
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.confChanged) {
            schedules = appInstance.globalData["configurations"]["schedules"]
            schedules[this.data.month] = this.data.schedule
            commitConf("schedules", schedules, this.committed, this.rollback)
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
        var that = this
        console.log(e)
        console.log(e.target)
        switch (e.currentTarget.id) {
            case 'notification_time':
                that.data.schedule.notification_time = e.detail.value
                that.data.confChanged = true
                break
            case 'notification_date':
                that.data.schedule.notification_date = e.detail.value
                that.data.confChanged = true
                break
            case 'ready_time':
                that.data.schedule.ready_time = e.detail.value
                that.data.confChanged = true
                break
            case 'ready_date':
                that.data.schedule.ready_date = e.detail.value
                that.data.confChanged = true
                break
            case 'start_time':
                that.data.schedule.start_time = e.detail.value
                that.data.confChanged = true
                break
            case 'start_date':
                that.data.schedule.start_date = e.detail.value
                that.data.confChanged = true
                break
            case 'doc_template':
                openSchema(that.data.schedule.doc_template.url)
                break
            case 'doc_folder':
                openSchema(that.data.schedule.doc_folder.url)
                break
            case 'kernel_content':
                that.data.schedule.kernel_content = e.detail.value
                that.data.confChanged = true
                break
            case 'team_content':
                that.data.schedule.team_content = e.detail.value
                that.data.confChanged = true
                break
        }
        that.setData({
            schedule: this.data.schedule
        })
    }
})