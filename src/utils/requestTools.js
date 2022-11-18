import {message} from "@/base/message.js";

//网易云API可能会频繁出错，故此统一处理
export const extractResponse = (response, errMessage) => {
    const [err, res] = response

    // /search 接口可能会返回http 400状态码，拦截器将其抛出，在此处理
    if (err) {
        if (err?.msg) {
            message.error(`${errMessage}：${err.msg}`)
        } else {
            message.error(errMessage+err.status)
        }
        return false
    }

    // http状态码无误，处理返回数据中的错误
    // 400为cookie问题，-460为请求频繁
    // needLogin为true将不会返回正常数据，数据会是字符串
    if (res.code === 400 || res.code === -460||(typeof res?.result==='string')) {
        message.error(`${errMessage}：${response?.msg ?? '请求频繁'}`)
        return false
    }

    // if (res?.needLogin||(typeof res?.result==='string')){
    //     message.error(`${errMessage}：'请求频繁'}`)
    //     return false
    // }

    // 未捕获到错误
    return  res

}