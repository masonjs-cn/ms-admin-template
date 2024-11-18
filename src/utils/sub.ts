/**
 * @description 截取指定字符前面的值
 * @param val 要截取的值
 * @param character 指定字符
 * @returns 截取后的值
 */
export function subBefore(val: string, character: string): string {
  if (!val || !character) return "";
  const index = val.indexOf(character);
  return index !== -1 ? val.substring(0, index) : val;
}

/**
 * @description 截取指定字符后面的值
 * @param val 要截取的值
 * @param character 指定字符
 * @returns 截取后的值
 */
export function subAfter(val: string, character: string): string {
  if (!val || !character) return "";
  const index = val.indexOf(character);
  return index !== -1 ? val.substring(index + character.length) : val;
}
