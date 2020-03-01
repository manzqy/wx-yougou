// pages/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'hema_his_list',
      fail: () => {
        this.setData({
          historyList: []
        })
      },
      success: res => {
        console.log('>>>', res)
        this.setData({
          historyList: res.data
        })
      }
    })
  },
  handleInput(e) {
    const { value } = e.detail
    console.log(e, value)
    this.setData({
      keywords: value
    })
  },
  submitSearch() {
    if (!this.data.keywords) return
    const historyList = [this.data.keywords, ...this.data.historyList]
    wx.setStorage({
      key: 'hema_his_list',
      data: historyList,
      success: result => {
        console.log('保存成功')
      },
      fail: () => {},
      complete: () => {}
    })
    this.setData({
      historyList,
      keywords: ''
    })
    console.log(this.data.historyList)
  },
  clearHistory() {
    wx.setStorage({
      key: 'hema_his_list',
      data: [],
      success: result => {
        console.log('保存成功')
      },
      fail: () => {},
      complete: () => {}
    })
    this.setData({
      historyList: []
    })
  },
  cacelKey() {
    this.setData({
      keywords: ''
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
