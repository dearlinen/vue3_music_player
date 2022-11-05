import {getPlayHistory} from "utils/stroageController.js";

export  const musicState = {
    // 当前播放歌曲
    currentSongID: {},
    // 当前播放时长
    currentDuration: 0,
    // 播放状态
    playing: false,
    // 播放模式
    playMode: 0,
    // 播放列表显示
    isPlaylistShow: false,
    // 播放提示显示
    isPlaylistPromptShow: false,
    // 歌曲详情页显示
    isPlayerShow: false,
    // 播放列表数据
    playlist: [],
    // 播放历史数据
    playHistory: getPlayHistory(),
    // 菜单显示
    isMenuShow: true,
}