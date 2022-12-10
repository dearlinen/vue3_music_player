import {getSongDetail, getSongUrl} from "@/api/public/song.js";
import {message} from "@/base/message.js";
import {comparePlaylist, initMediaSession} from "utils/publicTools.js";
import {getPlayHistory, setPlayHistory} from "utils/stroageController.js";

export const musicAction = {

    setLyric(lyric) {
        this.lyric = lyric
    },

    async startPlay(rawData) {
        this.isPlaying = false
        const {id} = rawData
        const [err, res] = await getSongUrl(id);
        const hasCurrentIndex = comparePlaylist(this.playlist, rawData);
        console.log('debug has',hasCurrentIndex)
        const songData = {...rawData, url: res.data[0].url}
        if (err) {
            message.error('获取歌曲链接失败', err);
        }
        else {
            if (this.playlist.length === 0) {
                this.playlist = [songData]
                this.currentSong = songData
            } else {
                if (hasCurrentIndex >= 0) {
                    this.currentPlayIndex = hasCurrentIndex;
                    this.currentSong = songData;
                } else {
                    this.$patch((state) => {
                        state.currentPlayIndex = hasCurrentIndex
                        state.currentSong = songData
                        state.playlist.push(songData)
                    })
                }
            }

            this.isPlaying = true;
            setPlayHistory(this.playlist);
        }
    },
    playNext() {

        const loop = () => {
            const nextIndex = this.currentPlayIndex+1
            const nextSong = this.playlist[nextIndex];
            if (nextSong) {
                this.currentPlayIndex=nextIndex;
                this.currentSong = {...nextSong};
            } else {
                this.currentPlayIndex = 0;
                this.currentSong = {...this.playlist[this.currentPlayIndex]};
            }
        }

        const shuffle = () => {
            const currentSongID = this.currentSong.id;
            const filteredArr = this.playlist.slice().filter(item => item.id !== currentSongID);
            const randomIndex = Math.floor(Math.random() * filteredArr.length);
            const randomSong = filteredArr[randomIndex];
            this.currentSong = {...randomSong};
            this.currentPlayIndex = this.playlist.findIndex(item => item.id === randomSong.id);
        }

        switch (this.playMode) {
            case 'loop':
                loop()
                break;
            case 'shuffle':
                shuffle()
                break;
        }

    },
    playPrev() {
        this.isPlaying=false
        if (this.currentPlayIndex === 0) {
            this.currentPlayIndex = 0
            this.currentSong = this.playlist[this.currentPlayIndex];
        } else {
            this.currentPlayIndex--;
            this.currentSong = this.playlist[this.currentPlayIndex];
        }
        this.isPlaying=true
    },
    setCurrentTime(time) {
        this.currentTime = time;
    },
    setIsPlaying(playingState) {
        this.isPlaying = playingState
    },
    changePlayMode(mode){
        this.playMode=mode
    }

}