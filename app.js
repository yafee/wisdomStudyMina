//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    let that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // getUserInfo:function(){
  //   let _this =this;
  //   if(!this.globalData.userInfo){
  //     wx.login({
  //       success: function(res){
  //         console.log(res.code)
  //         wx.getUserInfo({
  //           success: function(data){
  //             // console.log(data.userInfo)
  //             _this.globalData.userInfo = data.userInfo;
  //             wx.request({
  //               url: 'https://api.weixin.qq.com/sns/jscode2session',
  //               data: {
  //                 appid:'wx0542a5686b774cbc',
  //                 secret:'208b6b1e94c117bd271122b506c6d724',
  //                 js_code:res.code,
  //                 grant_type:'authorization_code'
  //               },
  //               method: 'GET',
  //               success: function(res){
  //                 _this.globalData.openId = res.data.openid;
  //                 // console.log(res.data.openid)
  //               },
  //               fail: function() {
  //                 console.log('获取openid失败！');
  //               },
  //               complete: function() {
  //                 // complete
  //               }
  //             })
  //           },
  //           fail: function() {
  //             console.log('获取用户信息失败！');
  //           },
  //           complete: function() {
  //             // complete
  //           }
  //         })
  //       },
  //       fail: function() {
  //         console.log('登录失败！');
  //       },
  //       complete: function() {
  //         // complete
  //       }
  //     })
  //   }
  // },
  globalData:{
    userInfo:null,
    openId:null,
    ApiVersion:'2.0'
  }
})