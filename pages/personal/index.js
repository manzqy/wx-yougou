// pages/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [
      {
        amount: 0,
        title: '收藏的店铺'
      },
      {
        amount: 0,
        title: '收藏的商品'
      },
      {
        amount: 0,
        title: '关注的商品'
      },
      {
        amount: 0,
        title: '我的足迹'
      }
    ],
    menu: [
      {
        icon: 'icon-fukuan',
        content: '代付款'
      },
      {
        icon: 'icon-daishouhuo',
        content: '待收货'
      },
      {
        icon: 'icon-tuikuan',
        content: '退款/退货'
      },
      {
        icon: 'icon-icon--copy',
        content: '全部订单'
      },
    ],
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {avatarUrl, nickName} = wx.getStorageSync('hema_nick')
    this.setData({
      avatarUrl,
      nickName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUser() {
    wx.getUserInfo({
      success: (res) => {
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        wx.setStorageSync('hema_nick', {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
  },
  getAddress() {
    wx.chooseAddress({
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    })
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  quitLogin() {
    this.setData({
      avatarUrl: '',
      nickName: ''
    })
    wx.setStorageSync('hema_nick', {})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let len
    if (wx.getStorageSync('hema_cart_list').length) {
      len = wx.getStorageSync('hema_cart_list').filter(v => v.choosed).length
    } else {
      len = 0
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        count: len
      })
    }
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