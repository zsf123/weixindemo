// pages/movies/movies.js
var util = require("../../util/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    resultData:{},
    mainContainer: true,
    searchPanelContainer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.g_douban_url;
    // 获取即将上映数据url
    var comingUrl = url + "/v2/movie/coming_soon?start=0&count=3";
    // 获取正在热映数据url
    var inTheaterUrl = url + "/v2/movie/in_theaters?start=0&count=3";
    // 获取top250数据url
    var top250 = url + "/v2/movie/top250?start=0&count=3";
    // 根据url获取数据
    this.getDouBanData(comingUrl, "comingSoon", "即将上映");
    this.getDouBanData(inTheaterUrl, "inTheaters", "正在热映");
    this.getDouBanData(top250, "top250", "豆瓣Top250");
  },
  // 根据url获取豆瓣电影数据
  getDouBanData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  // 搜索面板获得焦点
  onBindFocus: function(event) {
    this.setData({
      mainContainer: false,
      searchPanelContainer: true
    })
  },
  // 搜索面板取消
  onCancelImgTap:function(){
    this.setData({
      mainContainer: true,
      searchPanelContainer: false
    })
  },
  onBindChange: function (event) {
    var text = event.detail.value;
     var searchUrl = app.globalData.g_douban_url + "/v2/movie/search?q=" + text;
    this.getDouBanData(searchUrl, "resultData", "");
  },
  // 处理豆瓣数据
  processDoubanData: function(data, urlKey, urlTitle) {
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
        movieId: id
      };
      movies.push(movObj);
    }
    var readyData = {};
    readyData[urlKey] = {
      urlTitle: urlTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  // 点击更多跳转页面
  onTapMore: function(event) {
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'more-movie/more-movie?title=' + title
    });
  },
  movieDetail:function(event){
    var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
          url: "movie-detail/movie-detail?id"+movieId
        })
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