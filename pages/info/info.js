const api = require("../../api.js")

Page({
    data: {
        text: "",
        images: []
    },
    async submit() {
        const {
            images,
            text
        } = this.data
        if (text == "") {
            wx.showToast({
                title: '文本为空',
                icon: "error"
            })
            return
        }
        const result = await Promise.all(images.map(img => {
            return api.uploadFile({
                cloudPath: img.path.replace("http://tmp/", ""),
                filePath: img.path,
            }).then(p => p.fileID)
        }))

        const result1 = await api.addInfo(text, result)
        if (result1.errMsg === "cloud.callFunction:ok") {
            wx.showToast({
                title: '添加成功',
            })
            this.reset()
        }
    },
    addImg() {
        wx.chooseImage({
            success: (res) => {
                console.log(res)
                const images = [...this.data.images, ...res.tempFiles]
                this.setData({
                    images
                })
            }
        })
    },
    removeImg() {

    },
    reset() {
        this.setData({
            text: "",
            images: [],
        })
    }
})