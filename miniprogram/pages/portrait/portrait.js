Page({
  data: {
    portrait: "",
  },

  onLoad(options) {
    this.setData({
      portrait: decodeURIComponent(options.portrait || ""),
    });
  },

  onRestart() {
    wx.reLaunch({ url: "/pages/index/index" });
  },
});
