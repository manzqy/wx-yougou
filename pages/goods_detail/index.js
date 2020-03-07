import request from '../../utils/request'
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: null,
    detailData: {},
    pics: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.setData({
      goods_id
    })
    this.getDetailData()
  },
  // tab栏切换
  handleCurrentIndex(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
  },
  // 跳转到cart页面
  toCartPage() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  // 拿到数据
  getDetailData() {
    request({
      url: '/goods/detail',
      data: {
        goods_id: this.data.goods_id
      }
    }).then(({data}) => {
      console.log(data.message)
      const pics = data.message.pics.map(v => {
        return v.pics_big_url
      })
      this.setData({
        detailData: data.message,
        pics
      })
    })
  },
  // 添加到购物车
  addCart() {
    const cartList = wx.getStorageSync('hema_cart_list') || []
    const listItem = {
      id: this.data.detailData.goods_id,
      choosed: true,
      small_logo: this.data.detailData.goods_small_logo,
      name: this.data.detailData.goods_name,
      price: this.data.detailData.goods_price,
      number: 1
    }
    const validate = cartList.some(v => {
      let valid = v.id === listItem.id
      if (valid) {
        v.number += 1
        wx.showToast({
          title: '已添加' + v.number + '件',
          icon: 'success',
          duration: 2000
        })
      }
      return valid
    })
    if (!validate) {
      cartList.unshift(listItem)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }
    wx.setStorageSync('hema_cart_list', cartList)
    
  },
  previewImg(e) {
    const {index} = e.currentTarget.dataset
    console.log(e)
    console.log('%c' + index, 'color:green;font-size:25px;')
    const {pics} = this.data
    wx.previewImage({
      current: pics[index], // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
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