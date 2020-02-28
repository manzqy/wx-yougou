import request from '../../utils/request'
Page({
  data: {
    swiperData: [],
    menusData: [],
    floorData: [],
    isShow: false
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperData()
    this.getMenuData()
    this.getFloorData()
  },
  // 轮播图数据
  getSwiperData() {
    request({
      url: '/home/swiperdata'
    }).then(({ data }) => {
      const { message } = data
      this.setData({
        swiperData: message
      })
    })
  },
  // 菜单数据
  getMenuData() {
    request({
      url: '/home/catitems'
    }).then(({ data }) => {
      const { message } = data
      this.setData({
        menusData: message
      })
    })
  },
  // 得到楼层数据
  getFloorData() {
    request({
      url: '/home/floordata'
    }).then(({ data }) => {
      const { message } = data
      this.setData({
        floorData: message
      })
    })
  },
  toScrollTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onPageScroll: function(e) {
    const { isShow } = this.data
    if (e.scrollTop > 100 && !isShow) {
      this.setData({
        isShow: !isShow
      })
      return
    }
    if (e.scrollTop < 100 && isShow) {
      this.setData({
        isShow: !isShow
      })
    }
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  //item(index,pagePath,text)
  onTabItemTap: function(item) {}
})
