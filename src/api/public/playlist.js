import {Get} from "@/api/server.js";
import {calcOffset} from "@/api/ApiTools.js";



//歌单 ( 网友精选碟 )
export const getPlaylists = async (uid) => await Get("/user/playlist", { uid })


//获取精品歌单
export const getTopPlaylists = async (cat, limit, offset) => await Get("/top/playlist/highquality", { cat, limit, offset })

//相关歌单推荐
export const getRelatedPlaylists = async (id) => await Get("/related/playlist", { id })

//获取歌单详情
export const getPlaylistDetail = async (id) => await Get("/playlist/detail", { id })


//获取歌单所有歌曲
//传入limit=10&offset=0等价于limit=10，你会得到第1-10首歌曲
//传入limit=10&offset=1，你会得到第2-11首歌曲
export const getPlaylistTracks = async (id,limit,page) => await Get("/playlist/track/all", { id,limit,offset:calcOffset(page,limit) })