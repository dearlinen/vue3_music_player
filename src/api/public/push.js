import {Get} from "@/api/server.js";


//banner
export const getBanner = async () => await Get("/banner", {type: 0});

//推荐歌单
export const getPersonalized = async (limit) => await Get("/personalized", { limit });

//推荐新音乐
export const getPersonalizedNewsong = async () => await Get("/personalized/newsong");

//推荐 mv
export const getPersonalizedMv = async () => await Get("/personalized/mv");