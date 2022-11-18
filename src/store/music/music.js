import {defineStore} from "pinia";
import {musicGetter} from "@/store/music/music.getter.js";
import {musicAction} from "@/store/music/music.action.js";


export const useMusicStore = defineStore('music', {
    state: () => ({
        currentSong: {},
        isPlaying: false,
        currentPlayIndex: 0,
        playlist: [],
        playHistory: [],
        currentTime: 0,
    }),
    getters: {
        ...musicGetter
    },
    actions: {
        ...musicAction
    }
})