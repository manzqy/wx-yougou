import request from '../../utils/request'

// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    allPrice: 0,
    allAmount: 0,
    chooseAll: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      address: wx.getStorageSync('hema_address') || {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  handleTabCount() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        count:
          wx.getStorageSync('hema_cart_list').filter(v => v.choosed).length || 0
      })
    }
  },
  onShow: function() {
    this.setData({
      cartList: wx.getStorageSync('hema_cart_list') || []
    })
    this.validChooseAll()
    this.handleTabCount()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  handleAddress() {
    const address = {}
    wx.chooseAddress({
      success: res => {
        address.username = res.userName
        address.tel = res.telNumber
        address.location = res.provinceName + res.cityName + res.countyName
        this.setData({
          address
        })
        wx.setStorageSync('hema_address', address)
      }
    })
  },
  changeNumber(e) {
    const { index, value } = e.currentTarget.dataset
    const { cartList } = this.data
    let valid = true
    cartList.some((v, i) => {
      if (i === index) {
        v.number += value
        if (v.number === 0) {
          valid = false
          wx.showModal({
            title: '提示',
            content: '是否删除该商品',
            success: res => {
              if (res.confirm) {
                cartList.splice(index, 1)
                this.afterHandle()
              } else if (res.cancel) {
                console.log('用户点击取消')
                v.number = 1
                this.afterHandle()
              }
            }
          })
        }
      }
      return i === index
    })
    if (!valid) {
      return
    }
    this.afterHandle()
  },
  changeAmount(e) {
    console.log(e)
    let { value } = e.detail
    value = Math.floor(+value)
    value = value ? value : 1
    const { index } = e.currentTarget.dataset
    if (value < 1) {
      this.data.cartList[index]['number'] = 1
    } else {
      this.data.cartList[index]['number'] = value
    }
    this.setData({
      cartList: [...this.data.cartList]
    })
    this.computedAllPrice()
    this.computedAllAmount()
    wx.setStorageSync('hema_cart_list', this.data.cartList)
  },
  afterHandle() {
    this.setData({
      cartList
    })
    this.computedAllPrice()
    this.computedAllAmount()
    wx.setStorageSync('hema_cart_list', cartList)
  },
  computedAllPrice() {
    let price = 0
    this.data.cartList.forEach(v => {
      if (v.choosed) {
        price += v.number * v.price
      }
    })
    this.setData({
      allPrice: price
    })
  },
  computedAllAmount() {
    let amount = 0
    this.data.cartList.forEach(v => {
      if (v.choosed) {
        amount += v.number
      }
    })
    this.setData({
      allAmount: amount
    })
  },
  isChoosed(e) {
    const { index } = e.currentTarget.dataset
    const { choosed } = this.data.cartList[index]
    this.data.cartList[index].choosed = !choosed
    this.setData({
      cartList: [...this.data.cartList]
    })
    this.validChooseAll()
    wx.setStorageSync('hema_cart_list', this.data.cartList)
    this.handleTabCount()
  },
  validChooseAll() {
    const valid = this.data.cartList.some(v => {
      return !v.choosed
    })
    if (!valid) {
      this.setData({
        chooseAll: true
      })
    } else {
      this.setData({
        chooseAll: false
      })
    }
    this.computedAllPrice()
    this.computedAllAmount()
  },
  isChoosedAll() {
    const { chooseAll, cartList } = this.data
    cartList.forEach(v => {
      v.choosed = !chooseAll
    })
    this.setData({
      cartList: [...cartList]
    })
    this.validChooseAll()
    wx.setStorageSync('hema_cart_list', cartList)
    this.handleTabCount()
  },
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
