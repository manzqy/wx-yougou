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
  onShow: function() {
    this.setData({
      cartList: wx.getStorageSync('hema_cart_list') || []
    })
    this.computedAllPrice()
    this.computedAllAmount()
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
  handlePay (e) {
    const token = wx.getStorageSync('hema_token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
    } else {
      wx.showLoading({
        title: '订单生成中',
        mask: true
      })
      let {cartList} = this.data
      cartList = cartList.map(v => {
        return {
          goods_id: v.id,
          goods_number: v.number,
          goods_price: v.price
        }
      })
      request({
        method: 'post',
        url: '/my/orders/create',
        header: {
          Authorization: token
        },
        data: {
          order_price: this.data.allPrice,
          consignee_addr: this.data.address.location,
          goods: cartList
        }
      }).then(({data}) => {
        console.log(data)
        const {order_number} = data.message
        return request({
          method: 'post',
          url: '/my/orders/req_unifiedorder',
          header: {
            Authorization: token
          },
          data: {
            order_number	
          }
        })
      }).then(({data}) => {
        wx.hideLoading()
        console.log('---', data)
        const {pay} = data.message
        wx.requestPayment({
          ...pay,
          success (res) { 
            wx.showToast({
              title: '支付成功',
              duration: 1500,
              success: (result)=>{
                console.log('支付成功')
              }
            })
          }
        })
      })
    }
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
