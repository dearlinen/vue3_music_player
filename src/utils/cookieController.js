import Cookies from 'js-cookie'
import {getStorage, setStorage} from "utils/stroageController.js";


export const setCookies = string => {
    const cookies = string.split(';;')
    cookies.map(cookie => {
        document.cookie = cookie
        const [cookieKey, cookieVal] = cookie.split(';')[0].split('=')
        setStorage(`__cookie-${cookieKey}__`, cookieVal)
    })
}

export const getCookie = key => {
    return Cookies.get(key) ?? getStorage(key)
}

export const getToken = ()=>{
    return Cookies.get('MUSIC_U')??getStorage('__MUSIC_U__')
}

export const getUID = ()=>{
    return getStorage('__UID__')
}