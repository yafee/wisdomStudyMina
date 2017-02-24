// pages/storeinfo/storeinfo.js
Page({
  data:{
    storeInfo:{}
  },
  onLoad:function(options){
    console.log(options.nickName)
    this.setData({
      storeInfo : options
    })
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