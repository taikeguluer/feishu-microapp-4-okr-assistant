var common = require('../common/common.js')
var navigateTo = common.navigateTo
var appInstance = common.appInstance
var activationService = common.activationService

Page({
  data: {
    isLogin: false,
    userInfo: {},
    robotInfo: {},
    lastName: '',
    authAgreement: false,
    introDisplay: false,
    directorReplyDisplay: false,
    cardMesDisplay: false
  },

  onLoad: function () {
    this.toLogin()
  },

  initUser: function (code) {
    var self = this
    console.log(activationService)
    tt.request({
      "url": activationService,
      "header": {
        "Authorization-Code": code,
        "Content-Type": "text/plain"
      },
      "method": "GET",
      success: function (result) {
        console.log(result.statusCode)
        console.log(result.data.director_info)
        appInstance.globalData["userInfo"] = result.data.director_info
        appInstance.globalData["robotInfo"] = result.data.bot
        if (result.data.activated) {
          tt.switchTab({
            url: '/page/me/index',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          self.setData({
            robotInfo: appInstance.globalData["robotInfo"],
            userInfo: appInstance.globalData["userInfo"],
            lastName: appInstance.globalData["userInfo"].name.slice(0, 1)
          })
          self.setData({
            introDisplay: true,
          })
          setTimeout(function () { self.setData({ directorReplyDisplay: true }) }, 500)
          setTimeout(function () { self.setData({ cardMesDisplay: true }) }, 1000)
        }
      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      },
      complete(res) { }
    })
  },

  activateUser: function () {
    var self = this
    tt.login({
      success: (res) => {
        tt.request({
          "url": activationService,
          "header": {
            "Authorization-Code": res.code,
            "Content-Type": "text/plain"
          },
          "method": "POST",
          success: function (result) {
            tt.switchTab({
              url: '/page/me/index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
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
  },

  toLogin() {
    tt.login({
      success: (res) => {
        this.setData({
          isLogin: true
        })
        this.initUser(res.code)
      },
      fail(res) {
        console.log(`login fail`);
      }
    });
  },

  authAgreementChange: function (e) {
    this.setData({
      authAgreement: e.detail.value[0] == 'authAgreement'
    })
  },

  justComplain: function () {
    navigateTo("/page/tool/complain/complain")
  }

})
