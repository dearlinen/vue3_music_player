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