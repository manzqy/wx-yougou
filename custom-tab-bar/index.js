Component({
  data: {
    selected: 0,
    count: wx.getStorageSync('hema_cart_list').length || 0,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '../images/icon_home@3x.png',
        selectedIconPath: '../images/icon_home_active@3x.png'
      },
      {
        pagePath: '/pages/category/index',
        text: '分类',
        iconPath: '../images/icon_category@3x.png',
        selectedIconPath: '../images/icon_category_active@3x.png'
      },
      {
        pagePath: '/pages/cart/index',
        text: '购物车',
        iconPath: '../images/icon_cart@3x.png',
        selectedIconPath: '../images/icon_cart_active@3x.png'
      },
      {
        pagePath: '/pages/personal/index',
        text: '我的',
        iconPath: '../images/icon_me@3x.png',
        selectedIconPath: '../images/icon_me_active@3x.png'
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
