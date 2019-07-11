Page({
  data:{
    message:'hello mina!'
  },
  Ontap:function(){
    wx.navigateTo({
      url: '../posts/posts',
    })
    // wx.redirectTo({
    //   url: '../posts/posts',
    // })
    console.log("子元素");
  },
  Onparent:function(){
    console.log("父冒泡");
  }
})