// pages/post/posts.js
var data_post=require("../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "Sep 18 2018",
    title: "正是虾肥谢壮时"
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    // console.log("onPostTap");
      wx.navigateTo({
        url: 'post-detail/post-detail?id='+postId,
      })
  },

  onSwiperTap: function (event) {
    var id = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    this.setData({
      data_key: data_post.postList
      });
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
    console.log("share");
  }
})