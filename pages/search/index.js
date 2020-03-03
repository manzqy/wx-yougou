import request from '../../utils/request'
// pages/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    keywords: '',
    oldwords: '',
    searchData: [],
    isKey: false
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
        this.setData({
          historyList: res.data,
          isKey: true
        })
      }
    })
  },
  // 跳转到列表页
  toGoodsList() {
    wx.redirectTo({
      url: '/pages/goods_list/index?query=' + this.data.keywords
    })
  },
  // input框双向绑定
  handleInput(e) {
    let value
    if (e) {
      value = e.detail.value
      this.setData({
        keywords: value
      })
    }
    if (!this.data.keywords || !this.data.isKey) return
    this.setData({
      isKey: false,
      oldwords: this.data.keywords
    })
    const query = this.data.keywords
    request({
      url: '/goods/qsearch',
      data: {
        query
      }
    }).then(({ data }) => {
      const { message } = data
      this.setData({
        searchData: message,
        isKey: true
      })
      if (this.data.keywords !== this.data.oldwords) {
        this.handleInput(false)
      }
    })
  },
  // 点击搜索按钮提交
  submitSearch() {
    if (!this.data.keywords) return
    this.setLocalStorage()
    this.toGoodsList()
  },
  // 存储到本地
  setLocalStorage() {
    let historyList = [this.data.keywords, ...this.data.historyList]
    historyList = [...new Set(historyList)]
    if (historyList.length > 10) {
      historyList.length = 10
    }
    wx.setStorage({
      key: 'hema_his_list',
      data: historyList,
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
    this.setData({
      historyList
    })
  },
  // 清除本地历史
  clearHistory() {
    wx.setStorage({
      key: 'hema_his_list',
      data: [],
      success: result => {},
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
