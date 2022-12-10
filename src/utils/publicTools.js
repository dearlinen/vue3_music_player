import {getFlagCache, setFlagCache} from "utils/stroageController.js";

export const comparePlaylist = (arr, obj) => {
    console.log('compare debug',[arr,obj])
    return arr.findIndex(item => item.id === obj.id)
}

//格式化当前播放时间
export const formatCurrentTime = currentTime => {
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
}


// 格式化歌曲持续时间
export const formatDuration = (time) => {
    let h = Math.floor(time / 1000 / 60 / 60)
    let m = Math.floor(time / 1000 / 60 % 60)
    let s = formatIndex(Math.floor(time / 1000 % 60))
    return h ? `${h}:${m}:${s}` : `${m}:${s}`

}

export const formatPlayedTime = time => {
    let h = Math.floor(time / 60 / 60)
    let m = Math.floor(time / 60 % 60)
    let s = formatIndex(Math.floor(time % 60))
    return h ? `${h}:${m}:${s}` : `${m}:${s}`
}

//格式化个位数 7=>07,分页使用需要传递单页数量和当前页数
export const formatIndex = (index, pageSize = 30, currentPage = 1) => {
    return index < 10 ? `0${index}` : pageSize * (currentPage - 1) + index
}


//格式化歌曲数据

export const formatSongData = (rawData, currentIndex, pageSize, currentPage) => {
    return {
        name: rawData.name,
        alias: rawData.alia[0] || '',
        count: formatIndex(currentIndex + 1, pageSize, currentPage),
        id: rawData.id,
        artist: rawData.ar.map(rawData => rawData.name).join('/'),
        artistID: rawData.ar.map(rawData => rawData.id),
        album: rawData.al.name,
        albumID: rawData.al.id,
        albumPic: rawData.al.picUrl,
        rawDuration: rawData.dt,
        duration: formatDuration(rawData.dt),
        mv: rawData.mv
    }
}


//初始化mediaSession
export const initMediaSession = (songData) => {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songData.name,
            artist: songData.artist,
            album: songData.album,
            artwork: [
                {src: songData.albumPic, sizes: '512x512', type: 'image/png'}
            ]
        })
    }
}

//搜索歌词顺序

export const searchLyricOrder = (lyric, currentTime) => {
    if (lyric.length === 0) {
        return null;
    }

    let left = 0;
    let right = lyric.length - 1;

    if (currentTime < lyric[0]) {
        return null;
    }

    if (currentTime > lyric[right]) {
        return lyric[right];
    }

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (lyric[mid] === currentTime) {
            return lyric[mid];
        } else if (lyric[mid] < currentTime) {
            left = mid + 1;
        } else if (lyric[mid] > currentTime) {
            right = mid - 1;
        }
    }

    return lyric[right];
}

//包装调用获取歌词的函数

export const lyricFlag = (lyric, currentTime) => {
    const localTimeCache = getFlagCache()
    if (currentTime===undefined) {
        return null
    }
    console.debug('debug time',currentTime)
    const time = Number(currentTime.toFixed(3)) * 1000
    const searchLyric = searchLyricOrder(lyric, time);
    if (searchLyric === null) {
        return null;
    }

    if (searchLyric === localTimeCache) {
        return null
    }

    setFlagCache(searchLyric)
    return searchLyric;
}