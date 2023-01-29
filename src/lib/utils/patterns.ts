/**
 * @name patterns
 * @author Daniel Morrison
 * @date 2023-01-29 14:00:00
 * 一些预先定义的正则表达式 (RegExp patterns)
 * */
const patterns = {
    /**
     * 英文字母与数字
     * */
    letterAndNumber: /^[A-Za-z0-9]+$/,
    /**
     * 密码正则
     * 包含：英文数字，#?!@$%^&*-
     * 规则：至少包含一个大写字母，一个小写字母，一个数字，一个特殊字符
     * 位数：8～32位
     * */
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,32}$/,
}

export default patterns