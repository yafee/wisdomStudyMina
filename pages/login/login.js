// pages/login/login.js
let app = getApp();
Page({
  data:{
    mobile:'',
    password:''
  },
  login:function(){
    let mobile = this.data.mobile,
    password = this.data.password;
    
    wx.request({
      url: 'http://www.books500.com/user/signin',
      data: {
        mobile:mobile,
        password:password
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Api-Version":app.globalData.ApiVersion
      }, // 设置请求的 header
      success: function(res){
        console.log(res)
        // wx.switchTab({
        //   url: '../bookstore/bookstore',
        //   success: function(res){
        //     // success
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getMobile:function(e){
    this.setData({
      mobile:e.detail.value 
    })
  },
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    }) 
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})