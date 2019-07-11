// pages/movies/more-movie/more-movie.js
var util = require("../../../util/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: [],
    requestUrl: "",
    totalCount:0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var title = options.title;
    this.setData({
      navigateTitle: title
    });
    var dataUrl = "";
    switch (title) {
      case "正在热映":
        dataUrl = app.globalData.g_douban_url + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.g_douban_url + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.g_douban_url + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl
    });
    util.getDouBanData(dataUrl, this.processDoubanData);

  },
  processDoubanData: function(data) {
    var movies = [];
    for (var idx in data.subjects) {
      var sub = data.subjects[idx];
      var movTitle = sub.title;
      if (movTitle.length >= 6) {
        movTitle = movTitle.substring(0, 6) + "..."; //电影名称
      }
      var movImgUrl = sub.images.large; //电影图片地址
      var movScore = sub.rating.average; //电影评分
      //获得电影星评
      var stars = sub.rating.stars;
      //获得id
      var id = sub.id
      // 构造一个需要的电影对象数据
      var movObj = {
        stars: util.stringConvertToArray(stars),
        title: movTitle,
        imgUrl: movImgUrl,
        movieScore: movScore,
        id: id
      };
      movies.push(movObj);
    };
  var totalMovies=[];
  if(!this.data.isEmpty){
    totalMovies=this.data.movies.concat(movies);
  }else{
    totalMovies=movies;
    this.data.isEmpty=false;
  }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount+=20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 动态设置导航栏的标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  // 滚动加载更多
  onTapScroll: function() {
    dataUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.getDouBanData(dataUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
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