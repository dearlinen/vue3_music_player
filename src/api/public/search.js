import {Get} from "../server.js";
import {calcOffset} from "@/api/ApiTools.js";

//搜索
export const getSearch = async (keywords, limit, page, type) => await Get("/search", {
    keywords,
    limit,
    offset: calcOffset(page, limit),
    type
});

//搜索建议
export const getSearchSuggestions = async (keywords, type) => await Get("/search/suggest", {keywords, type});

//热搜列表(简略)
export const getSearchHot = async () => await Get("/search/hot");