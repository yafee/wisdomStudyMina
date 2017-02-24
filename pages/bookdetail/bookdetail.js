// pages/bookdetail/bookdetail.js
Page({
  data:{
    bookDetail:{}
  },
  onLoad:function(){
    let bookDetail = wx.getStorageSync('bookDetail');
    console.log(bookDetail)
    bookDetail.author = bookDetail.author.splice('');
    this.setData({
      bookDetail:bookDetail
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