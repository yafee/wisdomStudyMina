//logs.js
let util = require('../../utils/util.js');
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let wxMap = new QQMapWX({
    key: 'VZKBZ-TBIKI-UTTGB-5LM4S-WXJTJ-FZBSX' // 必填
});
Page({
  data: {
    city:'',
    activityTotal:12
  },
  onLoad: function () {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        wxMap.reverseGeocoder({
          location: {
              latitude: res.latitude,
              longitude: res.longitude
          },
          success: function(data) {
              _this.setData({
                city : data.result.ad_info.city
              })
          },
          fail: function(res) {
              // console.log(res);
          },
          complete: function(res) {
              // console.log(res);
          }
      });
      }
    })
    this.setData({
      
    })
  }
})
