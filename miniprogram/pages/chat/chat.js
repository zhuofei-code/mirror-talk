import { sendMessage, getPortrait } from "../../utils/api";

let msgCounter = 0;

Page({
  data: {
    sessionId: "",
    messages: [],
    inputText: "",
    loading: false,
    isNearEnd: false,
    scrollToId: "",
  },

  onLoad(options) {
    const { sessionId, greeting } = options;
    const id = ++msgCounter;
    this.setData({
      sessionId,
      messages: [
        { id, role: "assistant", content: decodeURIComponent(greeting) },
      ],
      scrollToId: `msg-${id}`,
    });
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  onSend() {
    const text = this.data.inputText.trim();
    if (!text || this.data.loading) return;

    const userId = ++msgCounter;
    const messages = [
      ...this.data.messages,
      { id: userId, role: "user", content: text },
    ];

    this.setData({
      messages,
      inputText: "",
      loading: true,
      scrollToId: `msg-${userId}`,
    });

    sendMessage(this.data.sessionId, text)
      .then((res) => {
        const aiId = ++msgCounter;
        this.setData({
          messages: [
            ...this.data.messages,
            { id: aiId, role: "assistant", content: res.message },
          ],
          loading: false,
          isNearEnd: res.is_near_end,
          scrollToId: `msg-${aiId}`,
        });
      })
      .catch(() => {
        this.setData({ loading: false });
        wx.showToast({ title: "发送失败，请重试", icon: "none" });
      });
  },

  onGeneratePortrait() {
    wx.showLoading({ title: "正在生成画像..." });
    getPortrait(this.data.sessionId)
      .then((res) => {
        wx.hideLoading();
        wx.navigateTo({
          url: `/pages/portrait/portrait?portrait=${encodeURIComponent(res.portrait)}`,
        });
      })
      .catch(() => {
        wx.hideLoading();
        wx.showToast({ title: "生成失败，请重试", icon: "none" });
      });
  },
});
