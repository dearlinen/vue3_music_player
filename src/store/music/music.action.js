import {getSongDetail, getSongUrl} from "@/api/public/song.js";
import {message} from "@/base/message.js";
import {comparePlaylist} from "utils/publicTools.js";
import {setPlayHistory} from "utils/stroageController.js";

export const musicAction = {

    async startPlay(songID) {
        const [err, res] = await getSongUrl(songID);
        console.log(res)
        if (err) message.error(err);
        else {
            console.log('playlist', this.playlist)
            this.playlist.unshift(res.data[0]);
            this.currentSong = this.playlist[this.currentPlayIndex]
            this.isPlaying = true;
            this.setPlayHistory(this.currentSong);
        }
    },
    playNext(songID, playMod) {
        switch (playMod) {
            case 'loop':
                loop(songID)
                break;
            case 'shuffle':
                shuffle(songID)
                break;
            case 'single':
                single(songID)
        }

        function loop(songID) {
            if (this.currentPlayIndex === this.playlist.length - 1) {
                this.currentPlayIndex = 0;
                this.isPlaying = true;
            } else {
                const next = this.currentPlayIndex++;
                this.startPlay(this.playlist[next].id);
            }
        }

        function single() {
            this.currentSong = Object.assign({}, this.currentSong);
            this.isPlaying = true;
        }

        function shuffle(songID) {
            this.currentPlayIndex = Math.floor(Math.random() * this.playlist.length);
            this.startPlay(songID);
        }
    },
    setPlayHistory(song) {
        if (song) {
            const index = comparePlaylist(this.playHistory, song)
            if (index >= 0) {
                this.playHistory.splice(index, 1)
            }
            this.playHistory.unshift(song)
        }
        setPlayHistory(this.playHistory)
    },
    setCurrentTime(time) {
        this.currentTime = time;
    }

}