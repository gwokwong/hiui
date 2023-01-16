export const lazyImg = {
    /**
     * 解析本地图片以实现懒加载
     * */
    resolve: function (imgPromise: Promise<any>) {
        return imgPromise.then(item => item.default)
    }
}