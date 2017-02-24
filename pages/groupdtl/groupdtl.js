// pages/groupdtl/groupdtl.js
let util = require('../../utils/util.js')
Page({
  data:{
    groupData:{},
    hiddenCheckbox:false,
    hiddenModal:true,
    hiddenCover:true,
    hiddenBookGroup:true,
    hiddenAddBook:true,
    editFlag:false,
    hiddenCheckbox:true,
    hiddenHandleBook:true,
    checkedBooks:[],
    groups:['投资','社会','历史','科技',' 新建分组']
  },
  onLoad:function(){
    let groupData = wx.getStorageSync('groupData');
    this.setData({
      groupData:groupData
    })
  },
  //长按分组或者书籍事件
  bookAction:function(event){
    this.setData({
      editFlag:true,
      hiddenCheckbox:false,
      hiddenHandleBook:false,
    }) 
  },
  //选中书本事件
  checkboxChange:function(event){
    let _this = this;
    let bookId = event.target.dataset.bookId;
    let checkedBooks = util.handleArr(this.data.checkedBooks,bookId);
    this.setData({
      checkedBooks:checkedBooks,
    })
    console.log(this.data.checkedBooks)
  },
  // 删除,移动,取消到分组
  moveBook:function(){
    this.setData({
      hiddenBookGroup:false,
      hiddenCover:false
    })
  },
  deleteBook:function(){

  },
  cancelHandleBook:function(){
    this.setData({
      hiddenCheckbox:true,
      hiddenHandleBook:true,
      editFlag:false,
      hiddenCover:true,
      hiddenBookGroup:true
    })
  },
  cancelBookAction:function(){
    this.setData({
      hiddenCover:true,
      hiddenBookGroup:true
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