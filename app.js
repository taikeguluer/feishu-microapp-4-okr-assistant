App({
  onLaunch: function (args) {
  },
  onShow: function (args) {
    let updateManager = tt.getUpdateManager();
    updateManager.onCheckForUpdate((result) => {
      console.log('is there any update?：' + result.hasUpdate);
    });
    updateManager.onUpdateReady((result) => {
      tt.showModal({
        title: 'Update infomation',
        content: 'new version is ready, do you want to restart app?',
        success: res => {
          console.log(JSON.stringify(res))
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      })
    });
    updateManager.onUpdateFailed((result) => {
      console.log('mini program update failed');
    });
  },
  onHide: function () {
  },
  globalData: {
    backendService: "https://5de5-223-72-56-163.ngrok.io/api/v1",
    configurations: {},
    userInfo: {},
    robotInfo: {},
    hasLogin: false,
    openid: null,
    appId: 'cli_a22ed44fe138500c' 
  }
})
