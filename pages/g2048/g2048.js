// pages/g2048/g2048.js

const Grid = require('./grid.js');
const Tile = require('./tile.js');
const GameManager = require('./game_manager.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    grids: [],
    over: false,
    win: false,
    score: 0,
    highscore: 0,
    overMsg: '游戏结束'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.GameManager = new GameManager(4);
    this.setData({
      grids: this.GameManager.setup(),
      highscore: wx.getStorageSync('highscore') || 0
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    // 页面渲染完毕隐藏loading
    that.setData({
      hidden: true
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 更新视图数据
  updateView: function (data) {
    // 游戏结束
    if (data.over) {
      data.overMsg = '游戏结束';
    }

    // 获胜
    if (data.win) {
      data.overMsg = '恭喜';
    }

    this.setData(data);
  },

  // 重新开始
  restart: function () {
    this.updateView({
      grids: this.GameManager.restart(),
      over: false,
      won: false,
      score: 0
    });
  },

  touchStartClienX: 0,
  touchStartClientY: 0,
  touchEndClientX: 0,
  touchEndClientY: 0,
  isMultiple: false, // 多手指操作

  touchStart: function (events) {

    // 多指操作
    this.isMultiple = events.touches.length > 1;
    if (this.isMultiple) {
      return;
    }

    var touch = events.touches[0];

    this.touchStartClientX = touch.clientX;
    this.touchStartClientY = touch.clientY;

  },

  touchMove: function (events) {
    var touch = events.touches[0];
    this.touchEndClientX = touch.clientX;
    this.touchEndClientY = touch.clientY;
  },

  touchEnd: function (events) {
    if (this.isMultiple) {
      return;
    }

    var dx = this.touchEndClientX - this.touchStartClientX;
    var absDx = Math.abs(dx);
    var dy = this.touchEndClientY - this.touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      var direction = absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);

      var data = this.GameManager.move(direction) || {
        grids: this.data.grids,
        over: this.data.over,
        won: this.data.won,
        score: this.data.score
      };

      console.log(data);

      var highscore = wx.getStorageSync('highscore') || 0;
      if (data.score > highscore) {
        wx.setStorageSync('highscore', data.score);
      }

      this.updateView({
        grids: data.grids,
        over: data.over,
        won: data.won,
        score: data.score,
        highscore: Math.max(highscore, data.score)
      });

    }

  }
})