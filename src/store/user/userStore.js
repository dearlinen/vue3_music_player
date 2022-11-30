import {defineStore} from "pinia";
import {userActions} from "@/store/user/user.action.js";
import {getCaptchaCache} from "utils/stroageController.js";


export const useUserStore = defineStore('user', {
    state: () => ({
        loginType: 'anonymous',
        uid: '',
        captchaTime: getCaptchaCache() || +(new Date()),
        userProfile: {},
        playlist: [],
        token: '',
    }),
    actions: {
        ...userActions
    }
})