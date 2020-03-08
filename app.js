import request from './utils/request'
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options){
    request.defaults.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    request.onError(() => {
      // console.log('%c请求错误', 'color:green;font-size:25px;')
    })
  },
  onShow: function(options){

  },
  onHide: function(){

  },
  onError: function(msg){

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options){

  },
  globalData: {
    
  }
});