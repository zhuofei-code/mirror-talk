import { startSession } from "../../utils/api";

Page({
  onStart() {
    wx.showLoading({ title: "准备中..." });
    startSession()
      .then((res) => {
        wx.hideLoading();
        wx.navigateTo({
          url: `/pages/chat/chat?sessionId=${res.session_id}&greeting=${encodeURIComponent(res.message)}`,
        });
      })
      .catch(() => {
        wx.hideLoading();
        wx.showToast({ title: "连接失败，请重试", icon: "none" });
      });
  },
});
