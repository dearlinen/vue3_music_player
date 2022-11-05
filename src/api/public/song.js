import {Get} from "@/api/server.js";

//歌曲地址
export const getSongUrl = async (id) => await Get("/song/url", { id });

//歌曲详情
export const getSongDetail = async (ids) => await Get("/song/detail", { ids });

//热歌
export const getTopSongs = async (type) => await Get("/top/song", { type });

//相似歌曲
export const getSimiSongs = async (id) => await Get("/simi/song", { id });

//歌词
export const getSongLyric = async (id) => await Get("/lyric", { id });