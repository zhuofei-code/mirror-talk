const app = getApp();

function request(path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.baseUrl}${path}`,
      method: "POST",
      header: { "content-type": "application/json" },
      data,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err),
    });
  });
}

export function startSession() {
  return request("/start", {});
}

export function sendMessage(sessionId, message) {
  return request("/chat", { session_id: sessionId, message });
}

export function getPortrait(sessionId) {
  return request("/portrait", { session_id: sessionId, message: "" });
}
