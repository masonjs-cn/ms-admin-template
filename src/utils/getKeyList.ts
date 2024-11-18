/**
 * @description 从数组中获取指定 key 组成的新数组，会去重也会去除不存在的值
 * @param arr 数组或对象
 * @param key 指定的 key
 * @param duplicates 是否去重，默认 true 去重
 * @returns 提取的值组成的新数组
 */
export function getKeyList<T extends Record<string, any>>(
  arr: T | T[] | Record<string, any> | Record<string, any>[],
  key: keyof T | string,
  duplicates: boolean = true
): any[] {
  // 处理空值
  if (!arr) return [];

  // 转换为数组
  const arrayData = Array.isArray(arr) ? arr : [arr as Record<string, any>];

  // 确保所有项都是对象
  if (!arrayData.every(item => item && typeof item === "object")) {
    return [];
  }

  let values = arrayData
    .map(item => item[key as string])
    .filter(item => item !== undefined && item !== null);

  if (duplicates) {
    values = Array.from(new Set(values));
  }

  return values;
}
