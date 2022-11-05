import {defineStore} from "pinia";
import {musicState} from "@/store/music/music.state.js";
import {musicGetter} from "@/store/music/music.getter.js";
import {musicAction} from "@/store/music/music.action.js";


export const useMusicStore = defineStore('music',{
    state: ()=>musicState,
    getters: musicGetter,
    actions:musicAction
})