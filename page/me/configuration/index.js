var common = require('../../../common/common.js')
var appInstance = common.appInstance
var navigateTo = common.navigateTo
var openSchema = common.openSchema

Page({

    /**
     * 页面的初始数据
     */
    data: {

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
    eventHandler: function (e) {
        var that = this
        console.log(e)
        console.log(e.target)
        switch (e.currentTarget.id) {
            case 'goGroup':
                navigateTo("/page/me/configuration/group/group")
                break
            case 'goTeam':
                navigateTo("/page/me/configuration/team/team")
                break
            case 'goWeekly':
                navigateTo("/page/me/configuration/weekly/weekly")
                break
            case 'goMonthly':
                navigateTo("/page/me/configuration/monthly/monthly")
                break
            case 'okr_folder':
                openSchema(appInstance.globalData["configurations"].docs.okr_folder.url)
                break
            case 'okr_template':
                openSchema(appInstance.globalData["configurations"].docs.okr_template.url)
                break
            case 'career_plan_folder':
                openSchema(appInstance.globalData["configurations"].docs.career_plan_folder.url)
                break
            case 'career_plan_template':
                openSchema(appInstance.globalData["configurations"].docs.career_plan_template.url)
                break
        }
    }

})