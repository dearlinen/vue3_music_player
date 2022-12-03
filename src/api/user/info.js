import {Get} from "@/api/server.js";
import {calcOffset} from "@/api/ApiTools.js";


//根据uid获取用户详情
export const getUserDetail = async (uid) => await Get("/user/detail", { uid });

//根据uid获取用户歌单
export const getUserPlaylists = async (uid, limit, page) => await Get("/user/playlist", { uid, limit, offset: calcOffset(page, limit) });

//获取账号信息
export const getUserAccount = async () => await Get("/user/account");

//获取登陆状态
export const geyUserState = async ()=> await Get('/login/status')