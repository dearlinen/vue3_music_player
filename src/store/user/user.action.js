import {getUserDetail} from "@/api/user/info.js";
import {message} from "@/base/message.js";
import {getPlaylists} from "@/api/public/playlist.js";
import {setUserInfo} from "utils/stroageController.js";

export const userActions = {
    setLogType(type) {
        this.loginType = type
    },

    async setUIDLogin(uid) {
        const [err, user] = await getUserDetail(uid)
        if (err) {
            message.error('获取用户详情失败')
        } else {
            this.loginType = 'UID'
            this.userInfo = user
            const [err, playlists] = await getPlaylists(uid)
            if (err) {
                message.error('获取歌单失败')
            } else {
                const {playlist} = playlists
                this.userPlaylist = playlist
            }
            setUserInfo({
                loginType: 'UID',
                userInfo: user,
                userPlaylist: this.userPlaylist
            })
        }
    },
    logout() {
        this.loginType= 'anonymous'
        this.userInfo = {}
        this.userPlaylist = []
        setUserInfo(null)
    },
    async setAccountLogin() {

    }
}