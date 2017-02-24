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
    checkedBooks:[],
    modalText:'',
    groups:['投资','社会','历史','科技',' 新建分组']
  },
  onLoad:function(){
    let _this = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      userInfo.desc = '填写描述。。。';
      _this.setData({
        userInfo:userInfo
      })
    })
    wx.request({
      url: 'https://www.books500.com/web/bookshelf',
      data: {
        owner_id:3,
        type:0
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Api-Version":"2.0"
      }, // 设置请求的 header
      success: function(res){
        let bookDetail = res.data.data.detail;
        let bookListId = [],
        bookListNull=[];
        for(let i=0;i<bookDetail.length;i++){
          if(bookDetail[i].group_id){
           bookListId = bookListId.concat(bookDetail[i]) 
          } else {
            // console.log(bookDetail[i].books)
            bookListNull = bookListNull.concat(bookDetail[i].books)
          }
        }
        _this.setData({
          bookListId:bookListId,
          bookListNull:bookListNull
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // console.log(_this.data.bookListId)
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
  //调取微信扫书
  scanBook:function(){
    var that = this;
    wx.scanCode({
      success: function(res){
        let isbn = res.result;
        let outBookshelf = that.outBookshelf(isbn);
        if(outBookshelf){
          wx.request({
            url: 'https://www.books500.com/book/isbn/'+isbn,
            method: 'GET',
            success: function(data){
              if(data.data.code == 200){
                let bookInfo = data.data.data;
                bookInfo.isbn = isbn;
                bookInfo.title = util.cutString(bookInfo.title);
                console.log(bookInfo)
                let book = [bookInfo];
                that.setData({
                  bookListNull : that.data.bookListNull.concat(book)
                });
              }
            },
            fail: function() {
              console.log('扫描失败，请重试！');
            },
            complete: function() {
              // complete
            }
          })
        }else{
          that.setData({
            hiddenModal:false,
            modalText:'此书已在书架！'
          })
        }
      },
      fail: function() {
        console.log('failed')
      },
      complete: function() {
        // console.log(that.data)
      }
    })
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
    let groupData = event.currentTarget.dataset.group;
    console.log(groupData)
    wx.setStorageSync('groupData',groupData)
    wx.navigateTo({
      url: '../groupdtl/groupdtl?groupId'
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
  }
})

