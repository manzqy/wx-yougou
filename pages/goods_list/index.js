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
    keywords: ''
  },
  handleFilter(e) {
    let newData = [...this.data.searchData]
    const {index} = e.currentTarget.dataset
    const {price} = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
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
  onLoad: function (options) {
    console.log('>', options)
    const {query, cid} = options
    const searchParams = {
      query,
      cid,
      pagenum: 1,
      pagesize: 5
    }
    this.setData({
      searchParams
    })
    this.getListData()
  },
  getListData() {
    request({
      url: '/goods/search',
      data: this.data.searchParams
    }).then(({data}) => {
      console.log('>>>', data)
      const{message} = data
      const searchData = [...this.data.searchData, ...message.goods]
      this.setData({
        total: message.total,
        searchData,
        oldData: searchData
      })
    })
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
  inputValue(e) {
    console.log(e)
    const {value} = e.detail
    this.setData({
      keywords: value
    })
  },
  handleSearch() {
    if (!this.data.keywords) return
    const query = this.data.keywords
    request({
      url: '/goods/qsearch',
      data: {
        query
      }
    }).then(({data}) => {
      console.log('ppp', data)
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
    const searchParams = {...this.data.searchParams, pagenum: 0, pagesize: 5}
    this.setData({
      searchParams,
      searchData: []
    })
    this.getListData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('>>>>>>>>>>>>')
    let pagenum = this.data.searchParams.pagenum
    pagenum ++
    const max = Math.ceil(this.data.total / this.data.searchParams.pagesize)
    console.log('%c'+ max,  'color:red;font-size:25px;')
    if (pagenum > max) {
      console.log('%c到底了', 'color:red;font-size:25px;')
      this.setData({
        isShow: true
      })
      return
    }
    console.log('???', {...this.data.searchParams, pagenum})
    this.setData({
      searchParams: {...this.data.searchParams, pagenum}
    })
    this.getListData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})