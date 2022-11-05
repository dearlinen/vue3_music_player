
const storageKey = {
    playHistory:'__play_history__',
    uid:'__uid__',
    volume:'__volume__',
    searchHistory:'__search_history__',
}


function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
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

export const setVolume = volume =>{
    setStorage(storageKey.volume,volume)
}

export const getVolume = ()=>{
    return getStorage(storageKey.volume)||0.75
}