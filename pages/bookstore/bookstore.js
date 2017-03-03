//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    bookListId:[],
    bookListNull:[],
    userInfo:{},
    hiddenModal:true,
    hiddenCover:true,
    hiddenBookGroup:true,
    hiddenAddBook:true,
    editFlag:false,
    hiddenCheckbox:true,
    hiddenHandleBook:true,
    hiddenNewGroup:true,
    checkedBooks:[],
    groups:[],
    animation:{},
    newGroupName:''
    // token:''
  },
  onLoad:function(options){
    let _this = this;
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data:{
        page:1
      },
      header: {
        token:wx.getStorageSync('token')
      }, // 设置请求的 header
      success: function(res){
        let bookDetail = res.data.data.detail;
        let bookListId = [],
        bookListNull=[];
        for(let i=0;i<bookDetail.length;i++){
          if(bookDetail[i].group_id){
          bookListId = bookListId.concat(bookDetail[i]) 
          } else {
            bookListNull = bookListNull.concat(bookDetail[i].books)
          }
        }
        _this.setData({
          userInfo:res.data.data.info,
          bookListId:bookListId,
          bookListNull:bookListNull
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
  },
  //调取微信扫书
  scanBook:function(){
    var that = this;
    wx.scanCode({
      success: function(res){
        // console.log(res)
        let isbn = res.result;
        wx.request({
          url: app.globalData.url+'/book/isbn/'+isbn,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Api-Version":app.globalData.ApiVersion
          }, // 设置请求的 header
          success: function(res){
            // success
            console.log(res)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    // wx.scanCode({
    //   success: function(res){
    //     let isbn = res.result;
    //     let outBookshelf = that.outBookshelf(isbn);
    //     if(outBookshelf){
    //       wx.request({
    //         url: 'https://www.books500.com/book/isbn/'+isbn,
    //         method: 'GET',
    //         success: function(data){
    //           if(data.data.code == 200){
    //             let bookInfo = data.data.data;
    //             bookInfo.isbn = isbn;
    //             bookInfo.title = util.cutString(bookInfo.title);
    //             // console.log(bookInfo)
    //             let book = [bookInfo];
    //             that.setData({
    //               bookListNull : that.data.bookListNull.concat(book)
    //             });
    //           }
    //         },
    //         fail: function() {
    //           console.log('扫描失败，请重试！');
    //         },
    //         complete: function() {
    //           // complete
    //         }
    //       })
    //     }else{
    //       that.setData({
    //         hiddenModal:false,
    //         modalText:'此书已在书架！'
    //       })
    //     }
    //   },
    //   fail: function() {
    //     console.log('failed')
    //   },
    //   complete: function() {
    //     // console.log(that.data)
    //   }
    // })
  },
  //是否已在书架
  outBookshelf:function(isbn){
    let outBookshelf;
    if(this.data.bookListNull.length){
      outBookshelf = this.data.bookListNull.every(function(item){
        return item.isbn != isbn;
      })
    } else {
      outBookshelf = true;
    }
    return outBookshelf;
  },
  toGroup:function(event){
    let groupId = event.currentTarget.dataset.groupId,
    groupName = event.currentTarget.dataset.groupName;
    // wx.setStorageSync('groupData',groupData)
    wx.navigateTo({
      url: '../groupdtl/groupdtl?groupId='+groupId+'&groupName='+groupName
    })
  },
  toDetail:function(event){
    let bookId = event.target.dataset.bookId;
    if(this.data.editFlag){
      return false;
    } else {
      let bookDetail = event.currentTarget.dataset.bookDetail;
      wx.setStorageSync('bookDetail', bookDetail);
      wx.navigateTo({
        url: '../bookdetail/bookdetail?bookId'+bookId
      })
    }
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
      }
    })
  },
  deleteBook:function(){
    wx.request({
      url: app.globalData.url+'/wx/user/bookshelf/deleteBook',
      // data: {
      //   book_id:
      // },
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
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
  // 移动到新分组
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
  // 移动到已有分组
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
  //确认模态框
  confirmModal:function(){
    this.setData({
      hiddenModal:true
    });
    this.scan();
  },
  // 取消模态框
  cancelModal:function(){
    this.setData({
      hiddenModal:true
    })
  },
  hiddenCover:function(){
    this.setData({
      hiddenCover:true
    })
  },
  onShow:function(){
    let storeInfo = wx.getStorageSync('storeInfo');
    let _this = this;
    this.data.userInfo.bookstore_name = storeInfo.nickName;
    this.data.userInfo.description = storeInfo.description;
    this.setData({
      userInfo:_this.data.userInfo
    })
  }
})

