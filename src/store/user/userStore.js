import {defineStore} from "pinia";
import {userActions} from "@/store/user/user.action.js";
import {getCaptchaCache, getLoginCache, getProfileCache} from "utils/stroageController.js";
import {getPlaylists} from "@/api/public/playlist.js";


export const useUserStore = defineStore('user', {
    state: () => ({
        loginType: getLoginCache() ?? 'anonymous',
        uid: '',
        captchaTime: getCaptchaCache() ?? +(new Date()),
        userProfile: getProfileCache() ?? null,
        playlist: getPlaylists()??[],
        token: '',
    }),
    actions: {
        ...userActions
    }
})