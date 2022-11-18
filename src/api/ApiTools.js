//从分页数计算offset量
export const calcOffset = (page, limit=30) => (page - 1) * limit;
