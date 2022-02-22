let infos = []

function getCloud() {
    const cloud = new wx.cloud.Cloud({
        resourceAppid: 'wx25217bf3880a4e5d',
        resourceEnv: 'juniuapi-4gyqh8vud8dca9ea',
    })
    return cloud.init().then(() => cloud)
}

exports.getInfos = async function () {
    const cloud = await getCloud()
    return infos = cloud.callFunction({
        name: "juniu",
        config: {
            env: "juniuapi-4gyqh8vud8dca9ea"
        },
        data: {
            action: "getInfos"
        }
    }).then(p => {
        return infos = p.result
    })
}

exports.getInfo = function (id) {
    for (const it of infos) {
        if (it._id == id) {
            return it
        }
    }

    return null
}

exports.remove = async function (id) {
    const cloud = await getCloud()
    return cloud.callFunction({
        name: "juniu",
        config: {
            env: "juniuapi-4gyqh8vud8dca9ea"
        },
        data: {
            action: "deleteInfo",
            id
        }
    })
}

exports.addInfo = async function (text, images) {
    const cloud = await getCloud()
    return cloud.callFunction({
        name: "juniu",
        config: {
            env: "juniuapi-4gyqh8vud8dca9ea"
        },
        data: {
            action: "addInfo",
            text,
            images
        }
    })
}

exports.uploadFile = async function (data) {
    const cloud = await getCloud()
    return cloud.uploadFile(data)
}