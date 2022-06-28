const duration = 2000
const appInstance = getApp()
const toolService = appInstance.globalData["backendService"] + "/tool"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        group: "kernel",
        singleChat: false,
        careerPlan: false,
        taskDate: "2022-03-02",
        taskTime: "19:04",
        hasTask: false,
        contacts: [],
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
  groupChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
    this.data.group = e.detail.value
    console.log(this.data.group)
  },
  singleChatChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
    if(e.detail.value[0] == 'singleChat')
    {    
      this.data.singleChat = true
    }   
    else
    {
       this.data.singleChat = false
       
    }
    console.log(this.data.singleChat)
  },
  hasTaskChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
    if(e.detail.value[0] == 'hasTask')
    {    
      this.data.hasTask = true
    }   
    else
    {
       this.data.hasTask = false
       
    }
        this.setData({
          hasTask: this.data.hasTask
        })
    console.log(this.data.hasTask)
  },
  isCPChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
    if(e.detail.value[0] == 'careerPlan')
    {    
      this.data.careerPlan = true
    }   
    else
    {
        this.data.careerPlan = false
       
    }
    console.log(this.data.careerPlan)
  },
    taskTimeChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
        this.setData({
          taskTime: e.detail.value
        })
    console.log(this.data.taskTime)
  },
    taskDateChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
        this.setData({
          taskDate: e.detail.value
        })
    console.log(this.data.taskDate)
  },
     contentChange: function(e) {
    console.log('Radio emmit change event，value ：', e.detail.value)
        this.setData({
          content: e.detail.value
        })
    console.log(this.data.content)
  },
     chooseContacts: function(e) {
        tt.login({
            success: res => {
                console.log(JSON.stringify(res))
                if (res.code) {
                    tt.chooseContact({
                        multi: true,
                        ignore: true,
                        externalContact: false,
                        success: res => {
                            console.log(JSON.stringify(res))
                            this.setData({
                                contacts: res.data
                            });
                        },
                        fail(res) {
                            console.log(JSON.stringify(res))
                        }
                    });
                } else {
                    tt.showModal({
                        title: 'local api call success, but login failed'
                    });
                }
            },
            fail: res => {
                console.log(JSON.stringify(res))
                tt.showModal({
                    title: 'login failed'
                });
            }
        });
    },
      submitMes: function(e) {
    var self = this
    tt.login({
      success:(res) =>{
        tt.request({
          "url": toolService,
          "header": {
              "Authorization": res.code
          },
          "data": {
            "group": this.data.group,
        "singleChat": this.data.singleChat,
        "careerPlan": this.data.careerPlan,
        "taskDate": this.data.taskDate,
        "taskTime": this.data.taskTime,
        "hasTask": this.data.hasTask,
        "contacts": this.data.contacts,
        "content": this.data.content

          },          
          "method": "POST",
          "dataType": "json",
          "responseType": "text",
          success: function(result) {
            tt.showToast({
              title: 'request success',
              icon: 'success',
              mask: true,
              duration: duration
            })
            console.log('request success', result)
          },
          fail: function({errMsg}) {
            console.log('request fail', errMsg)
          }, 
          complete (res) {
            console.log("complete:"+res)
          }
        })
      },
      fail (res) {
        console.log(`login fail`);
      }
    })
  }






})