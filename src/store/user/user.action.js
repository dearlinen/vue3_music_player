import {getUserDetail} from "@/api/user/info.js";
import {message} from "@/base/message.js";
import {getPlaylists} from "@/api/public/playlist.js";
import {clearUserCache, setProfileCache, setPlaylistCache, setLoginType} from "utils/stroageController.js";
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
    },
    async setUserProfile(uid) {
        const [err, user] = await getUserDetail(uid)
        if (err) {
            message.error('获取用户详情失败')
        } else {
            this.userProfile = user
            setProfileCache(user)
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

    }
}