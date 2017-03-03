//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs);
    let _this = this;
    this.globalData.url = 'http://101.200.167.37:1340';
    this.getUserInfo(
      function(wxInfo,code){
        // console.log(wxInfo)
        // console.log(code);
        wx.request({
          url: _this.globalData.url+'/wx/user/signin',
          data: {
            js_code:code,
            rawData:wxInfo.rawData,
            signature:wxInfo.signature,
            encryptedData:wxInfo.encryptedData,
            iv:wxInfo.iv
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res)
            wx.setStorageSync('userId',res.data.data.id);
            wxInfo.js_code = code;
            wx.setStorageSync('wxInfo',wxInfo);
            _this.globalData.isBind = res.data.data.bind_mobile;
            if(!_this.globalData.isBind){
               wx.navigateTo({
                url: 'pages/login/login'
              })
            } else {
              wx.setStorageSync('token', res.data.data.token);
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    );
  },
  getUserInfo:function(cb){
    let that = this;
    // console.log(wx.getStorageSync('wxInfo'))
    // if(wx.getStorageSync('wxInfo')){
    //   typeof cb == "function" && cb(wx.getStorageSync('wxInfo'),null)
    // }else{
      //调用登录接口
      wx.login({
        success: function (data) {
          let code = data.code;
          wx.getUserInfo({
            success: function (res) {
              typeof cb == "function" && cb(res,code)
            }
          })
        }
      })
    // }
  },
  globalData:{
    openId:null,
    ApiVersion:'2.0',
    url:'',
    isBind:''
  }
})