var common = require('../../../../../common/common.js')
var appInstance = common.appInstance
Page({

    /**
     * 页面的初始数据
     */
    data: {
        team: {},
        weekth: ["第一个", "第二个", "第三个", "第四个", "第五个"],
        weekdays: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        teamIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teamIndex: options.teamindex,
            team: appInstance.globalData["configurations"]["teams"][options.teamindex]
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
        appInstance.globalData["configurations"]["teams"][this.data.teamIndex] = this.data.team
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        appInstance.globalData["configurations"]["teams"][this.data.teamIndex] = this.data.team
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
        switch (e.currentTarget.id) {
            case 'leader':
                tt.chooseContact({
                    multi: false,
                    ignore: true,
                    externalContact: false,
                    success: result => {
                        this.data.team.leader_id = result.data[0].openId
                        this.data.team.leader_name = result.data[0].name
                        this.setData({ team: this.data.team })
                        console.log(JSON.stringify(result))
                    },
                    fail(result) {
                        console.log(JSON.stringify(result))
                    }
                });
                break
            case 'subTeamName':
                this.data.team.name = e.detail.value
                break
            case 'meeintg1on1Weekth':
                this.data.team.meeting_1on1_weekth = e.detail.value
                break
            case 'meeintg1on1Weekday':
                this.data.team.meeting_1on1_weekday = e.detail.value
                break
            case 'meeintg1on1Time':
                this.data.team.meeting_1on1_time = e.detail.value
                break
        }
        this.setData({ team: this.data.team })
    },

})