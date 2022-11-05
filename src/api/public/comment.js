import {Get} from "@/api/server.js";
import {calcOffset} from "@/api/ApiTools.js";


//获取歌单评论G
export const getPlaylistComments = async (id, limit, page) => await Get("/comment/playlist", { id, limit, offset: calcOffset(page, limit) })

//获取歌曲评论
export const getSongComments = async (id, limit, page) => await Get("/comment/music", { id, limit, offset: calcOffset(page, limit) })

//获取热门评论
export const getHotComments = async (id, type, limit, page) => await Get("/comment/hot", { id, type, limit, offset: calcOffset(page, limit) })

//获取MV评论
export const getMVComments = async (id, limit, page) => await Get("/comment/mv", { id, limit, offset: calcOffset(page, limit) })