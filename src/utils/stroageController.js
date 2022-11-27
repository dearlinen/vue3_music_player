const storageKey = {
    playHistory: '__play_history__',
    uid: '__uid__',
    volume: '__volume__',
    searchHistory: '__search_history__',
    theme: '__theme__',
    playMode: '__play_mode__',
    userInfo:'__user_info__'
}


export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


export const setPlayHistory = (history) => {
    setStorage(storageKey.playHistory, history)
}

export const getPlayHistory = () => {
    return getStorage(storageKey.playHistory)
}

export const setUid = (uid) => {
    setStorage(storageKey.uid, uid)
}

export const getUid = () => {
    return getStorage(storageKey.uid)
}

export const setSearchHistory = (history) => {
    setStorage(storageKey.searchHistory, history)
}

export const getSearchHistory = () => {
    return getStorage(storageKey.searchHistory)
}

export const setVolume = volume => {
    setStorage(storageKey.volume, volume)
}

export const getVolume = () => {
    return getStorage(storageKey.volume) || 0.75
}

export const setTheme = theme => {
    setStorage(storageKey.theme, theme)
}

export const getTheme = () => {
    return getStorage(storageKey.theme) || 'light'
}

export const setCookie = cookieStr => {
    const cookies = cookieStr.split(';;')
    cookies.map(cookie => {
        document.cookie = cookie
        const [cookieKey, cookieVal] = cookie.split(';')[0].split('=')
        setStorage(`__cookie-${cookieKey}__`, cookieVal)
    })
}

export const getCookie = key => {
    return getStorage(`__cookie-${key}__`)
}

export  const setUserInfo = data=>{
    setStorage(storageKey.userInfo,data)
}

export const getUserInfo = ()=>{
    return getStorage(storageKey.userInfo)
}