// pages/storeinfo/storeinfo.js
let app = getApp();
Page({
  data:{
    storeInfo:{}
  },
  onLoad:function(options){
    // console.log(options)
    this.setData({
      storeInfo : options
    })
  },
  getStorename:function(e){
    let _this = this;
    this.data.storeInfo.nickName = e.detail.value;
    this.setData({
      storeInfo : _this.data.storeInfo
    })
  },
  getDesc:function(e){
    let _this = this;
    this.data.storeInfo.description = e.detail.value;
    this.setData({
      storeInfo : _this.data.storeInfo
    })
  },
  saveStoreInfo:function(){
    let _this = this;
    // console.log(_this.data.storeInfo)
    if(this.data.storeInfo.nickName !== ''){
      wx.request({
        url: app.globalData.url+'/wx/user/bookshelf/info',
        data: {
          name: _this.data.storeInfo.nickName,
          description:_this.data.storeInfo.description
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          token:wx.getStorageSync('token')
        }, // 设置请求的 header
        success: function(res){
          // success
          wx.setStorageSync('storeInfo', _this.data.storeInfo)
          wx.switchTab({
            url: "../bookstore/bookstore"
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    } else {
      return false;
    }
    
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