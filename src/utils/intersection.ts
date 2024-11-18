/**
 * @description 获取由基本数据类型组成的数组交集
 * @param arrays 需要取交集的数组列表
 * @returns 交集数组
 */
export const intersection = (...arrays: any[]): any[] => {
  return [...arrays].reduce((result, current) =>
    result.filter(item => current.includes(item))
  );
};
