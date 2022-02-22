const api = require("../../api.js")

Page({
  data: {
    infos: []
  },
  async onLoad() {
    const infos = await api.getInfos()

    this.setData({
      infos
    })
  },
  onTabItemTap() {
    this.onLoad()
  },
  async remove(context) {
    const result = await wx.showModal({
      title: '删除确认',
    })
    if (!result.confirm) {
      return
    }
    api.remove(context.target.dataset.id)
    this.onLoad()
  }
})