// pages/groupdtl/groupdtl.js
let util = require('../../utils/util.js');
let app = getApp();
Page({
  data:{
    groupId:'',
    groupName:'',
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
    hiddenNewGroup:true,
    groups:[],
    animation:{},
    newGroupName:''
  },
  onLoad:function(options){
    let _this = this;
    this.setData({
      groupId : options.groupId,
      groupName: options.groupName
    });
    let pushData = {
      owner_id:wx.getStorageSync('userId'),
      type:0,
      group_id:options.groupId,
      page:1
    };
    wx.request({
      url: app.globalData.url+'/wx/bookshelf/groupBooks',
      data: pushData,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data)
        _this.setData({
          groupData:res.data.data
        })
        // wx.switchTab({
        //   url: "../bookstore/bookstore"
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
  // 删除分组
  deleteGroup:function(){
    let groupId = this.data.groupId;
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf/group/'+groupId,
      // data: {},
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        console.log(res)
        // success
        wx.switchTab({
          url: '../bookstore/bookstore'
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
  // 删除,移动,取消到分组
  moveBook:function(){
    let _this = this;
    this.setData({
      hiddenBookGroup:false,
      hiddenCover:false
    });
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf/groups',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        console.log(res.data.data)
        _this.setData({
          groups:res.data.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        console.log(_this.data.groups)
      }
    })
  },
  deleteBook:function(){
    let _this = this;
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf/deleteBook',
      data: {
        book_id:this.data.checkedBooks.join(',')
      },
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        let needData = {
          groupId:_this.data.groupId,
          groupName:_this.data.groupName
        };
        _this.onLoad(needData);
        _this.cancelHandleBook();
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
  newGroup:function(){
    this.setData({
      hiddenNewGroup:false,
      hiddenCheckbox:true,
      hiddenHandleBook:true,
      editFlag:false,
      hiddenCover:true,
      hiddenBookGroup:true
    })
  },
  getGroupName:function(e){
    this.setData({
      newGroupName:e.detail.value
    })
  },
  cancelNewGroup:function(){
    this.setData({
      hiddenNewGroup:true
    });
  },
  // 移动到新建分组
  addToNewGroup:function(){
    let _this = this;
    let newGroupName = this.data.newGroupName;
    let pushData = {
      book_id:this.data.checkedBooks.join(','),
      group_name:this.data.newGroupName
    }
    if(newGroupName != ''){
      wx.request({
        url: app.globalData.url+'/wx/user/bookshelf/moveBooksToNewGroup',
        data: pushData,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          token:wx.getStorageSync('token')
        }, // 设置请求的 header
        success: function(res){
          _this.cancelNewGroup();
          _this.onLoad();
          console.log(res)
          // success
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
        title:'分组不能为空',
        duration: 2000
      })
    }
  },
  // 已到已有分组
  moveToGroup:function(event){
    let targetGroupId =  event.currentTarget.dataset.groupId;
    console.log(targetGroupId)
    let _this = this;
    let pushData = {
      book_id:this.data.checkedBooks.join(','),
      group_id:targetGroupId
    }
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf/moveBooksToOldGroup',
      data: pushData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        console.log(res)
        _this.cancelBookAction();
        _this.onLoad();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
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