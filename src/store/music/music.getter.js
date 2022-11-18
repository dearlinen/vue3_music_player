export const musicGetter = {

    getCurrentSongID: (state) => state.currentSongID,

    getCurrentDuration: (state) => state.currentDuration,

    getPlayState: (state) => state.playing,

    getPlayHistory: state => state.playHistory,

    getPlaying: state => state.isPlaying,


}