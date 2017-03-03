// pages/login/login.js
let app = getApp();
Page({
  data:{
    mobile:'',
    code:'',
    codeBtnVal:'获取验证码',
    disabledCode:false
  },
  bindMobile:function(){
    let mobile = this.data.mobile,
    code = this.data.code;
    let wxInfo = wx.getStorageSync('wxInfo');
    wx.login({
      success: function(res){
       wx.request({
          url: app.globalData.url+'/wx/user/bindMobile',
          data: {
            mobile:mobile,
            code: code,
            js_code:res.code,
            rawData:wxInfo.rawData,
            signature:wxInfo.signature,
            encryptedData:wxInfo.encryptedData,
            iv:wxInfo.iv
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            wx.setStorageSync('token',res.data.data.token);
            wx.switchTab({
              url: 'pages/bookstore/bookstore'
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },  
  fetchCode:function(){
    let _this = this;
    let mobileReg = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
    if(mobileReg.test(_this.data.mobile)){
      let timer='';
      let second = 60;
      clearInterval(timer)
      timer = setInterval(function(){
        if(second !== 0){
          _this.setData({
            codeBtnVal:second--,
            disabledCode:true
          })
        } else {
          clearInterval(timer);
          _this.setData({
            codeBtnVal:'获取验证码',
            disabledCode:false
          })
        }
      },1000);
      wx.request({
        url: app.globalData.url+"/wx/getCode",
        data: {
          mobile:_this.data.mobile,
          type : "wx_bind_mobile"
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    } else {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'cancel',
        duration: 2000
      })
    }
  },
  getMobile:function(e){
    this.setData({
      mobile:e.detail.value 
    })
  },
  getCode:function(e){
    this.setData({
      code:e.detail.value
    }) 
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function(data){
            // console.log(data)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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