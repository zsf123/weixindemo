// pages/posts/post-detail/post-detail.js
var data_post = require("../../../data/posts-data.js");
var appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicimageflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    this.setData({
      data: data_post.postList[id],
      id: id
    });

    // 收藏变成未收藏
    var collection = wx.getStorageSync("collected"); //获取缓存中所有详情的收藏状态对象
    if (collection) {
      var flag = collection[id];
      this.setData({
        collected: flag
      })
    } else {
      var collection = {};
      collection[id] = false;
      wx.setStorageSync("collected", collection);
    }
    //获取全局变量
    var g_data = appData.globalData.g_data;
    if (g_data && appData.globalData.g_globalDataPostId === id) {
      this.setData({
        musicimageflag: true
      })
    }
    //页面加载的时候监听音乐播放情况
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        musicimageflag: true
      });
      appData.globalData.g_data = true;
      appData.globalData.g_globalDataPostId = id;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        musicimageflag: false
      });
      appData.globalData.g_data = false;
      appData.globalData.g_globalDataPostId = null;
    });
    wx.onBackgroundAudioStop(function() {
      that.setData({
        musicimageflag: false
      });
      appData.globalData.g_data = false;
      appData.globalData.g_globalDataPostId = null;
    });

  },
  //点击收藏状态切换
  OnTapCollection: function() {
    var collection = wx.getStorageSync("collected"); //获取缓存中所有详情的收藏状态对象
    //取得缓存中该项的布尔值
    var flag = collection[this.data.id];
    //将Data数据中的collected取反
    this.setData({
      collected: !flag
    });
    //更改缓存中的数据
    collection[this.data.id] = !flag;
    wx.setStorageSync("collected", collection);
    wx.showToast({
      title: flag ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 1000
    })
  },
  // 分享按钮功能
  OnShareTap: function() {
    var itemList = [
      "分享到朋友圈",
      "分享到朋友",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        wx.showModal({
          title: '分享',
          content: '用户分享到' + itemList[res.tapIndex],
          success(res) {
            if (res.confirm) {
              console.log("点击了确定");
            } else {
              console.log("点击了取消");
            }
          }
        })
      }
    });
  },
  //点击播放音乐
  onMusicTap: function(event) {
    var dataUrl = data_post.postList[this.data.id].music.dataUrl;
    var title = data_post.postList[this.data.id].music.title;
    var coverImgUrl = data_post.postList[this.data.id].music.coverImgUrl;
    var imgflag = this.data.musicimageflag;
    if (imgflag) {
      wx.pauseBackgroundAudio();
      this.setData({
        musicimageflag: !imgflag
      })
    } else {
      this.setData({
        musicimageflag: true
      })
      wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title: title,
        coverImgUrl: coverImgUrl
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})