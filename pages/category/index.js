import request from '../../utils/request'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582963163446&di=43a37f5d206f29bcf8551f08fca60f3b&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F54607217d1df0.jpg',
    categoryData: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryData()
  },
  getCategoryData() {
    request({
      url: '/categories'
    }).then(({data}) => {
      const {message} = data
      this.setData({
        categoryData: message
      })
    })
  },
  handleTap(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
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