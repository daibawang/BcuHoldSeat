import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

// 设置请求基地址
request.config.baseURL = "https://www.istuadmission.com/"

request.interceptors.request.use((request) => {
    wx.showNavigationBarLoading()
    return request
}, err => {
    console.log('请求超时');
    return Promise.resolve(err);
})

request.interceptors.response.use(
    (response, promise) => {
        wx.hideNavigationBarLoading()
        return promise.resolve(response.data)
    },
    (err, promise) => {
        //TODO:待封装统一错误处理
        wx.hideNavigationBarLoading()
        wx.showToast({
            title: err.message,
            icon: 'none'
        })
        return promise.resolve()
    }
)

export default request
