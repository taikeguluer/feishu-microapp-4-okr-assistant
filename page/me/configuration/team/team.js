var common = require('../../../../common/common.js')
var appInstance = common.appInstance
var navigateTo = common.navigateTo
var commitConf = common.commitConf

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTeams: [],
        teams: [],
        confChanged: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            currentTeams: appInstance.globalData["configurations"].teams,
            teams: appInstance.globalData["configurations"].teams
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
        this.setData({ teams: appInstance.globalData["configurations"].teams })
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
        if (this.data.confChanged) {
            appInstance.globalData["configurations"].teams = appInstance.globalData["configurations"].teams.filter(item => {
                return item.name != "" && item.leader_id != "" && item.leader_name != "" && item.meeting_1on1_weekth != "" && item.meeting_1on1_weekday != "" && item.meeting_1on1_time != ""
            })
            commitConf("teams", appInstance.globalData["configurations"].teams, this.committed, this.rollback)
        }
    },
    committed: function () {
        this.data.confChanged = false
    },
    rollback: function () {
        appInstance.globalData["configurations"].teams = currentTeams
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
            case 'goDetail':
                navigateTo("/page/me/configuration/team/teamdetail/teamdetail?teamindex=" + e.currentTarget.id)
                break
            case 'delItem':
                appInstance.globalData["configurations"].teams.splice(e.currentTarget.id, 1)
                this.setData({ teams: appInstance.globalData["configurations"].teams, confChanged: true })
                break
            case 'addItem':
                appInstance.globalData["configurations"].teams.push({ 'name': '', 'leader_id': '', 'leader_name': '', 'meeting_1on1_weekth': '', 'meeting_1on1_weekday': '', 'meeting_1on1_time': '' })
                this.setData({ teams: appInstance.globalData["configurations"].teams, confChanged: true })
                break
        }
    }

})