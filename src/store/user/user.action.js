import {getUserAccount, getUserDetail} from "@/api/user/info.js";
import {message} from "@/base/message.js";
import {getPlaylists} from "@/api/public/playlist.js";
import {
    clearUserCache,
    setProfileCache,
    setPlaylistCache,
    setLoginType,
    setCookie,
    setUserCache
} from "utils/stroageController.js";
import {sendCaptchaCode} from "@/api/user/login.js";

export const userActions = {
    setLogType(type) {
        this.loginType = type
    },
    async sendCaptcha(phone) {
        const [err, res] = await sendCaptchaCode(phone)
        if (err) {
            message.error('发送验证码失败')
            return false
        } else {
            message.success('发送验证码成功')
            this.captchaTime = +(new Date())
            return true
        }
    },

    async setUIDLogin(uid) {
        this.uid = uid
        this.loginType = 'UID'
        setLoginType('UID')
        await this.setUserProfile(uid)
    },
    async setUserProfile(uid) {
       if (this.loginType==='uid'){
           const [err, profile] = await getUserDetail(uid)
           if (err) {
               message.error('获取用户详情失败')
           } else {
               this.uid=uid
               this.userProfile = profile
               setProfileCache(profile)
           }
       }else if (this.loginType==='account'){
           const [err,profile] = await getUserAccount()
           if (err){
               return
           }else {
               this.uid = profile.account.id
               this.userProfile = profile
               setProfileCache(profile)
           }
       }
    },
    async setPlaylist(uid) {
        const [err, playlists] = await getPlaylists(uid)
        if (err) {
            message.error('获取歌单失败')
        } else {
            const {playlist} = playlists
            this.playlist = playlist
            setPlaylistCache(playlist)
        }
    },
    logout() {
        this.loginType = 'anonymous'
        this.userInfo = {}
        this.playlist = []
        clearUserCache()
    },
    async setAccountLogin(cookie) {
        this.loginType='account'
        setLoginType('account')
        setCookie(cookie)
        await this.setUserProfile()
        await this.setPlaylist(this.uid)
    }
}