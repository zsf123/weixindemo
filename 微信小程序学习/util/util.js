function stringConvertToArray(star){
      var num=star.toString().substring(0,1);
      var array=[];
      for(var i=1;i<=5;i++){
          if(i<=num){
            array.push(1);
          }else{
            array.push(0);
          }
      }
      return array;
}

// 根据url获取豆瓣电影数据
function getDouBanData(url,callback) {
  wx.request({
    url: url,
    data: {},
    method: 'get',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      console.log(res.data);
     callback(res.data);
    }
  })
}


function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}


function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}


module.exports={
  stringConvertToArray: stringConvertToArray,
  getDouBanData: getDouBanData,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}