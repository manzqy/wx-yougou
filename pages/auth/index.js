import request from '../../utils/request'
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getInfo(e) {
    console.log(e)
    const {encryptedData, rawData, iv, signature} = e.detail
    let data
    wx.login({
      success: (result)=>{
        console.log(result)
        data = {
          encryptedData,
          rawData,
          iv,
          signature,
          code: result.code
        }
        request({
          url: '/users/wxlogin',
          method: 'post',
          data
        }).then(({data}) => {
          console.log(data)
          const {token} = data.message
          wx.setStorageSync('hema_token', token)
          wx.navigateBack()
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})