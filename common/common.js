const appInstance = getApp()
const configurationService = appInstance.globalData["backendService"] + "/configuration"
const activationService = appInstance.globalData["backendService"] + "/activation"
const toolService = appInstance.globalData["backendService"] + "/tool"

function commitConf(key, value, committed, rollback) {
  tt.login({
    success: res => {
      if (res.code) {
        conf = {}
        conf[key] = value
        console.log(conf)
        tt.request({
          "url": configurationService,
          "header": {
            "Authorization-Code": res.code
          },
          "data": {
            "configurations": conf
          },
          "method": "POST",
          "dataType": "json",
          "responseType": "text",
          success: function (result) {
            console.log(result.data)
            if (result.data.errno == 1) {

              appInstance.globalData["configurations"][key] = value
              committed()
            }
            else {
              rollback()
            }
          },
          fail: function ({ errMsg }) {
            console.log('request fail', errMsg)
            rollback()
          },
          complete(res) {
            console.log("complete:" + res)
          }
        })
      } else {
        rollback()
        tt.showModal({
          title: 'local api call success, but login failed'
        });
      }
    },
    fail: function () {
      rollback
      console.log(JSON.stringify(res))
      tt.showModal({
        title: 'login  failed'
      });
    }
  })

}
function navigateTo(url) {
  console.log('url to navigate:' + url)
  tt.navigateTo({
    "url": url,
    success(res) {
      console.log(JSON.stringify(res));
    },
    fail(res) {
      console.log(`navigateTo fail: ${JSON.stringify(res)}`);
    }
  })
}
function openSchema(schema) {
  console.log('schema to open:' + schema)
  tt.openSchema({
    schema: schema,
    external: true,
    success(res) {
      console.log(JSON.stringify(res));
    },
    fail(res) {
      console.log(`openSchema fail: ${JSON.stringify(res)}`);
    }
  })
}

module.exports = {
  commitConf: commitConf,
  navigateTo: navigateTo,
  openSchema: openSchema,
  appInstance: appInstance,
  configurationService: configurationService,
  activationService: activationService,
  toolService: toolService
}

//var common = require('../common/common.js')
//var commitConf = common.commitConf
//var navigateTo = common.navigateTo
//var openSchema = common.openSchema
//var appInstance = common.appInstance
//var configurationService = common.configurationService
//var activationService = common.activationService
//var toolService = common.toolService
