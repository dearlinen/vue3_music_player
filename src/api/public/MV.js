import {Get} from "@/api/server.js";

//获取 mv 数据
export const getMVDetail = async (id) => await Get("/mv/detail", { mvid: id });

//mv 地址
export const getMVUrl = async (id) => await Get("/mv/url", { id });

//全部 mv
//limit: 取出数量 , 默认为 30
//offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const getMVAll = async (area, type, order, limit, offset) => await Get("/mv/all", { area, type, order, limit, offset });

//相似 mv
export const getSimiMv = async (id) => await Get("/simi/mv", { mvid: id });