const duration = 2000
const appInstance = getApp()
const configurationService = appInstance.globalData["backendService"] + "/configuration"
Page({
  data: {
    configurations: {},
    weekth: ["第一个","第二个","第三个","第四个"],
    weekdays: ["周一","周二","周三","周四","周五","周六","周日"]
  },
  onLoad: function (options) {
    this.initConf()
  },
  restoreConf: function(e) {
    this.initConf()
  },
  submitConf: function(e) {
    var self = this
    tt.login({
      success:(res) =>{
        tt.request({
          "url": configurationService,
          "header": {
              "Authorization": res.code
          },
          "data": {
            "configurations": this.data.configurations
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
            self.initConf()
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
  },
  chooseChat: function(e) {
    let that = this;
    console.log(e)
    confType = e.currentTarget.dataset.elementType
    index = e.currentTarget.id
    tt.login({
      success: res => {
        console.log(JSON.stringify(res))
        if (res.code) {
          tt.chooseChat({
            selectType: 1,
            ignoreSelf: true,
            ignoreBot: true,
            success: res => {
              console.log(JSON.stringify(res))
              that.updateConf(confType, index, res.data[0])
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
      fail: function() {
        console.log(JSON.stringify(res))
        tt.showModal({
          title: 'login  failed'
        });
      }
    })
  },
  chooseContact: function(e) {
    let that = this;
    teamId = e.target.id
    console.log(e.target)
    tt.login({
      success: res => {
        console.log(JSON.stringify(res))
        if (res.code) {
          tt.chooseContact({
            multi: false,
            ignore: true,
            externalContact: false,
            success: result => {
              console.log(teamId)
              this.updateConf('leader', teamId, result.data[0])
              console.log(JSON.stringify(result))
            },
            fail(result) {
              console.log(JSON.stringify(result))
            }
          });
        } else {
          tt.showModal({
            title: 'local api call success, but login failed'
          });
        }
      },
      fail: function() {
        console.log(JSON.stringify(res))
        tt.showModal({
          title: 'login  failed'
        });
      }
    })
  },
  openSchema: function(e) {
    console.log('parameter:')
    console.log(e)
    schemaValue = ''
    switch (e.target.dataset.elementType) {
      case 'okr_folder':
        schemaValue = this.data.configurations.docs.okr_folder.url
        break
      case 'okr_template':
        schemaValue = this.data.configurations.docs.okr_template.url
        break
      case 'career_plan_folder':
        schemaValue = this.data.configurations.docs.career_plan_folder.url
        break
      case 'career_plan_template':
        schemaValue = this.data.configurations.docs.career_plan_template.url
        break
      case 'doc_template':
        schemaValue = this.data.configurations.schedules[e.target.id].doc_template.url
        break
      case 'doc_folder':
        schemaValue = this.data.configurations.schedules[e.target.id].doc_folder.url
        break      
    }
    console.log('schema to go:'+schemaValue)
    tt.openSchema({
      schema: schemaValue,
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });  
  },
  initConf: function() {
    var self = this
    tt.login({
      success:(res) =>{
        tt.request({
          "url": configurationService,
          "header": {
              "Authorization": res.code
          },
          "method": "GET",
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
            self.setData({
              configurations: result.data
            });
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
  },
  eventHandler: function(e) {
    this.updateConf(e.target.dataset.elementType, e.target.id, e.detail.value)
  },
  updateConf: function(confType, index, value) {
    console.log('parameter confType:'+confType)
    console.log('parameter index:'+index)
    console.log('parameter value:')
    console.log(value)
    console.log('current configurations:')
    console.log(this.data.configurations)
    switch (confType) {
      case 'kernelGroup':
        this.data.configurations.groups.kernel = {'id': value.id, 'name': value.name}
        break
      case 'teamGroup':
        this.data.configurations.groups.team = {'id': value.id, 'name': value.name}
        break
      case 'leader':
        this.data.configurations.teams[index].leader_id = value.openId
        this.data.configurations.teams[index].leader_name = value.name
        break
      case 'subTeamName':
        this.data.configurations.teams[index].name = value
        break
      case 'meeintg1on1Weekth':
        this.data.configurations.teams[index].meeting_1on1_weekth = value
        break
      case 'meeintg1on1Weekday':
        this.data.configurations.teams[index].meeting_1on1_weekday = value
        break
      case 'meeintg1on1Time':
        this.data.configurations.teams[index].meeting_1on1_time = value
        break
      case 'deleteTeam':
        this.data.configurations.teams.splice(index, 1)
        break
      case 'addTeam':
        this.data.configurations.teams.push({'name':'','leader_id':'','leader_name':'', 'meeting_1on1_weekth':'','meeting_1on1_weekday':'','meeting_1on1_time':''})
        break
      case 'notificationDate':
        this.data.configurations.schedules[index].notification_date = value
        break
      case 'notificationTime':
        this.data.configurations.schedules[index].notification_time = value
        break
      case 'readyDate':
        this.data.configurations.schedules[index].ready_date = value
        break
      case 'readyTime':
        this.data.configurations.schedules[index].ready_time = value
        break
      case 'startDate':
        this.data.configurations.schedules[index].start_date = value
        break
      case 'startTime':
        this.data.configurations.schedules[index].start_time = value
        break
      case 'kernelMessageTemplate':
        this.data.configurations.schedules[index].kernel_content = value
        break
      case 'teamMessageTemplate':
        this.data.configurations.schedules[index].team_content = value
        break
      case 'cwm':
        this.data.configurations.cancelled_weekly_meetings[index].cancelled_notification_date = value
        break
      case 'deleteCWM':
        this.data.configurations.cancelled_weekly_meetings.splice(index, 1)
        break
      case 'addCWM':
        this.data.configurations.cancelled_weekly_meetings.push({'cancelled_notification_date':''})
        break
    }
    this.setData({
      configurations: this.data.configurations
    })
    console.log('updated configurations:')
    console.log(this.data.configurations)
  }


})