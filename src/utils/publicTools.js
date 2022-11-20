export const comparePlaylist = (arr,obj)=>{
    return arr.findIndex(item=>item.id===obj.id)
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

//格式化个位数 7=>07,分页使用需要传递单页数量和当前页数
export const formatIndex = (index,pageSize=30,currentPage=1) => {
    return index < 10 ? `0${index}` : pageSize * (currentPage - 1) + index
}


//格式化歌曲数据

export const formatSongData = (rawData,currentIndex,pageSize,currentPage)=>{
    return {
        name: rawData .name,
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