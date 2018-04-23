//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    defaultSize: 'default',
    disabled: false,
    iconType: 'info_circle'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toGame: function () {
    wx.navigateTo({
      url: '../g2048/g2048'
    })
  },
  onLoad: function () {
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
    
})
