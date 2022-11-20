import {getSongDetail, getSongUrl} from "@/api/public/song.js";
import {message} from "@/base/message.js";
import {comparePlaylist, initMediaSession} from "utils/publicTools.js";
import {getPlayHistory, setPlayHistory} from "utils/stroageController.js";

export const musicAction = {

    async startPlay(rawData) {
        const {id} = rawData
        const [err, res] = await getSongUrl(id);
        if (err) message.error('获取歌曲链接失败', err);
        else {
            const hasCurrentIndex = comparePlaylist(this.playlist, rawData);
            const songData = {...rawData, url: res.data[0].url}
            if (this.playlist.length === 0) {
                this.playlist.push(songData)
                this.currentPlayIndex = 0
                this.currentSong = songData
                initMediaSession(songData)
            } else if (hasCurrentIndex >= 0) {
                this.playlist.push(songData);
                this.currentPlayIndex = this.playlist.length - 1;
                this.currentSong = songData;
            } else {
                this.currentPlayIndex = hasCurrentIndex;
                this.currentSong = songData;
            }
            this.isPlaying = true;

            setPlayHistory(this.playlist);
        }
    },
    playNext() {

        const loop = () => {
            console.log('loop')
            if (this.currentPlayIndex === this.playlist.length - 1) {
                this.currentPlayIndex = 0;
                this.currentSong = this.playlist[this.currentPlayIndex];
            } else {
                this.currentPlayIndex++;
                this.currentSong = this.playlist[this.currentPlayIndex];
            }
        }

        const shuffle = () => {
            const currentSongID = this.currentSong.id;
            const filteredArr = this.playlist.slice().filter(item => item.id !== currentSongID);
            const randomIndex = Math.floor(Math.random() * filteredArr.length);
            const randomSong = filteredArr[randomIndex];
            this.currentSong = randomSong;
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

        if (this.currentPlayIndex === 0) {
            this.currentPlayIndex = this.playlist.length - 1;
            this.currentSong = this.playlist[this.currentPlayIndex];
        } else {
            this.currentPlayIndex--;
            this.currentSong = this.playlist[this.currentPlayIndex];
        }
    },
    setCurrentTime(time) {
        this.currentTime = time;
    },
    setIsPlaying(playingState) {
        this.isPlaying = playingState
    }

}