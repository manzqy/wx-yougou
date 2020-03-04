import request from '../../utils/request'
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: [
      '../../images/icon_sort_up@2x.png',
      '../../images/icon_sort_down@2x.png'
    ],
    currentIndex: 0,
    priceChoose: 0,
    filterTitle: ['综合', '销量', '价格'],
    searchParams: {
      query: '',
      cid: '',
      pagenum: 1,
      pagesize: 5
    },
    searchData: [],
    oldData: [],
    total: '',
    isShow: false,
    keywords: '',
    iskey: false,
    isloading: true
  },
  handleFilter(e) {
    let newData = [...this.data.searchData]
    const { index } = e.currentTarget.dataset
    const { price } = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
    if (index === 0) {
      this.setData({
        searchData: [...this.data.oldData]
      })
      return
    }
    if (index === 1) {
      newData.sort((a, b) => Math.random() - 0.5)
      this.setData({
        searchData: newData
      })
      return
    }
    if (index === 2) {
      if (price) {
        newData.sort((a, b) => a.goods_price - b.goods_price)
      } else {
        newData.sort((a, b) => b.goods_price - a.goods_price)
      }
      this.setData({
        priceChoose: +!price,
        searchData: newData
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let searchParams
    const { query, cid } = options
    if (cid) {
      searchParams = {
        query,
        cid,
        pagenum: 1,
        pagesize: 5
      }
    } else {
      searchParams = {
        query,
        pagenum: 1,
        pagesize: 5
      }
    }
    this.setData({
      searchParams
    })
    this.getListData()
  },
  getListData(callback) {
    setTimeout(() => {
      request({
        url: '/goods/search',
        data: this.data.searchParams
      }).then(({ data }) => {
        const { message } = data
        const searchData = [...this.data.searchData, ...message.goods]
        this.setData({
          total: message.total,
          searchData,
          oldData: searchData,
          iskey: true,
          isloading: false
        })
        callback && callback()
      })
    }, 1500)
  },
  toScrollTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    setTimeout(() => {
      this.setData({
        isShow: false
      })
    }, 1000)
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
  onPullDownRefresh: function() {
    const searchParams = { ...this.data.searchParams, pagenum: 0, pagesize: 5 }
    this.setData({
      searchParams,
      searchData: []
    })
    this.getListData(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pagenum
    const max = Math.ceil(this.data.total / this.data.searchParams.pagesize)
    console.log('>>>>>>>>>>>>')
    if (this.data.iskey) {
      this.setData({
        iskey: false
      })
      pagenum = this.data.searchParams.pagenum
      pagenum++
      if (pagenum > max) {
        this.setData({
          isShow: true,
          isloading: false
        })
        return
      }
      this.setData({
        searchParams: { ...this.data.searchParams, pagenum },
        isloading: true
      })
      this.getListData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
