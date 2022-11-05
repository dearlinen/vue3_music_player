import {Get} from "@/api/server.js";
import {calcOffset} from "@/api/ApiTools.js";


//获取歌手单曲
//传入歌手 id, 可获得歌手部分信息和热门歌曲
export const getArtistSongs = async (id) => await Get("/artists", { id });

//获取歌手专辑
//传入歌手 id, 可获得歌手专辑内容
export const getArtistAlbums = async (id, limit, page) => await Get("/artist/album", { id, limit, offset: calcOffset(page, limit) });