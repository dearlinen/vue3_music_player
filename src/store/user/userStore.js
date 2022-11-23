import {defineStore} from "pinia";
import {userActions} from "@/store/user/user.action.js";


export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: false,
        loginType:'anonymous',
        userInfo: {},
        userPlaylist:[],
        token: '',
    }),
    actions:{
        ...userActions
    }
})