export const is = {
    /**
     * @function smallDevice
     * @description 检查此设备分辨率是否小于960px
     * @returns {boolean} true/false
     * */
    smallDevice: () => {
        return window.innerWidth < 960;
    }
}