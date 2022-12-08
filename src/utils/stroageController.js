const storageKey = {
    playHistory: '__play_history__',
    uid: '__uid__',
    volume: '__volume__',
    searchHistory: '__search_history__',
    theme: '__theme__',
    playMode: '__play_mode__',
    userProfile: '__user_profile__',
    userPlaylist: '__user_playlist__',
    loginType: '__login_type__',
    captcha:'__captcha__',
    flag:'__flag__',
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
export const hasCookieCache = () =>{
    return getStorage(storageKey.loginType)
}

export const setUserCache = (loginMode, profile, playlist) => {
    setStorage(storageKey.loginType, loginMode)
    setStorage(storageKey.userProfile, profile)
    setStorage(storageKey.userPlaylist, playlist)
}

export const setPlaylistCache = (playlist) => {
    return setStorage(storageKey.userPlaylist, playlist)
}

export const getPlaylistCache = () => {
    return getStorage(storageKey.userPlaylist)
}

export const setLoginType = (type) => {
    return setStorage(storageKey.loginType, type)
}

export const getLoginCache = () => {
    return getStorage(storageKey.loginType)
}

export const setProfileCache = (profile) => {
    return setStorage(storageKey.userProfile, profile)
}

export const getProfileCache = () => {
    return getStorage(storageKey.userProfile)
}

export const clearUserCache = () => {
    setLoginType('anonymous')
    setPlayHistory(null)
    setProfileCache(null)
    setPlaylistCache(null)
}

export const setCaptchaCache = date=>{
    setStorage(storageKey.captcha,date)
}

export const getCaptchaCache = ()=>{
    return getStorage(storageKey.captcha)
}


export const setFlagCache = (id,flag) => {
    setStorage(storageKey.flag+id, flag)
}

export const getFlagCache = (id) => {
    return getStorage(storageKey.flag+id)
}