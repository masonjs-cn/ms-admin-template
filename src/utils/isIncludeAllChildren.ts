/**
 * @description 判断一个数组（这里简称为母体）中是否包含了另一个由基本数据类型组成的数组（这里简称为子体）中的全部元素
 * @param c 子体
 * @param m 母体
 */
export default function isIncludeAllChildren(
  c: Array<string | number | unknown>,
  m: Array<unknown>
): boolean {
  return c.every(childItem => m.some(motherItem => motherItem === childItem));
}
