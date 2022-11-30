import {Get} from "@/api/server.js";

//手机+密码登录
export const pwdLogin = async (phone, password) => await Get("/login/cellphone", {phone, password});

//发送手机验证码
export const sendCaptchaCode = async (phone) => await Get("/captcha/sent", {phone});

//验证手机验证码是否正确
export const verify = async (phone, captcha) => await Get("/captcha/verify", {phone, captcha});

//手机+验证码登录
export const captchaLogin = async (phone, captcha) => await Get("/login/cellphone", {phone, captcha});

//游客登陆，防止400错误
export const anonymousReg = async () => await Get('/register/anonimous')

//获取二维码key
export  const getQUID = async (timestamp) => await Get('/login/qr/key',params={timestamp})

//获取二维码数据
export  const getQRCode = async (key,timestamp) => await Get('/login/qr/create',params={key,timestamp,qrimg:true})

//检查二维码状态
export  const checkQRCode = async (key,timestamp) => await Get('/login/qr/check',params={key,timestamp})