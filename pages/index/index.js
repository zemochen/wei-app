//index.js
//获取应用实例
const app = getApp()
var _this,timer;
Page({
  data: {
    hiddenEat:false,
    hiddenStop:true,
    motto: '屎',
    foodList:["拉面","砂锅","花千树","花溪牛肉粉","煎饼","大米先生"],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    _this = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  random: function (e) {
    
    timer = setInterval(function () {
      //抽取数组随机下标
      var num = Math.floor(Math.random() * (_this.data.foodList.length - 1 + 1 - 0) + 0);
      //赋值
      _this.setData({
        motto: _this.data.foodList[num],
        hiddenEat:true,
        hiddenStop:false
      })
    }, 80)
  },
  stop:function(e){
    clearInterval(timer);
    _this.setData({
      hiddenEat: false,
      hiddenStop: true
    })
  }
})
